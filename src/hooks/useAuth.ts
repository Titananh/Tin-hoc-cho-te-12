'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getCurrentUser,
  login as clientLogin,
  logout as clientLogout,
  type User as ClientUser,
} from '@/lib/client-auth';

interface UseAuthReturn {
  user: ClientUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refresh: () => void;
}

/**
 * Hook xác thực phía client.
 * Đọc/ghi trạng thái đăng nhập trong localStorage thông qua lib/client-auth.
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    setUser(getCurrentUser());
    setIsLoading(false);

    // Sync between tabs
    function onStorage(e: StorageEvent) {
      if (e.key === 'python_master_auth') {
        setUser(getCurrentUser());
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = clientLogin(email, password);
      if (result.success) {
        setUser(getCurrentUser());
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      clientLogout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    logout,
    refresh,
  };
}
