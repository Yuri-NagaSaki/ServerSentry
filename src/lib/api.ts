import { config } from './config';

// 定义服务器类型
export interface Server {
  name: string;
  alias: string;
  type: string;
  location: string;
  online4: boolean;
  online6: boolean;
  uptime: string;
  load_1: number;
  load_5: number;
  load_15: number;
  network_rx: number;
  network_tx: number;
  network_in: number;
  network_out: number;
  cpu: number;
  memory_total: number;
  memory_used: number;
  swap_total: number;
  swap_used: number;
  hdd_total: number;
  hdd_used: number;
  labels: string;
  weight: number;
  custom: string;
  gid: string;
  last_network_in?: number;
  last_network_out?: number;
  notify?: boolean;
  vnstat?: boolean;
  ping_10010?: number;
  ping_189?: number;
  ping_10086?: number;
  time_10010?: number;
  time_189?: number;
  time_10086?: number;
  tcp_count?: number;
  udp_count?: number;
  process_count?: number;
  thread_count?: number;
  latest_ts?: number;
  si?: boolean;
}

// 定义API响应类型
export interface StatsResponse {
  updated: number;
  servers: Server[];
}

/**
 * 获取所有服务器状态 - 使用原生fetch
 */
export const getServersStatus = async (): Promise<StatsResponse> => {
  try {
    const response = await fetch(config.apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      // Next.js fetch 缓存配置
      next: { 
        revalidate: 1 // 1秒缓存
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取服务器状态失败:', error);
    throw error;
  }
};

/**
 * 格式化流量数据 - 使用原生Intl.NumberFormat
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的流量
 */
export const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  
  const formatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
  
  return `${formatter.format(value)} ${sizes[i]}`;
};

/**
 * 格式化百分比 - 使用原生Intl.NumberFormat
 * @param value 值
 * @param total 总量
 * @returns 格式化后的百分比
 */
export const formatPercent = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * 格式化网络速率数据 - 使用原生Intl.NumberFormat
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的速率
 */
export const formatSpeed = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 B/s';
  
  const k = 1024;
  const sizes = ['B/s', 'K/s', 'M/s', 'G/s', 'T/s', 'P/s', 'E/s', 'Z/s', 'Y/s'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  
  const formatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
  
  return `${formatter.format(value)} ${sizes[i]}`;
};

/**
 * 地区分组类型
 */
export interface RegionGroup {
  region: string;
  servers: Server[];
}

/**
 * 根据服务器location字段按地区分组
 * @param servers 服务器列表
 * @returns 按地区分组的服务器
 */
export const groupServersByRegion = (servers: Server[]): RegionGroup[] => {
  const groups = new Map<string, Server[]>();
  
  servers.forEach((server) => {
    const region = server.location || '未知地区';
    if (!groups.has(region)) {
      groups.set(region, []);
    }
    groups.get(region)!.push(server);
  });
  
  // 转换为数组并按地区名排序
  return Array.from(groups.entries())
    .map(([region, servers]) => ({ region, servers }))
    .sort((a, b) => {
      // 将"未知地区"排到最后
      if (a.region === '未知地区') return 1;
      if (b.region === '未知地区') return -1;
      return a.region.localeCompare(b.region, 'zh-CN');
    });
};

/**
 * 获取所有唯一的地区列表
 * @param servers 服务器列表
 * @returns 地区列表
 */
export const getUniqueRegions = (servers: Server[]): string[] => {
  const regions = new Set(servers.map(server => server.location || '未知地区'));
  return Array.from(regions).sort((a, b) => {
    if (a === '未知地区') return 1;
    if (b === '未知地区') return -1;
    return a.localeCompare(b, 'zh-CN');
  });
}; 