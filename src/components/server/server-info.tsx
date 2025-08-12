'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ServerInfoProps {
  uptime: string;
  type?: string;
  location?: string;
}

export const ServerName: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-1.5 min-w-0 max-w-full">
    <span className="text-xl truncate flex-shrink" suppressHydrationWarning>
      {name}
    </span>
  </div>
);

export const UptimeDisplay: React.FC<{ uptime: string }> = ({ uptime }) => (
  <div className="flex items-center space-x-1 flex-shrink-0 whitespace-nowrap">
    <Clock className="h-3.5 w-3.5" />
    <span className="whitespace-nowrap" suppressHydrationWarning>运行: {uptime}</span>
  </div>
);

export const ServerTag: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex-shrink-0">
    <Badge 
      variant="outline" 
      className="h-5 px-1 text-[10px] font-normal bg-background/50 dark:bg-background/30 whitespace-nowrap transition-colors duration-150 hover:bg-background/80 hover:border-primary/20" 
      suppressHydrationWarning
    >
      {label}
    </Badge>
  </div>
);

export const ServerInfo: React.FC<ServerInfoProps> = ({ uptime, type, location }) => (
  <>
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground text-xs">
        <UptimeDisplay uptime={uptime} />
      </div>
      {(type || location) && (
        <div className="flex items-center gap-0.5 flex-shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none">
          {type && <ServerTag label={type} />}
          {location && <ServerTag label={location} />}
        </div>
      )}
    </div>
  </>
); 