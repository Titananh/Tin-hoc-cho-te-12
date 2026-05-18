'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUser: User = {
  id: 'user-1',
  name: 'Minh Nguyễn',
  email: 'minh@example.com',
  avatar_url: '',
  role: 'student',
  xp: 1250,
  level: 5,
  streak_count: 7,
  created_at: '2024-01-15',
  last_active: new Date().toISOString()
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('pythonmaster_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(defaultUser);
      }
    } else {
      setUser(defaultUser);
      localStorage.setItem('pythonmaster_user', JSON.stringify(defaultUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const loggedUser = { ...defaultUser, email };
    setUser(loggedUser);
    localStorage.setItem('pythonmaster_user', JSON.stringify(loggedUser));
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newUser: User = {
      ...defaultUser,
      id: `user-${Date.now()}`,
      name,
      email,
      created_at: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('pythonmaster_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pythonmaster_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}