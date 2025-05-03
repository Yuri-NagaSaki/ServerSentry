'use client';

import React from 'react';
import { Server, formatBytes } from '@/lib/api';
import { Card, CardContent, CardHeader } from './ui/card';
import { ServerMetric } from './server-metric';
import { motion } from 'framer-motion';
import { Clock, MapPin, Server as ServerIcon } from 'lucide-react';

// 导入拆分后的组件
import {
  serverAnimations,
  StatusIndicator,
  StatusBadge,
  RealTimeNetworkPanel,
  TotalTrafficPanel,
  IPStatusBadges
} from './server';

interface ServerCardProps {
  server: Server;
}

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const isOnline = server.online4 || server.online6;
  
  // SWAP特殊处理
  const hasSwap = server.swap_total > 0;
  const swapFormatter = (val: number) => {
    if (!hasSwap) {
      return val === 0 ? "未配置" : formatBytes(val * 1024);
    }
    return formatBytes(val * 1024);
  };
  
  return (
    <motion.div {...serverAnimations.fadeIn}>
      <Card className="overflow-hidden relative backdrop-blur-sm border-none bg-gradient-to-br from-background/70 to-background/30 shadow-xl">
        {/* 背景荧光效果 */}
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10"></div>
        
        {/* 悬停光晕效果 */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-primary/15 dark:via-primary/10 dark:to-transparent"
          {...serverAnimations.backgroundGlow}
        />
        
        {/* 卡片内部容器 */}
        <motion.div className="relative z-10" {...serverAnimations.hover}>
          <CardHeader className="pb-2 space-y-2">
            {/* 服务器名称和状态 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <StatusIndicator isOnline={isOnline} />
                <span className="text-xl truncate flex-shrink" suppressHydrationWarning>
                  {server.alias || server.name}
                </span>
              </div>
              <StatusBadge isOnline={isOnline} />
            </div>
            
            {/* 服务器信息和网络类型 */}
            <div className="flex items-center justify-between">
              <div className="flex-shrink-0">
                <UptimeDisplay uptime={server.uptime} />
              </div>
              <div className="flex items-center gap-2">
                {/* IP状态标签，放在最前面 */}
                <IPStatusBadges 
                  ipv4Online={server.online4}
                  ipv6Online={server.online6}
                />
                
                {/* 服务器类型标签 */}
                {server.type && <ServerTypeTag label={server.type} />}
                
                {/* 位置标签 */}
                {server.location && <LocationTag label={server.location} />}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4 pt-0">
            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <ServerMetric 
                  label="CPU"
                  value={server.cpu}
                  total={100}
                  unit="%"
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <ServerMetric 
                  label="内存"
                  value={server.memory_used}
                  total={server.memory_total}
                  formatter={(val) => formatBytes(val * 1024)}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <ServerMetric 
                  label="硬盘"
                  value={server.hdd_used}
                  total={server.hdd_total}
                  formatter={(val) => formatBytes(val * 1024 * 1024)}
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <ServerMetric 
                  label="SWAP"
                  value={server.swap_used}
                  total={server.swap_total || 1}
                  formatter={swapFormatter}
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <RealTimeNetworkPanel
                downloadSpeed={server.network_rx}
                uploadSpeed={server.network_tx}
              />
              
              <TotalTrafficPanel
                totalDownload={server.network_in}
                totalUpload={server.network_out}
              />
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
};

// 运行时间显示组件
const UptimeDisplay: React.FC<{ uptime: string }> = ({ uptime }) => (
  <motion.div 
    className="flex items-center space-x-1 flex-shrink-0 text-muted-foreground text-xs"
    whileHover={{ color: "var(--primary)" }}
    transition={{ duration: 0.2 }}
  >
    <Clock className="h-3.5 w-3.5" />
    <span className="whitespace-nowrap" suppressHydrationWarning>运行: {uptime}</span>
  </motion.div>
);

// 服务器类型标签
const ServerTypeTag: React.FC<{ label: string }> = ({ label }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
    <div className="flex items-center h-5 px-1.5 rounded-full text-[10px] font-medium bg-secondary/40 dark:bg-secondary/30 text-foreground/80">
      <ServerIcon className="h-3 w-3 mr-1 text-muted-foreground" />
      <span suppressHydrationWarning>{label}</span>
    </div>
  </motion.div>
);

// 位置标签
const LocationTag: React.FC<{ label: string }> = ({ label }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
    <div className="flex items-center h-5 px-1.5 rounded-full text-[10px] font-medium bg-secondary/40 dark:bg-secondary/30 text-foreground/80">
      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
      <span suppressHydrationWarning>{label}</span>
    </div>
  </motion.div>
); 