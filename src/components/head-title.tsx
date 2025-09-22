'use client';

import React from 'react';
import { config } from '@/lib/config';

export const HeadTitle: React.FC = () => {
  const [, setTitle] = React.useState<string>(config.siteTitle);

  React.useEffect(() => {
    const controller = new AbortController();
    fetch('/api/public', { signal: controller.signal })
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        const t = json?.data?.sitename;
          setTitle(t);
          document.title = t;
        } else {
          document.title = config.siteTitle;
        }
      })
      .catch(() => {
        document.title = config.siteTitle;
      });
    return () => controller.abort();
  }, []);

  return null;
};


