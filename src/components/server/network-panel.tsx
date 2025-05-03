'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, HardDrive } from 'lucide-react';
import { formatBytes, formatSpeed } from '@/lib/api';
import { serverColors } from './colors';

interface NetworkArrowProps {
  direction: 'up' | 'down';
  delay?: number;
}

const NetworkArrow: React.FC<NetworkArrowProps> = ({ direction, delay = 0 }) => {
  const color = direction === 'down' ? serverColors.download : serverColors.upload;
  
  return (
    <motion.span 
      className="text-sm flex-shrink-0"
      style={{ color }}
      animate={{ y: direction === 'down' ? [0, -2, 0] : [0, 2, 0] }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay
      }}
    >
      {direction === 'down' ? '↓' : '↑'}
    </motion.span>
  );
};

// 图标动画组件
interface AnimatedIconProps {
  icon: React.ReactNode;
  delay?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon, delay = 0 }) => (
  <motion.div
    animate={{ 
      color: ["hsl(var(--muted-foreground))", "hsl(var(--primary))", "hsl(var(--muted-foreground))"] 
    }}
    transition={{ 
      duration: 2, 
      ease: "easeInOut", 
      repeat: Infinity,
      repeatType: "reverse",
      delay
    }}
    className="flex-shrink-0"
  >
    {icon}
  </motion.div>
);

// 实时网络面板
interface RealTimeNetworkPanelProps {
  downloadSpeed: number;
  uploadSpeed: number;
}

export const RealTimeNetworkPanel: React.FC<RealTimeNetworkPanelProps> = ({ 
  downloadSpeed, 
  uploadSpeed 
}) => (
  <motion.div 
    className="p-2.5 rounded-xl bg-secondary/20 backdrop-blur-sm dark:bg-secondary/30 h-full"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center space-x-1.5 mb-1.5">
      <AnimatedIcon icon={<Wifi className="h-3.5 w-3.5" />} />
      <span className="text-xs font-medium">实时网络</span>
    </div>
    
    <div className="space-y-1.5">
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <NetworkArrow direction="down" />
          <span className="text-xs font-medium">下载</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatSpeed(downloadSpeed, 1)}
        </span>
      </div>
      
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <NetworkArrow direction="up" delay={0.2} />
          <span className="text-xs font-medium">上传</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatSpeed(uploadSpeed, 1)}
        </span>
      </div>
    </div>
  </motion.div>
);

// 总流量面板
interface TotalTrafficPanelProps {
  totalDownload: number;
  totalUpload: number;
}

export const TotalTrafficPanel: React.FC<TotalTrafficPanelProps> = ({
  totalDownload,
  totalUpload
}) => (
  <motion.div 
    className="p-2.5 rounded-xl bg-secondary/20 backdrop-blur-sm dark:bg-secondary/30 h-full"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center space-x-1.5 mb-1.5">
      <AnimatedIcon icon={<HardDrive className="h-3.5 w-3.5" />} delay={0.5} />
      <span className="text-xs font-medium">总流量</span>
    </div>
    
    <div className="space-y-1.5">
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm flex-shrink-0" style={{ color: serverColors.download }}>↓</span>
          <span className="text-xs font-medium">接收</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatBytes(totalDownload, 1)}
        </span>
      </div>
      
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm flex-shrink-0" style={{ color: serverColors.upload }}>↑</span>
          <span className="text-xs font-medium">发送</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatBytes(totalUpload, 1)}
        </span>
      </div>
    </div>
  </motion.div>
); 