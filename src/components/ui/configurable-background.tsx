'use client';

import React, { useEffect } from 'react';
import { applyBackgroundConfig, type BackgroundConfig } from '@/lib/background-config';

/**
 * 可配置的渐变背景组件（客户端版本）
 * 提供运行时配置选项，同时保持高性能
 */
export function ConfigurableBackground({
  config,
  children,
}: {
  config?: Partial<BackgroundConfig>;
  children?: React.ReactNode;
}) {
  // 在客户端初始化时应用配置
  useEffect(() => {
    if (config) {
      applyBackgroundConfig(config);
    }
  }, [config]);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      {/* 主渐变背景 */}
      <div className="gradient-background"></div>
      
      {/* 网格纹理 */}
      <div className="grid-overlay"></div>
      
      {/* 模糊渐变光点 - 亮色模式 */}
      <div className="light-mode-only">
        <div className="blur-gradient-spot top-left"></div>
        <div className="blur-gradient-spot bottom-right"></div>
      </div>
      
      {/* 模糊渐变光点 - 暗色模式 */}
      <div className="dark-mode-only">
        <div className="blur-gradient-spot dark-top-right"></div>
        <div className="blur-gradient-spot dark-bottom-left"></div>
      </div>
      
      {/* 子组件插槽 */}
      {children}
    </div>
  );
}

// 预设类型，确保与BackgroundConfig兼容
type ThemePreset = {
  light: {
    gradient1: string;
    gradient2: string;
    gridColor: string;
    spot1: string;
    spot2: string;
  };
  dark: {
    gradient1: string;
    gradient2: string;
    gridColor: string;
    spot1: string;
    spot2: string;
  };
};

// 预设配置方案
export const backgroundPresets: Record<string, ThemePreset> = {
  // 蓝紫渐变主题（更现代科技感）
  modern: {
    light: {
      gradient1: 'oklch(0.97 0.03 230)',
      gradient2: 'oklch(0.98 0.025 260)',
      spot1: 'oklch(0.85 0.1 220)',
      spot2: 'oklch(0.87 0.09 270)',
      gridColor: 'oklch(0 0 0 / 0.05)',
    },
    dark: {
      gradient1: 'oklch(0.2 0.07 250)',
      gradient2: 'oklch(0.18 0.06 280)',
      spot1: 'oklch(0.25 0.15 260)',
      spot2: 'oklch(0.22 0.12 290)',
      gridColor: 'oklch(1 0 0 / 0.1)',
    },
  },
  
  // 绿青渐变主题（清新自然）
  nature: {
    light: {
      gradient1: 'oklch(0.96 0.03 160)',
      gradient2: 'oklch(0.97 0.025 140)',
      spot1: 'oklch(0.85 0.1 150)',
      spot2: 'oklch(0.86 0.09 170)',
      gridColor: 'oklch(0 0 0 / 0.05)',
    },
    dark: {
      gradient1: 'oklch(0.22 0.07 170)',
      gradient2: 'oklch(0.20 0.06 150)',
      spot1: 'oklch(0.28 0.12 160)',
      spot2: 'oklch(0.25 0.11 180)',
      gridColor: 'oklch(1 0 0 / 0.1)',
    },
  },
  
  // 橙红渐变主题（温暖活力）
  warm: {
    light: {
      gradient1: 'oklch(0.97 0.03 50)',
      gradient2: 'oklch(0.98 0.025 30)',
      spot1: 'oklch(0.86 0.1 40)',
      spot2: 'oklch(0.87 0.09 60)',
      gridColor: 'oklch(0 0 0 / 0.05)',
    },
    dark: {
      gradient1: 'oklch(0.22 0.07 40)',
      gradient2: 'oklch(0.20 0.06 20)',
      spot1: 'oklch(0.28 0.15 30)',
      spot2: 'oklch(0.26 0.12 50)',
      gridColor: 'oklch(1 0 0 / 0.1)',
    },
  },
}; 