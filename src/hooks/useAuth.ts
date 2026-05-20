'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  signInEmail,
  signUpEmail,
  signInGoogle,
  signOut,
  onAuthStateChange,
  type AuthUser,
} from '@/lib/auth-supabase';
import { downloadProgress, scheduleSync } from '@/lib/progress-sync';

interface UseAuthReturn {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  syncProgress: () => void;
}

/**
 * Hook xác thực + đồng bộ tiến trình.
 * Dùng Supabase Auth khi có credentials, fallback localStorage khi không.
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initial load
    getCurrentUser().then((u) => {
      if (mounted) {
        setUser(u);
        setIsLoading(false);
        // Download remote progress on login
        if (u) {
          downloadProgress(u.id);
        }
      }
    });

    // Listen for auth changes (login/logout from other tabs, OAuth redirect)
    const unsubscribe = onAuthStateChange((u) => {
      if (mounted) {
        setUser(u);
        if (u) {
          downloadProgress(u.id);
        }
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signInEmail(email, password);
      if (result.success) {
        const u = await getCurrentUser();
        setUser(u);
        if (u) downloadProgress(u.id);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await signUpEmail(name, email, password);
      if (result.success) {
        const u = await getCurrentUser();
        setUser(u);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginGoogle = useCallback(async () => {
    return signInGoogle();
  }, []);

  const logout = useCallback(async () => {
    // Upload progress before logout
    if (user) {
      const { uploadProgress } = await import('@/lib/progress-sync');
      await uploadProgress(user.id);
    }
    await signOut();
    setUser(null);
  }, [user]);

  const syncProgress = useCallback(() => {
    if (user) {
      scheduleSync(user.id);
    }
  }, [user]);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    loginGoogle,
    logout,
    syncProgress,
  };
}
