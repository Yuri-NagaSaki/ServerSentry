'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { serverColors } from './colors';

interface IPStatusBadgesProps {
  ipv4Online: boolean;
  ipv6Online: boolean;
}

export const IPStatusBadges: React.FC<IPStatusBadgesProps> = ({ 
  ipv4Online, 
  ipv6Online 
}) => {
  return (
    <div className="flex items-center gap-1.5">
      <IPBadge protocol="v4" isOnline={ipv4Online} />
      <IPBadge protocol="v6" isOnline={ipv6Online} />
    </div>
  );
};

interface IPBadgeProps {
  protocol: 'v4' | 'v6';
  isOnline: boolean;
}

const IPBadge: React.FC<IPBadgeProps> = ({ protocol, isOnline }) => {
  // 根据状态选择不同的样式
  const getStyles = () => {
    if (isOnline) {
      return {
        bg: 'bg-secondary/40 dark:bg-secondary/30',
        text: 'text-foreground/80',
        indicatorColor: serverColors.online
      };
    } else {
      return {
        bg: 'bg-secondary/30 dark:bg-secondary/20',
        text: 'text-muted-foreground',
        indicatorColor: serverColors.offline
      };
    }
  };
  
  const styles = getStyles();
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }} 
      transition={{ type: "spring", stiffness: 500 }}
    >
      <div 
        className={`flex items-center h-5 px-1.5 rounded-full text-[10px] font-medium ${styles.bg} ${styles.text}`}
      >
        <div 
          className="h-[6px] w-[6px] rounded-full mr-1 animate-pulse" 
          style={{ backgroundColor: styles.indicatorColor }}
        />
        <span suppressHydrationWarning>IP{protocol}</span>
      </div>
    </motion.div>
  );
}; 