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

/**
 * 将秒数格式化为英文简写时长（y/mo/d/h/m/s），自动省略为 0 的单位
 * 近似换算：1月=30天，1年=365天
 */
export function formatDurationEnShort(totalSeconds: number, maxParts = 3): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return '0s';

  const SEC_PER_MIN = 60;
  const SEC_PER_HOUR = 60 * SEC_PER_MIN;
  const SEC_PER_DAY = 24 * SEC_PER_HOUR;
  const SEC_PER_MONTH = 30 * SEC_PER_DAY;
  const SEC_PER_YEAR = 365 * SEC_PER_DAY;

  let remaining = Math.floor(totalSeconds);
  const years = Math.floor(remaining / SEC_PER_YEAR); remaining -= years * SEC_PER_YEAR;
  const months = Math.floor(remaining / SEC_PER_MONTH); remaining -= months * SEC_PER_MONTH;
  const days = Math.floor(remaining / SEC_PER_DAY); remaining -= days * SEC_PER_DAY;
  const hours = Math.floor(remaining / SEC_PER_HOUR); remaining -= hours * SEC_PER_HOUR;
  const minutes = Math.floor(remaining / SEC_PER_MIN); remaining -= minutes * SEC_PER_MIN;
  const seconds = remaining;

  const parts: string[] = [];
  if (years) parts.push(`${years}y`);
  if (months) parts.push(`${months}mo`);
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);

  const limited = parts.slice(0, Math.max(1, maxParts));
  return limited.join(' ');
}