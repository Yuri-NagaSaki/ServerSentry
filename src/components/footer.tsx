'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t">
      <div className="flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a
              href="https://catcat.blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              猫猫博客
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}; 