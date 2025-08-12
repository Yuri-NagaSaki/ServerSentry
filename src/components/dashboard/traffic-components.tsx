'use client';

import React from 'react';
import { formatBytes } from '@/lib/api';

export interface TrafficArrowProps {
  direction?: 'up' | 'down';
  color: string;
}

export const TrafficArrow: React.FC<TrafficArrowProps> = ({ direction = 'down', color }) => (
  <span 
    className="text-sm mr-0.5"
    style={{ color }}
  >
    {direction === 'down' ? '↓' : '↑'}
  </span>
);

export interface TrafficDisplayProps {
  download: number;
  upload: number;
  downloadColor: string;
  uploadColor: string;
}

export const TrafficDisplay: React.FC<TrafficDisplayProps> = ({ download, upload, downloadColor, uploadColor }) => (
  <div className="flex items-center justify-between w-full">
    <div className="flex items-center">
      <TrafficArrow direction="down" color={downloadColor} />
      <span className="text-base font-bold" style={{ color: downloadColor }}>
        {formatBytes(download).split(' ').join('')}
      </span>
    </div>
    
    <div 
      className="h-5 w-[1px] mx-2 opacity-20"
      style={{ backgroundColor: "currentColor" }}
    />
    
    <div className="flex items-center">
      <TrafficArrow direction="up" color={uploadColor} />
      <span className="text-base font-bold" style={{ color: uploadColor }}>
        {formatBytes(upload).split(' ').join('')}
      </span>
    </div>
  </div>
); 