'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { animations } from './animations';
import { IconContainer } from './icon-container';
import { StatValue } from './stat-value';

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  accentColor?: string;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  className,
  accentColor = "var(--primary)",
  delay = 0
}) => {
  return (
    <motion.div
      {...animations.fadeIn}
      transition={animations.fadeIn.transition(delay)}
    >
      <Card 
        className={cn(`
          relative overflow-hidden border-none 
          bg-gradient-to-br from-background/80 to-background/40 
          backdrop-blur-sm shadow-lg
          transition-all duration-300
        `, className)}
        style={{ 
          "--card-accent": accentColor,
        } as React.CSSProperties}
      >
        {/* 背景荧光效果 */}
        <div 
          className="absolute -z-10 inset-0 opacity-10 dark:opacity-15"
          style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 60%)` }}
        ></div>
        
        {/* 悬停光效 */}
        <motion.div 
          className="absolute inset-0"
          style={{ backgroundColor: accentColor }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          {...animations.hover}
          className="relative z-10"
        >
          <CardContent className="flex items-center p-6">
            <IconContainer accentColor={accentColor} icon={icon} />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <StatValue accentColor={accentColor} delay={delay}>{value}</StatValue>
            </div>
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}; 