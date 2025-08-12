'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { DashboardStats } from '@/components/dashboard-stats';
import { ServerList } from '@/components/server-list';
import { RegionSelect } from '@/components/region-filter';
import { RegionGroupView } from '@/components/region-group-view';
import { useRegionData } from '@/hooks/use-region-data';

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { regions, regionGroups, isLoading } = useRegionData(selectedRegion);
  
  return (
    <div className="flex flex-col min-h-screen smooth-scroll" suppressHydrationWarning>
      <Navbar />
      <main className="flex-1 flex flex-col items-center smooth-scroll">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-10 content-container">
          <DashboardStats />
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold tracking-tight" suppressHydrationWarning>
                服务器列表
              </h2>
              
              {/* 地区选择下拉菜单 - 紧邻标题放置 */}
              {!isLoading && regions.length > 0 && (
                <RegionSelect
                  regions={regions}
                  selectedRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                />
              )}
            </div>
            
            {/* 服务器列表 - 恢复原始设计逻辑 */}
            {!isLoading && (
              <div className="animate-fade-in server-grid">
                {selectedRegion ? (
                  // 选择了特定地区时，只显示该地区的服务器，不显示地区标题
                  <RegionGroupView 
                    regionGroups={regionGroups} 
                    showRegionHeaders={false}
                  />
                ) : (
                  // 默认状态：显示所有服务器，使用原有ServerList组件
                  <ServerList />
                )}
              </div>
            )}
            
            {/* 加载状态 */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 server-grid">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-48 bg-secondary/20 rounded-md animate-pulse animate-slide-up" 
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
