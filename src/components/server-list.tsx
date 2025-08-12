'use client';

import React from 'react';
import { useServers } from '@/hooks/use-servers';
import { ServerCard } from './server-card';

export const ServerList: React.FC = () => {
  const { data } = useServers();
  
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
  
  if (!data?.servers) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 grid-optimized">
        {Array(8).fill(null).map((_, i) => (
          <div key={i} className="h-[300px] bg-muted/10 rounded-lg animate-pulse gpu-accelerated" />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 grid-optimized">
      {sortedServers.map((server) => (
        <div key={server.name} className="h-full card-optimized">
          <ServerCard server={server} />
        </div>
      ))}
    </div>
  );
}; 