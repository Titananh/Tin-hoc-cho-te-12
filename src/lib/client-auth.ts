/**
 * Client-side authentication using localStorage.
 * No server/database needed - all data stored in browser.
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const AUTH_KEY = 'python_master_auth';

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function register(name: string, email: string, password: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Server-side' };
  
  // Check if email already registered
  const usersKey = 'python_master_users';
  const users: Record<string, { name: string; email: string; passwordHash: string }> = 
    JSON.parse(localStorage.getItem(usersKey) || '{}');
  
  if (users[email]) {
    return { success: false, error: 'Email đã được đăng ký' };
  }
  
  // Simple hash (not secure, but works for demo)
  const passwordHash = btoa(password);
  
  users[email] = { name, email, passwordHash };
  localStorage.setItem(usersKey, JSON.stringify(users));
  
  // Auto login
  const user: User = {
    id: `user_${Date.now()}`,
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  
  return { success: true };
}

export function login(email: string, password: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') return { success: false, error: 'Server-side' };
  
  const usersKey = 'python_master_users';
  const users: Record<string, { name: string; email: string; passwordHash: string }> = 
    JSON.parse(localStorage.getItem(usersKey) || '{}');
  
  const user = users[email];
  if (!user) {
    return { success: false, error: 'Email hoặc mật khẩu không đúng' };
  }
  
  if (user.passwordHash !== btoa(password)) {
    return { success: false, error: 'Email hoặc mật khẩu không đúng' };
  }
  
  const authUser: User = {
    id: `user_${email.replace(/[^a-z0-9]/g, '')}`,
    name: user.name,
    email: user.email,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
  
  return { success: true };
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}
