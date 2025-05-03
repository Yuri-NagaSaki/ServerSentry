'use client';

import React from 'react';
import { useBackgroundTheme } from '@/hooks/use-background-theme';
import { SwatchBook } from 'lucide-react';

/**
 * 背景主题选择器
 * 允许用户动态切换背景样式
 */
export function BackgroundThemeSelector() {
  const { currentTheme, applyTheme, presets } = useBackgroundTheme();
  
  return (
    <div className="flex flex-col gap-2 p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border">
      <div className="text-sm font-medium">背景主题</div>
      <div className="flex flex-wrap gap-2">
        {/* 默认主题按钮 */}
        <button
          onClick={() => applyTheme('default')}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            currentTheme === 'default'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          默认
        </button>
        
        {/* 预设主题按钮 */}
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => applyTheme(preset)}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              currentTheme === preset
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {preset === 'modern' ? '科技蓝' : preset === 'nature' ? '自然绿' : '温暖橙'}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 简化的主题切换按钮 - 适用于导航栏
 */
export function ThemeToggleButton() {
  const { currentTheme, applyTheme, presets } = useBackgroundTheme();
  
  // 循环切换主题
  const toggleTheme = () => {
    const allThemes: BackgroundPresetKey[] = ['default', ...presets];
    const currentIndex = allThemes.indexOf(currentTheme as any);
    const nextIndex = (currentIndex + 1) % allThemes.length;
    applyTheme(allThemes[nextIndex]);
  };
  
  return (
    <button
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
      title="切换背景主题"
    >
      <SwatchBook className="h-5 w-5" />
      <span className="sr-only">切换背景主题</span>
    </button>
  );
}

type BackgroundPresetKey = 'default' | keyof typeof import('@/components/ui/configurable-background').backgroundPresets; 