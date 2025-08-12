'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        gcTime: 1000 * 60 * 2, // 降低到2分钟垃圾回收时间，减少内存占用
        staleTime: 1000 * 60, // 增加到60秒过期时间，减少请求频率
        refetchOnMount: false, // 减少挂载时的请求
        refetchOnReconnect: true, // 网络重连时刷新
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
} 