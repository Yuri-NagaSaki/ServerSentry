'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import { serverColors } from './colors';

interface StatusIndicatorProps {
  isOnline: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline }) => (
  <div className="relative">
    <div 
      className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full animate-pulse" 
      style={{ backgroundColor: isOnline ? serverColors.online : serverColors.offline }}
    />
    <Activity className="h-5 w-5 text-primary/80" />
  </div>
); 