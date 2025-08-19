'use client';

import React from 'react';
import { config } from '@/lib/config';
import { useTheme } from 'next-themes';

// 内联SVG图标，减少bundle大小
const MoonIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const SunIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const Navbar: React.FC = React.memo(function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // 防止水合错误，在mounted之前不显示主题按钮
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 navbar-glass">
        <div className="flex h-14 items-center justify-center">
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold">
              <span className="text-xl">
                {config.siteTitle}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <GitHubLink />
              <div className="h-9 w-9"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
  
  return (
    <header className="sticky top-0 z-50 navbar-glass">
      <div className="flex h-14 items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold" suppressHydrationWarning>
            <span className="text-xl" suppressHydrationWarning>
              {config.siteTitle}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <GitHubLink />
            
            <button
              type="button"
              aria-label={theme === 'dark' ? "切换至浅色模式" : "切换至深色模式"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md glass-light transition-colors hover:bg-secondary/50"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
              <span className="sr-only">
                {theme === 'dark' ? "切换至浅色模式" : "切换至深色模式"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = 'Navbar';

// 独立的GitHub链接组件，避免主题切换时重新渲染
const GitHubLink = React.memo(function GitHubLink() {
  return (
    <a
      href="https://github.com/Yuri-NagaSaki/ServerSentry"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md glass-light transition-colors hover:bg-secondary/50"
    >
      <svg
        className="h-5 w-5 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
      <span className="sr-only">访问GitHub仓库</span>
    </a>
  );
}); 