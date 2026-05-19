'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Wrapper cho next-auth SessionProvider.
 * Sử dụng trong layout để cung cấp session cho toàn bộ ứng dụng.
 */
export default function SessionProvider({ children }: Props) {
  return (
    <NextAuthSessionProvider refetchInterval={5 * 60}>
      {children}
    </NextAuthSessionProvider>
  );
}
