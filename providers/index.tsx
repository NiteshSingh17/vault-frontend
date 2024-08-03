'use client';

import { PropsWithChildren } from 'react';
import { AuthProvider } from './authProvider';
import { QueryProvider } from './queryProvider';

export function Providers({ children }: PropsWithChildren): JSX.Element {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
