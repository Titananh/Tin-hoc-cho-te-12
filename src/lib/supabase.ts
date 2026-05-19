import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { devSupabaseAdmin } from './dev-supabase';

const isDevBypass = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') ?? false;

// Supabase client for server-side operations (admin access).
// In dev mode (placeholder env), use a chainable in-memory mock that returns
// reasonable seed data instead of trying to hit a non-existent host.
export const supabaseAdmin: SupabaseClient = isDevBypass
  ? (devSupabaseAdmin as unknown as SupabaseClient)
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

// Supabase client for client-side operations (anon access)
export const supabaseClient: SupabaseClient = isDevBypass
  ? (devSupabaseAdmin as unknown as SupabaseClient)
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
    );
