'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Badge } from '../ui/badge';

interface ServerInfoProps {
  uptime: string;
  type?: string;
  location?: string;
}

export const ServerName: React.FC<{ name: string }> = ({ name }) => (
  <motion.div 
    whileHover={{ x: 2 }} 
    transition={{ duration: 0.2 }}
    className="flex items-center gap-1.5"
  >
    <span className="text-xl truncate flex-shrink" suppressHydrationWarning>
      {name}
    </span>
  </motion.div>
);

export const UptimeDisplay: React.FC<{ uptime: string }> = ({ uptime }) => (
  <motion.div 
    className="flex items-center space-x-1 flex-shrink-0"
    whileHover={{ color: "var(--primary)" }}
    transition={{ duration: 0.2 }}
  >
    <Clock className="h-3.5 w-3.5" />
    <span className="whitespace-nowrap" suppressHydrationWarning>运行: {uptime}</span>
  </motion.div>
);

export const ServerTag: React.FC<{ label: string }> = ({ label }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
    <Badge 
      variant="outline" 
      className="h-5 px-1.5 text-[10px] font-normal bg-background/50 dark:bg-background/30" 
      suppressHydrationWarning
    >
      {label}
    </Badge>
  </motion.div>
);

export const ServerInfo: React.FC<ServerInfoProps> = ({ uptime, type, location }) => (
  <>
    <div className="flex items-center justify-between text-muted-foreground text-xs">
      <UptimeDisplay uptime={uptime} />
      {(type || location) && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {type && <ServerTag label={type} />}
          {location && <ServerTag label={location} />}
        </div>
      )}
    </div>
  </>
); 