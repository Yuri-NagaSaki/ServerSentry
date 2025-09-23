interface KomariNode {
  uuid: string;
  name?: string;
  cpu_name?: string;
  virtualization?: string;
  arch?: string;
  cpu_cores?: number;
  os?: string;
  kernel_version?: string;
  gpu_name?: string;
  region?: string;
  mem_total?: number;
  swap_total?: number;
  disk_total?: number;
  weight?: number;
  price?: number;
  billing_cycle?: number;
  auto_renewal?: boolean;
  currency?: string;
  expired_at?: string | null;
  group?: string;
  tags?: string;
  hidden?: boolean;
  traffic_limit?: number;
  traffic_limit_type?: string;
  created_at?: string;
  updated_at?: string;
}

interface KomariRecentEntry {
  cpu?: { usage?: number };
  ram?: { total?: number; used?: number };
  swap?: { total?: number; used?: number };
  load?: { load1?: number; load5?: number; load15?: number };
  disk?: { total?: number; used?: number };
  network?: { up?: number; down?: number; totalUp?: number; totalDown?: number };
  connections?: { tcp?: number; udp?: number };
  uptime?: number;
  process?: number;
  message?: string;
  updated_at?: string;
}

export async function GET() {
  try {
    // 读取 Komari 服务端基础地址，例如：https://komari.example.com
    const baseUrl = process.env.KOMARI_BASE_URL;
    if (!baseUrl) {
      throw new Error('KOMARI_BASE_URL not configured');
    }

    // 1) 获取节点列表
    const nodesRes = await fetch(`${baseUrl}/api/nodes`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      next: {
        revalidate: 1
      }
    });
    if (!nodesRes.ok) {
      throw new Error(`Failed to fetch nodes: ${nodesRes.status}`);
    }
    const nodesJson = await nodesRes.json();
    const nodes: KomariNode[] = Array.isArray(nodesJson?.data) ? (nodesJson.data as KomariNode[]) : [];

    // 2) 为每个节点获取最近1分钟数据（取最后一条）
    const enriched = await Promise.all(nodes.map(async (node: KomariNode) => {
      try {
        const recentRes = await fetch(`${baseUrl}/api/recent/${encodeURIComponent(node.uuid)}`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          },
          next: {
            revalidate: 1
          }
        });
        const recentJson = recentRes.ok ? await recentRes.json() : null;
        const list: KomariRecentEntry[] = Array.isArray(recentJson?.data) ? (recentJson.data as KomariRecentEntry[]) : [];
        const last: KomariRecentEntry | null = list.length > 0 ? list[list.length - 1] : null;

        const updatedAt = last?.updated_at ? Date.parse(last.updated_at) : 0;
        const timeSinceUpdate = Date.now() - updatedAt;

        // 智能在线判断：结合多个指标，减少误判
        let consideredOnline = false;

        if (timeSinceUpdate <= 60_000) {
          // 1分钟内，直接认为在线
          consideredOnline = true;
        } else if (timeSinceUpdate <= 300_000) {
          // 1-5分钟之间，检查是否有其他在线指标
          const hasActivity = Boolean(
            (last?.uptime && last.uptime > 0) ||
            (last?.cpu?.usage && last.cpu.usage > 0) ||
            (last?.network?.up && last.network.up > 0) ||
            (last?.network?.down && last.network.down > 0) ||
            (last?.ram?.used && last.ram.used > 0)
          );
          consideredOnline = hasActivity;
        } else {
          // 超过5分钟，认为离线
          consideredOnline = false;
        }

        // 单位转换：Komari 为字节；前端期望：内存/Swap = KiB，磁盘 = MiB
        const memTotalKiB = Math.round((last?.ram?.total ?? node.mem_total ?? 0) / 1024);
        const memUsedKiB = Math.round((last?.ram?.used ?? 0) / 1024);
        const swapTotalKiB = Math.round((last?.swap?.total ?? node.swap_total ?? 0) / 1024);
        const swapUsedKiB = Math.round((last?.swap?.used ?? 0) / 1024);
        const diskTotalMiB = Math.round((last?.disk?.total ?? node.disk_total ?? 0) / (1024 * 1024));
        const diskUsedMiB = Math.round((last?.disk?.used ?? 0) / (1024 * 1024));

        // 映射为现有前端期望的 Server 结构
        const server = {
          name: node.name || node.uuid,
          alias: node.group || '',
          type: node.virtualization || node.arch || '',
          location: node.region || node.group || '',
          online4: consideredOnline,
          online6: consideredOnline,
          uptime: typeof last?.uptime === 'number' ? `${last.uptime}s` : '',
          load_1: last?.load?.load1 ?? 0,
          load_5: last?.load?.load5 ?? 0,
          load_15: last?.load?.load15 ?? 0,
          // Komari: network.down = 下载速率，network.up = 上传速率（字节/秒）
          network_rx: last?.network?.down ?? 0,
          network_tx: last?.network?.up ?? 0,
          network_in: last?.network?.totalDown ?? 0,
          network_out: last?.network?.totalUp ?? 0,
          cpu: last?.cpu?.usage ?? 0,
          memory_total: memTotalKiB,
          memory_used: memUsedKiB,
          swap_total: swapTotalKiB,
          swap_used: swapUsedKiB,
          hdd_total: diskTotalMiB,
          hdd_used: diskUsedMiB,
          labels: node.tags || '',
          weight: node.weight ?? 0,
          custom: '',
          gid: node.group || '',
          last_network_in: undefined,
          last_network_out: undefined,
          notify: undefined,
          vnstat: undefined,
          ping_10010: undefined,
          ping_189: undefined,
          ping_10086: undefined,
          time_10010: undefined,
          time_189: undefined,
          time_10086: undefined,
          tcp_count: last?.connections?.tcp ?? 0,
          udp_count: last?.connections?.udp ?? 0,
          process_count: last?.process ?? 0,
          thread_count: undefined,
          latest_ts: updatedAt || Date.now(),
          si: undefined,
        };
        return server;
      } catch {
        // 若 recent 拉取失败，仍返回基本节点信息，视为离线
        return {
          name: node.name || node.uuid,
          alias: node.group || '',
          type: node.virtualization || node.arch || '',
          location: node.region || node.group || '',
          online4: false,
          online6: false,
          uptime: '',
          load_1: 0,
          load_5: 0,
          load_15: 0,
          network_rx: 0,
          network_tx: 0,
          network_in: 0,
          network_out: 0,
          cpu: 0,
          memory_total: Math.round((node.mem_total ?? 0) / 1024),
          memory_used: 0,
          swap_total: Math.round((node.swap_total ?? 0) / 1024),
          swap_used: 0,
          hdd_total: Math.round((node.disk_total ?? 0) / (1024 * 1024)),
          hdd_used: 0,
          labels: node.tags || '',
          weight: node.weight ?? 0,
          custom: '',
          gid: node.group || '',
          last_network_in: undefined,
          last_network_out: undefined,
          notify: undefined,
          vnstat: undefined,
          ping_10010: undefined,
          ping_189: undefined,
          ping_10086: undefined,
          time_10010: undefined,
          time_189: undefined,
          time_10086: undefined,
          tcp_count: 0,
          udp_count: 0,
          process_count: 0,
          thread_count: undefined,
          latest_ts: Date.now(),
          si: undefined,
        };
      }
    }));

    const resp = {
      updated: Math.floor(Date.now() / 1000),
      servers: enriched,
    };

    return Response.json(resp, {
      headers: {
        'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=2',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return Response.json(
      { error: 'Failed to fetch server status' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        }
      }
    );
  }
}