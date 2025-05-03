'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigurableBackground } from '@/components/ui/configurable-background';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        gcTime: 1000 * 60 * 5, // 5分钟垃圾回收时间
        staleTime: 1000 * 30, // 30秒过期时间
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigurableBackground />
      {children}
    </QueryClientProvider>
  );
} 