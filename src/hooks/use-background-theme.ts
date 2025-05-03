'use client';

import { useState, useEffect, useCallback } from 'react';
import { applyBackgroundConfig, type BackgroundConfig } from '@/lib/background-config';
import { backgroundPresets } from '@/components/ui/configurable-background';

type BackgroundPresetKey = keyof typeof backgroundPresets | 'default';

/**
 * 使用背景主题钩子
 * 提供动态更改背景主题功能
 */
export function useBackgroundTheme() {
  // 当前主题状态
  const [currentTheme, setCurrentTheme] = useState<BackgroundPresetKey>('default');
  
  // 应用主题
  const applyTheme = useCallback((theme: BackgroundPresetKey, customConfig?: Partial<BackgroundConfig>) => {
    let config: Partial<BackgroundConfig> = {};
    
    // 预设主题
    if (theme !== 'default' && theme in backgroundPresets) {
      // 由于我们已经更新了backgroundPresets类型，现在可以直接使用
      const preset = backgroundPresets[theme];
      config = {
        light: preset.light,
        dark: preset.dark,
      };
    }
    
    // 合并自定义配置
    if (customConfig) {
      config = {
        ...config,
        ...customConfig,
      };
    }
    
    // 应用配置
    applyBackgroundConfig(config);
    setCurrentTheme(theme);
    
    // 保存用户偏好
    if (typeof window !== 'undefined') {
      localStorage.setItem('background-theme', theme);
    }
  }, []);
  
  // 初始化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('background-theme') as BackgroundPresetKey | null;
      if (savedTheme && (savedTheme === 'default' || savedTheme in backgroundPresets)) {
        applyTheme(savedTheme);
      }
    }
  }, [applyTheme]);
  
  return {
    currentTheme,
    applyTheme,
    presets: Object.keys(backgroundPresets) as (keyof typeof backgroundPresets)[],
  };
} 