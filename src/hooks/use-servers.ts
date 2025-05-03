import { useQuery } from '@tanstack/react-query';
import { getServersStatus, type StatsResponse } from '@/lib/api';
import { config } from '@/lib/config';

/**
 * 获取服务器状态数据的Hook
 */
export const useServers = () => {
  return useQuery<StatsResponse>({
    queryKey: ['servers-status'],
    queryFn: getServersStatus,
    refetchInterval: config.refreshInterval,
    staleTime: config.refreshInterval,
    refetchOnWindowFocus: true,
  });
}; 