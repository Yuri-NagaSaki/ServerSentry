'use client';

import React, { lazy, Suspense } from 'react';
import { useServers } from '@/hooks/use-servers';
import { ServerCard } from './server-card';

import { Server } from '@/lib/api';

// 懒加载虚拟化列表组件
const VirtualizedServerList = lazy(() =>
  import('./virtualized-server-list').then(m => ({ default: m.VirtualizedServerList }))
);

// 虚拟化阈值：超过此数量的服务器时使用虚拟滚动
const VIRTUALIZATION_THRESHOLD = 50;

export const ServerList: React.FC = React.memo(function ServerList() {
  const { data } = useServers();

  // 在条件渲染之前调用所有hooks
  const sortedServers = React.useMemo(() => {
    if (!data?.servers) return [];

    return [...data.servers].sort((a, b) => {
      // 首先按照权重排序（降序）
      if (a.weight !== b.weight) {
        return b.weight - a.weight;
      }

      // 然后按照在线状态排序（在线优先）
      const aOnline = a.online4 || a.online6;
      const bOnline = b.online4 || b.online6;
      if (aOnline !== bOnline) {
        return bOnline ? 1 : -1;
      }

      // 最后按照别名排序（字母顺序）
      return (a.alias || a.name).localeCompare(b.alias || b.name);
    });
  }, [data?.servers]);

  // 如果服务器数量超过阈值，使用虚拟化列表
  if (data?.servers && data.servers.length > VIRTUALIZATION_THRESHOLD) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <VirtualizedServerList />
      </Suspense>
    );
  }

  if (!data?.servers) {
    return <LoadingSkeleton />;
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 server-grid">
      {sortedServers.map((server, index) => (
        <ServerCardItem 
          key={server.name} 
          server={server} 
          index={index}
        />
      ))}
    </div>
  );
});
ServerList.displayName = 'ServerList';

// ServerCardItem 组件，避免重复渲染
const ServerCardItem: React.FC<{ server: Server; index: number }> = React.memo(function ServerCardItem({ server, index }) {
  return (
    <div
      className="h-full animate-fade-in transform-gpu"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <ServerCard server={server} />
    </div>
  );
});
ServerCardItem.displayName = 'ServerCardItem';

// 加载骨架屏组件
const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 server-grid">
      {Array(8).fill(null).map((_, i) => (
        <div
          key={i}
          className="h-[300px] bg-muted/10 rounded-lg animate-pulse animate-slide-up"
          style={{ animationDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
  );
}; 