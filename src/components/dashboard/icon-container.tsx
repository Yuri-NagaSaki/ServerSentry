'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { animations } from './animations';

export interface IconContainerProps {
  accentColor: string;
  icon: React.ReactNode;
}

export const IconContainer: React.FC<IconContainerProps> = ({ accentColor, icon }) => (
  <div 
    className="p-3 rounded-xl backdrop-blur-sm shadow-inner mr-4 relative overflow-hidden"
    style={{ backgroundColor: `${accentColor}15` }}
  >
    <motion.div
      {...animations.pulse}
      className="absolute inset-0 rounded-xl"
      style={{ backgroundColor: `${accentColor}10` }}
    />
    <motion.div
      className="relative z-10"
      {...animations.rotate}
      style={{ color: accentColor }}
    >
      {icon}
    </motion.div>
  </div>
); 