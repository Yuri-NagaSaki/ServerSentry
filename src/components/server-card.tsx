'use client';

import React from 'react';
import { Server, formatBytes } from '@/lib/api';
import { Card, CardContent, CardHeader } from './ui/card';
import { ServerMetric } from './server-metric';
import { motion } from 'framer-motion';

// 导入拆分后的组件
import {
  serverAnimations,
  StatusIndicator,
  StatusBadge,
  ServerInfo,
  RealTimeNetworkPanel,
  TotalTrafficPanel
} from './server';

interface ServerCardProps {
  server: Server;
}

export const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const isOnline = server.online4 || server.online6;
  
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
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <StatusIndicator isOnline={isOnline} />
                <span className="text-xl truncate flex-shrink" suppressHydrationWarning>
                  {server.alias || server.name}
                </span>
              </div>
              <StatusBadge isOnline={isOnline} />
            </div>
            
            <ServerInfo 
              uptime={server.uptime}
              type={server.type}
              location={server.location}
            />
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
            </div>
            
            <div className="grid grid-cols-2 gap-3 pt-1">
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