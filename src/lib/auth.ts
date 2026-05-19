import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from './supabase';
import { isAccountLocked, recordFailedAttempt, resetAttempts, getLockMessage } from './login-attempts';
import { isDevBypass, devFindUserByEmail, devVerifyPassword } from './dev-store';

// Types for auth
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  avatar_url: string | null;
  xp: number;
  level: number;
  streak_count: number;
}

declare module 'next-auth' {
  interface Session {
    user: AuthUser;
  }

  interface User extends AuthUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    role: 'student' | 'admin';
    avatar_url: string | null;
    xp: number;
    level: number;
    streak_count: number;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password Provider
    CredentialsProvider({
      id: 'credentials',
      name: 'Đăng nhập bằng email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@example.com' },
        password: { label: 'Mật khẩu', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Vui lòng nhập email và mật khẩu');
        }

        // Kiểm tra tài khoản có bị khóa không
        if (isAccountLocked(credentials.email)) {
          const lockMessage = getLockMessage(credentials.email);
          throw new Error(lockMessage ?? 'Tài khoản đã bị khóa. Vui lòng thử lại sau.');
        }

        // ===== DEV MODE: Use in-memory store when Supabase is not configured =====
        if (isDevBypass()) {
          const devUser = devFindUserByEmail(credentials.email);
          if (!devUser) {
            recordFailedAttempt(credentials.email);
            if (isAccountLocked(credentials.email)) {
              const lockMessage = getLockMessage(credentials.email);
              throw new Error(lockMessage ?? 'Tài khoản đã bị khóa. Vui lòng thử lại sau.');
            }
            throw new Error('Email hoặc mật khẩu không đúng');
          }

          const isValid = await devVerifyPassword(devUser, credentials.password);
          if (!isValid) {
            const locked = recordFailedAttempt(credentials.email);
            if (locked) {
              const lockMessage = getLockMessage(credentials.email);
              throw new Error(lockMessage ?? 'Tài khoản đã bị khóa.');
            }
            throw new Error('Email hoặc mật khẩu không đúng');
          }

          resetAttempts(credentials.email);
          return {
            id: devUser.id,
            email: devUser.email,
            name: devUser.name,
            role: devUser.role,
            avatar_url: devUser.avatar_url,
            xp: devUser.xp,
            level: devUser.level,
            streak_count: devUser.streak_count,
          };
        }

        // ===== PRODUCTION MODE: Query Supabase =====
        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single();

        if (error || !user) {
          // Ghi nhận lần thất bại (kể cả khi email không tồn tại để tránh enumeration)
          recordFailedAttempt(credentials.email);

          // Kiểm tra nếu vừa bị khóa sau lần thất bại này
          if (isAccountLocked(credentials.email)) {
            const lockMessage = getLockMessage(credentials.email);
            throw new Error(lockMessage ?? 'Tài khoản đã bị khóa. Vui lòng thử lại sau.');
          }

          throw new Error('Email hoặc mật khẩu không đúng');
        }

        // Check if user has a password (might be OAuth-only account)
        if (!user.password_hash) {
          throw new Error('Tài khoản này sử dụng đăng nhập Google. Vui lòng đăng nhập bằng Google.');
        }

        // Verify password with bcrypt
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password_hash);

        if (!isPasswordValid) {
          // Ghi nhận lần đăng nhập thất bại
          const locked = recordFailedAttempt(credentials.email);

          if (locked) {
            const lockMessage = getLockMessage(credentials.email);
            throw new Error(lockMessage ?? 'Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 30 phút.');
          }

          throw new Error('Email hoặc mật khẩu không đúng');
        }

        // Đăng nhập thành công - reset bộ đếm thất bại
        resetAttempts(credentials.email);

        // Update last_active timestamp
        await supabaseAdmin
          .from('users')
          .update({ last_active: new Date().toISOString() })
          .eq('id', user.id);

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role as 'student' | 'admin',
          avatar_url: user.avatar_url,
          xp: user.xp,
          level: user.level,
          streak_count: user.streak_count,
        };
      },
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  // Use JWT strategy
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // JWT configuration
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  // Custom pages
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
    error: '/login',
  },

  // Callbacks
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google OAuth sign-in
      if (account?.provider === 'google') {
        try {
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single();

          if (!existingUser) {
            // Create new user from Google OAuth
            const { data: newUser, error } = await supabaseAdmin
              .from('users')
              .insert({
                name: user.name ?? 'Người dùng',
                email: user.email!,
                avatar_url: user.image ?? null,
                role: 'student',
                xp: 0,
                level: 1,
                streak_count: 0,
              })
              .select()
              .single();

            if (error) {
              console.error('Error creating user from Google:', error);
              return false;
            }

            // Create streak record for new user
            await supabaseAdmin
              .from('streaks')
              .insert({
                user_id: newUser.id,
                current_streak: 0,
                longest_streak: 0,
                last_activity_date: new Date().toISOString().split('T')[0],
              });
          } else {
            // Update last_active for existing user
            await supabaseAdmin
              .from('users')
              .update({ last_active: new Date().toISOString() })
              .eq('id', existingUser.id);
          }

          return true;
        } catch (error) {
          console.error('Google sign-in error:', error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // Initial sign-in: populate token with user data
      if (user) {
        if (account?.provider === 'google') {
          // Fetch user data from database for Google OAuth
          const { data: dbUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single();

          if (dbUser) {
            token.id = String(dbUser.id);
            token.email = dbUser.email;
            token.name = dbUser.name;
            token.role = dbUser.role as 'student' | 'admin';
            token.avatar_url = dbUser.avatar_url;
            token.xp = dbUser.xp;
            token.level = dbUser.level;
            token.streak_count = dbUser.streak_count;
          }
        } else {
          // Credentials provider - user data already available
          token.id = user.id;
          token.email = user.email!;
          token.name = user.name!;
          token.role = (user as AuthUser).role;
          token.avatar_url = (user as AuthUser).avatar_url;
          token.xp = (user as AuthUser).xp;
          token.level = (user as AuthUser).level;
          token.streak_count = (user as AuthUser).streak_count;
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Populate session with token data
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
        avatar_url: token.avatar_url,
        xp: token.xp,
        level: token.level,
        streak_count: token.streak_count,
      };

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign-in
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  // Secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,

  // Debug mode in development
  debug: process.env.NODE_ENV === 'development',
};
