'use client';

import React from 'react';
import { Server, formatBytes } from '@/lib/api';
import { formatDurationCn } from '@/lib/utils';
import { ServerMetric } from './server-metric';
import { Clock, MapPin, Server as ServerIcon } from 'lucide-react';

// 导入拆分后的组件
import {
  StatusIndicator,
  StatusBadge,
  RealTimeNetworkPanel,
  TotalTrafficPanel,
  IPStatusBadges
} from './server';

interface ServerCardProps {
  server: Server;
}

export const ServerCard: React.FC<ServerCardProps> = React.memo(function ServerCard({ server }) {
  const isOnline = server.online4 || server.online6;

  // CPU 显示格式化，限制最多1位小数
  const cpuFormatter = React.useMemo(() => {
    const nf = new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    return (val: number) => nf.format(val);
  }, []);

  // SWAP特殊处理 - 使用 useMemo 缓存
  const swapConfig = React.useMemo(() => {
    const hasSwap = server.swap_total > 0;
    const formatter = (val: number) => {
      if (!hasSwap) {
        return val === 0 ? "未配置" : formatBytes(val * 1024);
      }
      return formatBytes(val * 1024);
    };
    return { hasSwap, formatter };
  }, [server.swap_total]);

  // 缓存格式化函数
  const memoryFormatter = React.useCallback((val: number) => formatBytes(val * 1024), []);
  const diskFormatter = React.useCallback((val: number) => formatBytes(val * 1024 * 1024), []);

  return (
    <div className="h-full server-card card-glass glass-hover rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer">
      {/* 服务器信息头部 */}
      <ServerCardHeader
        server={server}
        isOnline={isOnline}
      />

      {/* 服务器指标内容 */}
      <div className="p-4 pt-0 space-y-3 flex-grow flex flex-col">
        <ServerMetric
          label="CPU"
          value={server.cpu}
          total={100}
          unit="%"
          formatter={cpuFormatter}
        />

        <ServerMetric
          label="内存"
          value={server.memory_used}
          total={server.memory_total}
          formatter={memoryFormatter}
        />

        <ServerMetric
          label="硬盘"
          value={server.hdd_used}
          total={server.hdd_total}
          formatter={diskFormatter}
        />

        <ServerMetric
          label="SWAP"
          value={server.swap_used}
          total={server.swap_total || 1}
          formatter={swapConfig.formatter}
        />

        {/* 网络面板 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 mt-auto">
          <RealTimeNetworkPanel
            downloadSpeed={server.network_rx}
            uploadSpeed={server.network_tx}
          />

          <TotalTrafficPanel
            totalDownload={server.network_in}
            totalUpload={server.network_out}
          />
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // 自定义比较函数，只在服务器数据真正变化时重新渲染
  return JSON.stringify(prevProps.server) === JSON.stringify(nextProps.server);
});
ServerCard.displayName = 'ServerCard';

// 服务器卡片头部组件 - 独立记忆化
interface ServerCardHeaderProps {
  server: Server;
  isOnline: boolean;
}

const ServerCardHeader: React.FC<ServerCardHeaderProps> = React.memo(function ServerCardHeader({
  server,
  isOnline
}) {
  return (
    <div className="p-4 pb-2 space-y-2">
      {/* 名称和状态行 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0 max-w-[70%]">
          <StatusIndicator isOnline={isOnline} />
          <span className="text-xl truncate" suppressHydrationWarning>
            {server.alias || server.name}
          </span>
        </div>
        <StatusBadge isOnline={isOnline} />
      </div>

      {/* 运行时间和标签行 */}
      <div className="flex items-center">
        <UptimeDisplay uptime={server.uptime} />

        <div className="flex items-center gap-0.5 ml-auto flex-shrink-0">
          <IPStatusBadges
            ipv4Online={server.online4}
            ipv6Online={server.online6}
          />
          {server.type && <ServerTypeTag label={server.type} />}
          {server.location && <LocationTag label={server.location} />}
        </div>
      </div>
    </div>
  );
});

// 运行时间显示组件
const UptimeDisplay: React.FC<{ uptime: string }> = React.memo(function UptimeDisplay({ uptime }) {
  // uptime 传入为 "{seconds}s" 或空字符串
  const human = React.useMemo(() => {
    if (!uptime) return '';
    const match = uptime.match(/^(\d+)s$/);
    if (!match) return uptime;
    const seconds = parseInt(match[1], 10);
    return formatDurationCn(seconds, 3);
  }, [uptime]);
  return (
    <span className="inline-flex items-center text-muted-foreground text-xs whitespace-nowrap" title={human}>
      <Clock className="h-3.5 w-3.5 mr-1" />
      <span suppressHydrationWarning>运行: {human || '—'}</span>
    </span>
  );
});
UptimeDisplay.displayName = 'UptimeDisplay';

// 服务器类型标签
const ServerTypeTag: React.FC<{ label: string }> = React.memo(function ServerTypeTag({ label }) {
  return (
    <span className="inline-flex items-center h-5 px-1 rounded-full text-[10px] font-medium bg-secondary/40 text-foreground/80 whitespace-nowrap">
      <ServerIcon className="h-3 w-3 mr-0.5 text-muted-foreground" />
      <span className="truncate max-w-[6rem]" suppressHydrationWarning>{label}</span>
    </span>
  );
});
ServerTypeTag.displayName = 'ServerTypeTag';

// 位置标签
const LocationTag: React.FC<{ label: string }> = React.memo(function LocationTag({ label }) {
  return (
    <span className="inline-flex items-center h-5 px-1 rounded-full text-[10px] font-medium bg-secondary/40 text-foreground/80 whitespace-nowrap">
      <MapPin className="h-3 w-3 mr-0.5 text-muted-foreground" />
      <span className="truncate max-w-[8rem]" suppressHydrationWarning>{label}</span>
    </span>
  );
});
LocationTag.displayName = 'LocationTag';