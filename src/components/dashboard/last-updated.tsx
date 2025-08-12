'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export interface LastUpdatedProps {
  timestamp: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ timestamp }) => (
  <div 
    className="text-sm text-muted-foreground flex items-center px-3 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm hover:bg-secondary/30 hover:scale-105 transition-all duration-300"
  >
    <Clock className="h-3.5 w-3.5 mr-1.5 text-primary/80" />
    <span suppressHydrationWarning>最后更新: {timestamp}</span>
  </div>
); 