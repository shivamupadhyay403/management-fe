// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute — avoids refetch on every mount
        gcTime:    5 * 60 * 1000, // 5 minutes garbage collection
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Singleton for the browser — never create a new one on every render
let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new client
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}