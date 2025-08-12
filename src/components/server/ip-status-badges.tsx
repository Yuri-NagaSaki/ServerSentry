'use client';

import React from 'react';

interface IPStatusBadgesProps {
  ipv4Online: boolean;
  ipv6Online: boolean;
}

export const IPStatusBadges: React.FC<IPStatusBadgesProps> = ({ 
  ipv4Online, 
  ipv6Online 
}) => {
  return (
    <div className="flex flex-shrink-0 items-center gap-0.5">
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
  return (
    <div className="flex-shrink-0">
      <div 
        className={`flex items-center h-5 px-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all duration-150 hover:scale-105 ${
          isOnline 
            ? 'bg-secondary text-foreground hover:bg-secondary/80' 
            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary/70'
        }`}
      >
        <div 
          className={`h-[6px] w-[6px] rounded-full mr-0.5 transition-colors duration-150 ${
            isOnline ? 'bg-green-500 hover:bg-green-400' : 'bg-gray-400 hover:bg-gray-300'
          }`}
        />
        <span suppressHydrationWarning>IP{protocol}</span>
      </div>
    </div>
  );
}; 