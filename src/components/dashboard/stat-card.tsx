'use client';

import React from 'react';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { IconContainer } from './icon-container';
import { StatValue } from './stat-value';

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  accentColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  className,
  accentColor = "var(--primary)"
}) => {
  return (
    <Card 
      className={cn(`
        relative overflow-hidden border-none 
        bg-gradient-to-br from-background/80 to-background/40 
        backdrop-blur-sm shadow-lg
        hover:shadow-xl transition-all duration-300
        hover:bg-gradient-to-br hover:from-background/90 hover:to-background/50
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
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-5 transition-opacity duration-300"
        style={{ backgroundColor: accentColor }}
      />
      
      <div className="relative z-10">
        <CardContent className="flex items-center p-6">
          <IconContainer accentColor={accentColor} icon={icon} />
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <StatValue accentColor={accentColor}>{value}</StatValue>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}; 