'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, type User } from '@/lib/client-auth';

const PUBLIC_PATHS = ['/', '/login', '/register', '/about', '/faq', '/terms', '/privacy'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    
    // If not authenticated and not on public page, redirect to login
    const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname?.startsWith('/forgot'));
    if (!u && !isPublic) {
      router.push('/login');
    }
  }, [pathname, router]);

  // Loading state
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Public pages always render
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname?.startsWith('/forgot'));
  if (isPublic) return <>{children}</>;

  // Protected pages need auth
  if (!user) return null;

  return <>{children}</>;
}
