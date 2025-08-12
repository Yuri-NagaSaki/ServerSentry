'use client';

import React from 'react';
import { Wifi, HardDrive } from 'lucide-react';
import { formatBytes, formatSpeed } from '@/lib/api';

interface NetworkArrowProps {
  direction: 'up' | 'down';
}

const NetworkArrow: React.FC<NetworkArrowProps> = ({ direction }) => (
  <span className="text-sm flex-shrink-0 text-muted-foreground">
    {direction === 'down' ? '↓' : '↑'}
  </span>
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
  <div className="p-2.5 rounded-xl bg-secondary h-full">
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
  <div className="p-2.5 rounded-xl bg-secondary h-full">
    <div className="flex items-center space-x-1.5 mb-1.5">
      <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs font-medium">总流量</span>
    </div>
    
    <div className="space-y-1.5">
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm flex-shrink-0 text-muted-foreground">↓</span>
          <span className="text-xs font-medium">接收</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatBytes(totalDownload, 1)}
        </span>
      </div>
      
      <div className="grid grid-cols-[auto_1fr] items-center gap-1">
        <div className="flex items-center space-x-1">
          <span className="text-sm flex-shrink-0 text-muted-foreground">↑</span>
          <span className="text-xs font-medium">发送</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground text-right" suppressHydrationWarning>
          {formatBytes(totalUpload, 1)}
        </span>
      </div>
    </div>
  </div>
); 