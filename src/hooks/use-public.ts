import { useQuery } from '@tanstack/react-query';

interface PublicResponse {
  status: string;
  message: string;
  data?: {
    sitename?: string;
    description?: string;
    theme?: string;
    theme_settings?: Record<string, unknown> | null;
  };
}

export const usePublic = () => {
  return useQuery<PublicResponse>({
    queryKey: ['komari-public'],
    queryFn: async () => {
      const res = await fetch('/api/public', { next: { revalidate: 5 } });
      if (!res.ok) throw new Error('Failed to load public settings');
      return res.json();
    },
    staleTime: 5_000,
    refetchOnWindowFocus: false,
  });
};


