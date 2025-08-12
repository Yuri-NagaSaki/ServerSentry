'use client';

import React from 'react';

export interface IconContainerProps {
  accentColor: string;
  icon: React.ReactNode;
}

export const IconContainer: React.FC<IconContainerProps> = ({ accentColor, icon }) => (
  <div 
    className="p-3 rounded-xl backdrop-blur-sm shadow-inner mr-4 relative overflow-hidden"
    style={{ backgroundColor: `${accentColor}15` }}
  >
    <div
      className="absolute inset-0 rounded-xl opacity-30"
      style={{ backgroundColor: `${accentColor}10` }}
    />
    <div
      className="relative z-10"
      style={{ color: accentColor }}
    >
      {icon}
    </div>
  </div>
); 