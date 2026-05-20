/**
 * Supabase browser client.
 *
 * Đây là client chạy trên trình duyệt — dùng cho:
 *  - Đăng ký / Đăng nhập email + password
 *  - Đăng nhập Google OAuth
 *  - Đọc / ghi tiến trình học của user hiện tại (RLS bảo vệ row của họ)
 *
 * Sử dụng `getSupabase()` thay vì `createClient` ở mọi nơi để tận dụng
 * cùng 1 instance (tránh tạo nhiều WebSocket connections).
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

/** Trả về Supabase client cho phía browser. */
export function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null;

  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If credentials missing or are the placeholder defaults, return null so
  // callers can fall back to localStorage-only mode without crashing.
  if (!url || !anonKey || url.includes('placeholder') || anonKey.includes('placeholder')) {
    return null;
  }

  _client = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return _client;
}

/** True khi env có credentials Supabase thật → backend đầy đủ. */
export function isSupabaseConfigured(): boolean {
  return getSupabase() !== null;
}
