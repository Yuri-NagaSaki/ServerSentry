'use client';

import React from 'react';
import { formatPercent } from '@/lib/api';
import { motion } from 'framer-motion';

interface ServerMetricProps {
  label: string;
  value: number;
  total: number;
  unit?: string;
  formatter?: (value: number) => string;
}

const colors = {
  safe: {
    gradient: 'from-emerald-400 via-emerald-500 to-cyan-500',
    glow: 'shadow-emerald-500/30',
    text: 'text-emerald-400 dark:text-[var(--color-green)]'
  },
  warning: {
    gradient: 'from-amber-400 via-amber-500 to-orange-500',
    glow: 'shadow-amber-500/30',
    text: 'text-amber-400 dark:text-[var(--color-amber)]'
  },
  danger: {
    gradient: 'from-rose-400 via-rose-500 to-red-500',
    glow: 'shadow-rose-500/30',
    text: 'text-rose-400 dark:text-[var(--color-red)]'
  }
};

export const ServerMetric: React.FC<ServerMetricProps> = ({
  label,
  value,
  total,
  unit = '',
  formatter = (val) => val.toString(),
}) => {
  const percent = formatPercent(value, total);
  const formattedValue = formatter(value);
  const formattedTotal = formatter(total);
  
  // 根据百分比确定颜色主题
  const getColorTheme = (percent: number) => {
    if (percent >= 90) {
      return colors.danger;
    } else if (percent >= 70) {
      return colors.warning;
    } else {
      return colors.safe;
    }
  };
  
  const colorTheme = getColorTheme(percent);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">{label}</span>
          <motion.span 
            className={`text-xs font-semibold ${colorTheme.text}`}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            suppressHydrationWarning
          >
            {percent}%
          </motion.span>
        </div>
        <span className="text-sm text-muted-foreground" suppressHydrationWarning>
          {formattedValue}{unit} / {formattedTotal}{unit}
        </span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-secondary/40 backdrop-blur-sm dark:bg-secondary/30">
        <motion.div 
          className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colorTheme.gradient} ${colorTheme.glow} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ 
            duration: 0.8, 
            ease: [0.34, 1.56, 0.64, 1] 
          }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>
      </div>
    </div>
  );
}; 