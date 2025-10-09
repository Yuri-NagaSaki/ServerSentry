'use client';

import React, { useMemo } from 'react';
import { useServers } from '@/hooks/use-servers';
import { ServerCard } from './server-card';

/**
 * 优化的服务器列表组件 - 适用于大量服务器的场景
 * 通过React.memo和优化的比较函数提升性能
 * 与ServerList相比，此组件针对50+服务器做了以下优化：
 * - 限制动画延迟最多20个卡片，避免大量DOM操作
 * - 使用更快的动画时间（30ms vs 50ms）
 * - 结合ServerCard的优化比较函数，减少不必要的重渲染
 */
export const VirtualizedServerList: React.FC = React.memo(function VirtualizedServerList() {
  const { data } = useServers();

  const sortedServers = useMemo(() => {
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

  if (!data?.servers || sortedServers.length === 0) {
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
  }

  // 使用优化的grid布局渲染所有服务器
  // 性能优化依赖于ServerCard的高效比较函数和React.memo
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 server-grid">
      {sortedServers.map((server, index) => (
        <div
          key={server.name}
          className="h-full animate-fade-in transform-gpu"
          style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
        >
          <ServerCard server={server} />
        </div>
      ))}
    </div>
  );
});
VirtualizedServerList.displayName = 'VirtualizedServerList';
