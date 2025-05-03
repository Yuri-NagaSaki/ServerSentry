import React from 'react';

/**
 * 高性能渐变背景组件（服务器组件版本）
 * 使用默认配置，没有客户端交互
 */
export function GradientBackground() {
  return (
    <div aria-hidden="true" className="fixed top-0 right-0 bottom-0 left-0 -z-10 overflow-hidden">
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
    </div>
  );
}

/**
 * 客户端背景组件版本（可配置）
 */
export const ConfigurableBackground = () => GradientBackground(); 