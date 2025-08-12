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
        className={`flex items-center h-5 px-1 rounded-full text-[10px] font-medium whitespace-nowrap ${
          isOnline 
            ? 'bg-secondary text-foreground' 
            : 'bg-secondary/50 text-muted-foreground'
        }`}
      >
        <div 
          className={`h-[6px] w-[6px] rounded-full mr-0.5 ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />
        <span suppressHydrationWarning>IP{protocol}</span>
      </div>
    </div>
  );
}; 