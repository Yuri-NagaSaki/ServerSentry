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
    refetchInterval: () => {
      // 页面隐藏时降低刷新频率，但不停止刷新
      if (typeof document !== 'undefined' && document.hidden) {
        return config.refreshInterval * 3; // 后台时3倍间隔
      }
      return config.refreshInterval;
    },
    // 页面聚焦时立即刷新，避免显示过期数据
    refetchOnWindowFocus: true,
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