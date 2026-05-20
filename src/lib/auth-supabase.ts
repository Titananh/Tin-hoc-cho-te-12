/**
 * Supabase Auth - Client-side authentication.
 *
 * Hỗ trợ:
 * - Đăng ký email/password
 * - Đăng nhập email/password
 * - Đăng nhập Google OAuth
 * - Đăng xuất
 * - Lấy user hiện tại (session persist qua cookie/localStorage tự động)
 *
 * Khi Supabase chưa cấu hình (env placeholder), fallback về localStorage auth cũ.
 */

import { getSupabase, isSupabaseConfigured } from './supabase-browser';
import {
  getCurrentUser as getLocalUser,
  login as localLogin,
  register as localRegister,
  logout as localLogout,
  type User as LocalUser,
} from './client-auth';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

/** Lấy user hiện tại (đã đăng nhập). */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isSupabaseConfigured()) {
    const u = getLocalUser();
    return u ? { id: u.id, email: u.email, name: u.name, avatarUrl: null } : null;
  }

  const supabase = getSupabase()!;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? '',
    name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split('@')[0] ?? 'User',
    avatarUrl: user.user_metadata?.avatar_url ?? null,
  };
}

/** Đăng ký bằng email + password. */
export async function signUpEmail(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return localRegister(name, email, password);
  }

  const supabase = getSupabase()!;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  });

  if (error) {
    if (error.message.includes('already registered')) {
      return { success: false, error: 'Email đã được đăng ký' };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

/** Đăng nhập bằng email + password. */
export async function signInEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return localLogin(email, password);
  }

  const supabase = getSupabase()!;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, error: 'Email hoặc mật khẩu không đúng' };
  }

  return { success: true };
}

/** Đăng nhập bằng Google OAuth. */
export async function signInGoogle(): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Google OAuth chưa được cấu hình. Vui lòng dùng email/mật khẩu.' };
  }

  const supabase = getSupabase()!;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: 'Đăng nhập Google thất bại. Vui lòng thử lại.' };
  }

  // OAuth redirects, so if we get here without error, it's in progress
  return { success: true };
}

/** Đăng xuất. */
export async function signOut(): Promise<void> {
  if (!isSupabaseConfigured()) {
    localLogout();
    return;
  }

  const supabase = getSupabase()!;
  await supabase.auth.signOut();
}

/** Lắng nghe thay đổi auth state (login/logout). */
export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  if (!isSupabaseConfigured()) {
    // Fallback: poll localStorage every 2s
    const interval = setInterval(() => {
      const u = getLocalUser();
      callback(u ? { id: u.id, email: u.email, name: u.name, avatarUrl: null } : null);
    }, 2000);
    return () => clearInterval(interval);
  }

  const supabase = getSupabase()!;
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      callback({
        id: session.user.id,
        email: session.user.email ?? '',
        name: session.user.user_metadata?.full_name ?? session.user.email?.split('@')[0] ?? 'User',
        avatarUrl: session.user.user_metadata?.avatar_url ?? null,
      });
    } else {
      callback(null);
    }
  });

  return () => subscription.unsubscribe();
}
