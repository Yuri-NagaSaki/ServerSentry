'use client';

import React, { useEffect, useState } from 'react';
import { config } from '@/lib/config';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = (savedTheme as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  const themeToggle = mounted ? (
    <button
      type="button"
      aria-label={theme === 'dark' ? "切换至浅色模式" : "切换至深色模式"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
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
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-14 items-center justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold" suppressHydrationWarning>
            <span className="text-xl" suppressHydrationWarning>
              {config.siteTitle}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href="https://github.com/Yuri-NagaSaki/ServerSentry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border"
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