'use client';

import React from 'react';
import { Badge } from '../ui/badge';

interface StatusBadgeProps {
  isOnline: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isOnline }) => (
  <div className="hover:scale-105 transition-transform duration-300">
    <Badge 
      variant={isOnline ? 'success' : 'offline'}
      className="flex-shrink-0 ml-2"
      suppressHydrationWarning
    >
      {isOnline ? '在线' : '离线'}
    </Badge>
  </div>
); 