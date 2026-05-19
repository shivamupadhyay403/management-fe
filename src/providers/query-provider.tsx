// providers/query-provider.tsx
'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/src/lib/query-client';
import { type ReactNode } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  // getQueryClient() returns the singleton — safe to call here
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}