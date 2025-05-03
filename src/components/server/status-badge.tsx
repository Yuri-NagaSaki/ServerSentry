'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';

interface StatusBadgeProps {
  isOnline: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ isOnline }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }} 
    transition={{ type: "spring", stiffness: 500 }}
  >
    <Badge 
      variant={isOnline ? 'success' : 'offline'}
      className="flex-shrink-0 ml-2"
      suppressHydrationWarning
    >
      {isOnline ? '在线' : '离线'}
    </Badge>
  </motion.div>
); 