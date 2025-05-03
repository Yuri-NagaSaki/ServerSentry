import { useQuery } from '@tanstack/react-query';
import { getServersStatus, type StatsResponse } from '@/lib/api';
import { config } from '@/lib/config';

/**
 * 获取服务器状态数据的Hook，优化性能以减少内存占用
 */
export const useServers = () => {
  return useQuery<StatsResponse>({
    queryKey: ['servers-status'],
    queryFn: getServersStatus,
    refetchInterval: config.refreshInterval,
    // 使用全局配置的staleTime
    refetchOnWindowFocus: false, // 按照全局配置不在窗口聚焦时刷新
    select: (data) => {
      // 只保留需要的字段，减少内存占用
      return {
        ...data,
        servers: data.servers.map(server => ({
          ...server,
          // 移除任何不必要的大型数据字段
          // 如果需要的话可以在这里精简数据
        }))
      };
    }
  });
}; 