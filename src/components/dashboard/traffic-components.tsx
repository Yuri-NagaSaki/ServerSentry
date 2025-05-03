'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { formatBytes } from '@/lib/api';
import { animations } from './animations';

export interface TrafficArrowProps {
  direction?: 'up' | 'down';
  color: string;
  delay?: number;
}

export const TrafficArrow: React.FC<TrafficArrowProps> = ({ direction = 'down', color, delay = 0 }) => (
  <motion.span 
    className="text-sm mr-0.5"
    style={{ color }}
    {...animations.bounce(direction === 'down' ? 'up' : 'down', delay)}
  >
    {direction === 'down' ? '↓' : '↑'}
  </motion.span>
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
    
    <motion.div 
      className="h-5 w-[1px] mx-2 opacity-20"
      style={{ backgroundColor: "currentColor" }}
      animate={{ height: [16, 24, 16] }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    />
    
    <div className="flex items-center">
      <TrafficArrow direction="up" color={uploadColor} delay={0.5} />
      <span className="text-base font-bold" style={{ color: uploadColor }}>
        {formatBytes(upload).split(' ').join('')}
      </span>
    </div>
  </div>
); 