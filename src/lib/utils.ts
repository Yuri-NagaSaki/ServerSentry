import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化时间戳为字符串 - 使用原生Intl.DateTimeFormat
 * @param timestamp Unix时间戳（秒）
 * @returns 格式化后的时间字符串
 */
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date).replace(/\//g, '-');
}
