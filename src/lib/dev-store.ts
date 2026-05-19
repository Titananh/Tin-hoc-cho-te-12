/**
 * In-memory user store for DEV MODE only.
 * Used when Supabase is not configured (placeholder env vars).
 *
 * IMPORTANT: stored on globalThis so it survives across separately-bundled
 * Next.js route modules and across HMR reloads in dev.
 */

import bcrypt from 'bcryptjs';

interface DevUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'student' | 'admin';
  avatar_url: string | null;
  xp: number;
  level: number;
  streak_count: number;
  created_at: string;
}

interface DevStoreState {
  users: Map<string, DevUser>;
  nextId: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __PYTHON_MASTER_DEV_STORE: DevStoreState | undefined;
}

function getStore(): DevStoreState {
  if (!globalThis.__PYTHON_MASTER_DEV_STORE) {
    globalThis.__PYTHON_MASTER_DEV_STORE = {
      users: new Map<string, DevUser>(),
      nextId: 1,
    };
  }
  return globalThis.__PYTHON_MASTER_DEV_STORE;
}

/**
 * Check if we should use dev mode (Supabase not configured).
 */
export function isDevBypass(): boolean {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder') ?? false;
}

/**
 * Create a new dev user.
 */
export async function devCreateUser(
  name: string,
  email: string,
  password: string
): Promise<DevUser | { error: string }> {
  const store = getStore();

  // Check if email already exists
  for (const user of store.users.values()) {
    if (user.email === email) {
      return { error: 'Email này đã được đăng ký' };
    }
  }

  const password_hash = await bcrypt.hash(password, 10);
  const id = String(store.nextId++);

  const user: DevUser = {
    id,
    name,
    email,
    password_hash,
    role: 'student',
    avatar_url: null,
    xp: 0,
    level: 1,
    streak_count: 0,
    created_at: new Date().toISOString(),
  };

  store.users.set(id, user);
  return user;
}

/**
 * Find a dev user by email.
 */
export function devFindUserByEmail(email: string): DevUser | null {
  const store = getStore();
  for (const user of store.users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * Find a dev user by ID.
 */
export function devFindUserById(id: string): DevUser | null {
  return getStore().users.get(id) ?? null;
}

/**
 * Verify password for a dev user.
 */
export async function devVerifyPassword(
  user: DevUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.password_hash);
}

/**
 * Return all dev users (for the dev supabase mock to query).
 */
export function devGetAllUsers(): DevUser[] {
  return Array.from(getStore().users.values());
}
