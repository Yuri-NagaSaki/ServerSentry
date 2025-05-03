'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export interface LastUpdatedProps {
  timestamp: string;
}

export const LastUpdated: React.FC<LastUpdatedProps> = ({ timestamp }) => (
  <motion.div 
    className="text-sm text-muted-foreground flex items-center px-3 py-1.5 rounded-full bg-secondary/20 backdrop-blur-sm"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ 
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <Clock className="h-3.5 w-3.5 mr-1.5 text-primary/80" />
    </motion.div>
    <span suppressHydrationWarning>最后更新: {timestamp}</span>
  </motion.div>
); 