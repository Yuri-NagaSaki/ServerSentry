'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { DashboardStats } from '@/components/dashboard-stats';
import { ServerList } from '@/components/server-list';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" suppressHydrationWarning>
      <Navbar />
      <main 
        className="flex-1 flex flex-col items-center"
        style={{
          contain: 'layout style',
          willChange: 'auto'
        }}
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-10">
          <DashboardStats />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight" suppressHydrationWarning>服务器列表</h2>
            <ServerList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
