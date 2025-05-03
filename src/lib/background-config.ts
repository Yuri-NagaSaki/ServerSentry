/**
 * 背景样式配置
 * 允许在应用级别定制背景外观
 */

export type BackgroundConfig = {
  // 亮色主题配置
  light: {
    gradient1: string;
    gradient2: string;
    gridColor: string;
    spot1: string;
    spot2: string;
  };
  // 暗色主题配置
  dark: {
    gradient1: string;
    gradient2: string;
    gridColor: string;
    spot1: string;
    spot2: string;
  };
  // 全局配置
  gridOpacity: number;
  spotOpacity: number;
  blurAmount: string;
  // 动画配置
  enableAnimation: boolean;
};

// 默认配置
export const defaultBackgroundConfig: BackgroundConfig = {
  light: {
    gradient1: 'oklch(0.98 0.012 200)',
    gradient2: 'oklch(0.99 0.018 45)',
    gridColor: 'oklch(0 0 0 / 0.05)',
    spot1: 'oklch(0.8 0.1 200)',
    spot2: 'oklch(0.85 0.08 50)',
  },
  dark: {
    gradient1: 'oklch(0.25 0.05 240)',
    gradient2: 'oklch(0.22 0.04 300)',
    gridColor: 'oklch(1 0 0 / 0.1)',
    spot1: 'oklch(0.3 0.12 270)',
    spot2: 'oklch(0.3 0.08 320)',
  },
  gridOpacity: 0.2,
  spotOpacity: 0.4,
  blurAmount: '100px',
  enableAnimation: true,
};

// 应用背景配置函数
export function applyBackgroundConfig(config: Partial<BackgroundConfig> = {}) {
  const mergedConfig = { ...defaultBackgroundConfig, ...config };
  
  // 应用到CSS变量
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // 亮色主题
    root.style.setProperty('--bg-gradient-1-light', mergedConfig.light.gradient1);
    root.style.setProperty('--bg-gradient-2-light', mergedConfig.light.gradient2);
    root.style.setProperty('--bg-grid-color-light', mergedConfig.light.gridColor);
    root.style.setProperty('--bg-spot-1-light', mergedConfig.light.spot1);
    root.style.setProperty('--bg-spot-2-light', mergedConfig.light.spot2);
    
    // 暗色主题
    root.style.setProperty('--bg-gradient-1-dark', mergedConfig.dark.gradient1);
    root.style.setProperty('--bg-gradient-2-dark', mergedConfig.dark.gradient2);
    root.style.setProperty('--bg-grid-color-dark', mergedConfig.dark.gridColor);
    root.style.setProperty('--bg-spot-1-dark', mergedConfig.dark.spot1);
    root.style.setProperty('--bg-spot-2-dark', mergedConfig.dark.spot2);
    
    // 全局设置
    root.style.setProperty('--bg-grid-opacity', mergedConfig.gridOpacity.toString());
    root.style.setProperty('--bg-spot-opacity', mergedConfig.spotOpacity.toString());
    root.style.setProperty('--bg-blur-amount', mergedConfig.blurAmount);
    
    // 动画控制
    const spotElements = document.querySelectorAll('.blur-gradient-spot');
    spotElements.forEach(element => {
      if (mergedConfig.enableAnimation) {
        (element as HTMLElement).style.animationPlayState = 'running';
      } else {
        (element as HTMLElement).style.animationPlayState = 'paused';
      }
    });
  }
  
  return mergedConfig;
} 