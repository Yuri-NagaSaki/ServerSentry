import axios from 'axios';
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
 * 创建API客户端
 */
const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});

/**
 * 获取所有服务器状态
 */
export const getServersStatus = async (): Promise<StatsResponse> => {
  try {
    const response = await apiClient.get<StatsResponse>('/json/stats.json');
    return response.data;
  } catch (error) {
    console.error('获取服务器状态失败:', error);
    throw error;
  }
};

/**
 * 格式化流量数据 (bytes -> human readable)
 * @param bytes 字节数
 * @returns 格式化后的流量
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
};

/**
 * 格式化百分比
 * @param value 值
 * @param total 总量
 * @returns 格式化后的百分比
 */
export const formatPercent = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * 格式化网络速率数据 (bytes -> human readable)
 * @param bytes 字节数
 * @returns 格式化后的速率
 */
export const formatSpeed = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 B/s';
  
  const k = 1024;
  const sizes = ['B/s', 'K/s', 'M/s', 'G/s', 'T/s'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}; 