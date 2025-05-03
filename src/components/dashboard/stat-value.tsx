'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface StatValueProps {
  children: React.ReactNode;
  accentColor: string;
  delay?: number;
}

export const StatValue: React.FC<StatValueProps> = ({ children, accentColor, delay = 0 }) => (
  <motion.div 
    className="text-2xl font-bold" 
    suppressHydrationWarning
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.3, 
      delay: 0.2 + (delay * 0.1) 
    }}
    style={{ color: accentColor }}
  >
    {children}
  </motion.div>
); 