'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useServers } from '@/hooks/use-servers';
import { Cpu, Server, HardDrive, Wifi } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

import {
  cardColors,
  StatCard,
  StatsSkeletons,
  LastUpdated,
  TrafficDisplay
} from './dashboard';

export const DashboardStats: React.FC = () => {
  const { data } = useServers();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const stats = useMemo(() => {
    if (!data?.servers) {
      return {
        totalServers: 0,
        onlineServers: 0,
        avgCpuUsage: 0,
        avgMemoryUsage: 0,
        totalDownload: 0,
        totalUpload: 0,
      };
    }
    
    const onlineServers = data.servers.filter((server) => server.online4 || server.online6).length;
    const totalServers = data.servers.length;
    
    let totalCpu = 0;
    let totalMemory = 0;
    let totalDownload = 0;
    let totalUpload = 0;
    
    data.servers.forEach((server) => {
      if (server.online4 || server.online6) {
        totalCpu += server.cpu || 0;
        totalMemory += (server.memory_used / server.memory_total) * 100 || 0;
        totalDownload += server.network_in || 0;
        totalUpload += server.network_out || 0;
      }
    });
    
    const avgCpuUsage = onlineServers ? Math.round(totalCpu / onlineServers) : 0;
    const avgMemoryUsage = onlineServers ? Math.round(totalMemory / onlineServers) : 0;
    
    return {
      totalServers,
      onlineServers,
      avgCpuUsage,
      avgMemoryUsage,
      totalDownload,
      totalUpload,
    };
  }, [data?.servers]);
  
  const lastUpdated = useMemo(() => {
    if (!data?.updated) return '未知';
    return formatDateTime(data.updated);
  }, [data?.updated]);
  
  // 加载中状态
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight" suppressHydrationWarning>监控概览</h2>
          <div className="text-sm text-muted-foreground flex items-center">
            <Wifi className="h-4 w-4 mr-1" />
            <span suppressHydrationWarning>最后更新: 加载中...</span>
          </div>
        </div>
        
        <StatsSkeletons />
      </div>
    );
  }
  
  // 已加载状态
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 
          className="text-3xl font-bold tracking-tight hover:scale-[1.01] transition-transform duration-200" 
          suppressHydrationWarning
        >
          监控概览
        </h2>
        
        <LastUpdated timestamp={lastUpdated} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="服务器"
          accentColor={cardColors.servers}
          value={
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.onlineServers}</span>
              <span className="text-xs opacity-70 mx-1.5">/</span>
              <span className="text-xl font-bold opacity-80">{stats.totalServers}</span>
            </div>
          }
          icon={<Server className="h-6 w-6" />}
        />
        <StatCard
          title="平均CPU使用率"
          accentColor={cardColors.cpu}
          value={
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.avgCpuUsage}</span>
              <span className="text-xs opacity-70 ml-1">%</span>
            </div>
          }
          icon={<Cpu className="h-6 w-6" />}
        />
        <StatCard
          title="平均内存使用率"
          accentColor={cardColors.memory}
          value={
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{stats.avgMemoryUsage}</span>
              <span className="text-xs opacity-70 ml-1">%</span>
            </div>
          }
          icon={<HardDrive className="h-6 w-6" />}
        />
        <StatCard
          title="总流量"
          accentColor={cardColors.network}
          value={
            <TrafficDisplay 
              download={stats.totalDownload}
              upload={stats.totalUpload}
              downloadColor={cardColors.servers}
              uploadColor={cardColors.memory}
            />
          }
          icon={<Wifi className="h-6 w-6" />}
        />
      </div>
    </div>
  );
}; 