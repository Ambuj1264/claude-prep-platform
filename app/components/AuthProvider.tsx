'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider basePath="/api/user/auth">{children}</SessionProvider>;
}
