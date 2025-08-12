'use client';

import React from 'react';
import { Wifi, HardDrive } from 'lucide-react';
import { formatBytes, formatSpeed } from '@/lib/api';
import { serverColors } from './colors';

interface NetworkArrowProps {
  direction: 'up' | 'down';
}

const NetworkArrow: React.FC<NetworkArrowProps> = ({ direction }) => {
  const color = direction === 'down' ? serverColors.download : serverColors.upload;
  
  return (
    <span 
      className="text-sm flex-shrink-0"
      style={{ color }}
    >
      {direction === 'down' ? '↓' : '↑'}
    </span>
  );
};

// 实时网络面板
interface RealTimeNetworkPanelProps {
  downloadSpeed: number;
  uploadSpeed: number;
}

export const RealTimeNetworkPanel: React.FC<RealTimeNetworkPanelProps> = ({ 
  downloadSpeed, 
  uploadSpeed 
}) => (
  <div 
    className="p-2.5 rounded-xl bg-secondary/20 backdrop-blur-sm dark:bg-secondary/30 h-full hover:scale-[1.02] hover:bg-secondary/25 transition-all duration-200"
  >
    <div className="flex items-center space-x-1.5 mb-1.5">
      <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
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
          <NetworkArrow direction="up" />
          <span className="text-xs font-medium">上传</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatSpeed(uploadSpeed, 1)}
        </span>
      </div>
    </div>
  </div>
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
  <div 
    className="p-2.5 rounded-xl bg-secondary/20 backdrop-blur-sm dark:bg-secondary/30 h-full hover:scale-[1.02] hover:bg-secondary/25 transition-all duration-200"
  >
    <div className="flex items-center space-x-1.5 mb-1.5">
      <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
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
  </div>
); 