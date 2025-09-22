'use client';

import React from 'react';
import { usePublic } from '@/hooks/use-public';
import { config } from '@/lib/config';

export const HeadTitle: React.FC = () => {
  const { data } = usePublic();
  const title = data?.data?.sitename || config.siteTitle;

  React.useEffect(() => {
    if (title && typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);

  return null;
};


