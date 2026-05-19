import type { Adapter, AdapterUser, AdapterAccount, AdapterSession } from 'next-auth/adapters';
import { supabaseAdmin } from './supabase';

/**
 * Custom NextAuth adapter connecting to Supabase/PostgreSQL
 * Maps to the users table defined in schema.sql
 */
export function SupabaseAdapter(): Adapter {
  return {
    // Create a new user
    async createUser(user) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          name: user.name ?? 'Người dùng',
          email: user.email,
          avatar_url: user.image ?? null,
          role: 'student',
          xp: 0,
          level: 1,
          streak_count: 0,
        })
        .select()
        .single();

      if (error) throw new Error(`Không thể tạo tài khoản: ${error.message}`);

      // Create streak record for new user
      await supabaseAdmin
        .from('streaks')
        .insert({
          user_id: data.id,
          current_streak: 0,
          longest_streak: 0,
          last_activity_date: new Date().toISOString().split('T')[0],
        });

      return {
        id: String(data.id),
        name: data.name,
        email: data.email,
        emailVerified: null,
        image: data.avatar_url,
      } as AdapterUser;
    },

    // Get user by ID
    async getUser(id) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error || !data) return null;

      return {
        id: String(data.id),
        name: data.name,
        email: data.email,
        emailVerified: null,
        image: data.avatar_url,
      } as AdapterUser;
    },

    // Get user by email
    async getUserByEmail(email) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) return null;

      return {
        id: String(data.id),
        name: data.name,
        email: data.email,
        emailVerified: null,
        image: data.avatar_url,
      } as AdapterUser;
    },

    // Get user by account (OAuth provider)
    async getUserByAccount({ providerAccountId, provider }) {
      const { data: account, error: accountError } = await supabaseAdmin
        .from('accounts')
        .select('user_id')
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId)
        .single();

      if (accountError || !account) return null;

      const { data: user, error: userError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', account.user_id)
        .single();

      if (userError || !user) return null;

      return {
        id: String(user.id),
        name: user.name,
        email: user.email,
        emailVerified: null,
        image: user.avatar_url,
      } as AdapterUser;
    },

    // Update user
    async updateUser(user) {
      const updateData: Record<string, unknown> = {};
      if (user.name) updateData.name = user.name;
      if (user.email) updateData.email = user.email;
      if (user.image) updateData.avatar_url = user.image;

      const { data, error } = await supabaseAdmin
        .from('users')
        .update(updateData)
        .eq('id', parseInt(user.id))
        .select()
        .single();

      if (error) throw new Error(`Không thể cập nhật tài khoản: ${error.message}`);

      return {
        id: String(data.id),
        name: data.name,
        email: data.email,
        emailVerified: null,
        image: data.avatar_url,
      } as AdapterUser;
    },

    // Delete user
    async deleteUser(userId) {
      await supabaseAdmin
        .from('users')
        .delete()
        .eq('id', parseInt(userId));
    },

    // Link account (OAuth)
    async linkAccount(account) {
      await supabaseAdmin.from('accounts').insert({
        user_id: parseInt(account.userId),
        type: account.type,
        provider: account.provider,
        provider_account_id: account.providerAccountId,
        refresh_token: account.refresh_token ?? null,
        access_token: account.access_token ?? null,
        expires_at: account.expires_at ?? null,
        token_type: account.token_type ?? null,
        scope: account.scope ?? null,
        id_token: account.id_token ?? null,
      });

      return account as AdapterAccount;
    },

    // Unlink account
    async unlinkAccount({ providerAccountId, provider }) {
      await supabaseAdmin
        .from('accounts')
        .delete()
        .eq('provider', provider)
        .eq('provider_account_id', providerAccountId);
    },

    // Session management (not used with JWT strategy, but required by interface)
    async createSession(session) {
      return session as AdapterSession;
    },

    async getSessionAndUser(sessionToken) {
      return null;
    },

    async updateSession(session) {
      return session as AdapterSession;
    },

    async deleteSession(sessionToken) {
      // No-op for JWT strategy
    },

    // Verification token (for email verification)
    async createVerificationToken(token) {
      await supabaseAdmin.from('verification_tokens').insert({
        identifier: token.identifier,
        token: token.token,
        expires: token.expires.toISOString(),
      });
      return token;
    },

    async useVerificationToken({ identifier, token }) {
      const { data, error } = await supabaseAdmin
        .from('verification_tokens')
        .delete()
        .eq('identifier', identifier)
        .eq('token', token)
        .select()
        .single();

      if (error || !data) return null;

      return {
        identifier: data.identifier,
        token: data.token,
        expires: new Date(data.expires),
      };
    },
  };
}
