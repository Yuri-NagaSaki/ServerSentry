'use client';

import React from 'react';
import { config } from '@/lib/config';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const { theme, mounted, toggleTheme } = useTheme();
  
  const themeToggle = mounted ? (
    <button
      type="button"
      aria-label={theme === 'dark' ? "切换至浅色模式" : "切换至深色模式"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">
        {theme === 'dark' ? "切换至浅色模式" : "切换至深色模式"}
      </span>
    </button>
  ) : (
    <div className="h-9 w-9"></div> 
  );
  
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur bg-background/90 supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold" suppressHydrationWarning>
            <span className="text-xl" suppressHydrationWarning>
              {config.siteTitle}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/zdz/ServerStatus-Rust"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Image
                src={theme === 'dark' ? '/github-mark-white.svg' : '/github-mark.svg'}
                alt="GitHub"
                width={20}
                height={20}
                className="opacity-87"
              />
              <span className="sr-only">GitHub</span>
            </a>
            
            <div suppressHydrationWarning>
              {themeToggle}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 