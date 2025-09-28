export interface JsonRpcRequest<TParams = unknown> {
  jsonrpc: '2.0';
  id: string | number;
  method: string;
  params?: TParams;
}

export interface JsonRpcSuccess<T = unknown> {
  jsonrpc: '2.0';
  id: string | number | null;
  result: T;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export interface JsonRpcFailure {
  jsonrpc: '2.0';
  id: string | number | null;
  error: JsonRpcError;
}

export type JsonRpcResponse<T = unknown> = JsonRpcSuccess<T> | JsonRpcFailure;

// ===== RPC2 实体类型（依据 rpc.md） =====
export interface Client {
  uuid: string;
  token?: string;
  name?: string;
  cpu_name?: string;
  virtualization?: string;
  arch?: string;
  cpu_cores?: number;
  os?: string;
  kernel_version?: string;
  gpu_name?: string;
  ipv4?: string;
  ipv6?: string;
  region?: string;
  remark?: string;
  public_remark?: string;
  mem_total?: number;
  swap_total?: number;
  disk_total?: number;
  version?: string;
  weight?: number;
  price?: number;
  billing_cycle?: number;
  auto_renewal?: boolean;
  currency?: string;
  expired_at?: string;
  group?: string;
  tags?: string;
  hidden?: boolean;
  traffic_limit?: number;
  traffic_limit_type?: 'sum' | 'max' | 'min' | 'up' | 'down' | string;
  created_at?: string;
  updated_at?: string;
}

export interface VersionInfo {
  version: string;
  hash: string;
}

export interface PublicInfo {
  allow_cors?: boolean;
  custom_body?: string;
  custom_head?: string;
  description?: string;
  disable_password_login?: boolean;
  oauth_enable?: boolean;
  oauth_provider?: string;
  ping_record_preserve_time?: number;
  private_site?: boolean;
  record_enabled?: boolean;
  record_preserve_time?: number;
  sitename?: string;
  theme?: string;
  theme_settings?: Record<string, unknown>;
}

export interface NodeStatus {
  client: string;
  time: string;
  cpu: number;
  gpu: number;
  ram: number;
  ram_total: number;
  swap: number;
  swap_total: number;
  load: number;
  load5: number;
  load15: number;
  temp: number;
  disk: number;
  disk_total: number;
  net_in: number;
  net_out: number;
  net_total_up: number;
  net_total_down: number;
  process: number;
  connections: number;
  connections_udp: number;
  online: boolean;
}

export interface MeInfo {
  two_factor_enabled?: boolean; // 兼容字段名变体
  '2fa_enabled'?: boolean;
  logged_in: boolean;
  sso_id?: string;
  sso_type?: string;
  username?: string;
  uuid?: string;
}

export interface StatusRecord {
  client: string;
  time: string;
  cpu?: number;
  gpu?: number;
  ram?: number;
  ram_total?: number;
  swap?: number;
  swap_total?: number;
  load?: number;
  load5?: number;
  load15?: number;
  temp?: number;
  disk?: number;
  disk_total?: number;
  net_in?: number;
  net_out?: number;
  net_total_up?: number;
  net_total_down?: number;
  process?: number;
  connections?: number;
  connections_udp?: number;
}

export interface RecentStatusResp {
  count: number;
  records: StatusRecord[];
}

export interface PingBasicInfo {
  client: string;
  loss: number;
  min: number;
  max: number;
}

export interface PingRecord {
  task_id: number;
  time: string;
  value: number;
  client: string;
}

export type LoadRecordsAllClients = Record<string, StatusRecord[]>;

export interface LoadRecordsWithUuid {
  count: number;
  records: StatusRecord[] | LoadRecordsAllClients;
  from: string;
  to: string;
}

export interface PingRecordsResp {
  count: number;
  basic_info: PingBasicInfo[];
  records: PingRecord[];
  from: string;
  to: string;
}

/**
 * JSON-RPC2 POST 客户端
 */
export async function callRpc<T = unknown, TParams = unknown>(
  baseUrl: string,
  method: string,
  params?: TParams,
  init?: RequestInit
): Promise<T> {
  const url = baseUrl.endsWith('/') ? `${baseUrl}api/rpc2` : `${baseUrl}/api/rpc2`;
  const req: JsonRpcRequest<TParams> = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    body: JSON.stringify(req),
    next: (init as RequestInit & { next?: unknown })?.next,
  } as RequestInit);

  if (!res.ok) {
    throw new Error(`RPC2 HTTP ${res.status}`);
  }
  const payload = (await res.json()) as JsonRpcResponse<T>;
  if ('error' in payload) {
    throw new Error(`RPC2 ${method} error ${payload.error.code}: ${payload.error.message}`);
  }
  return (payload as JsonRpcSuccess<T>).result;
}

// ===== RPC2 方法封装 =====
export function rpcMethods(baseUrl: string, internal?: boolean) {
  const params = typeof internal === 'boolean' ? { internal } : undefined;
  return callRpc<string[]>(baseUrl, 'rpc.methods', params);
}

export function rpcHelp(baseUrl: string, method?: string) {
  const params = method ? { method } : undefined;
  return callRpc<Record<string, unknown> | null>(baseUrl, 'rpc.help', params);
}

export function rpcPing(baseUrl: string) {
  return callRpc<string>(baseUrl, 'rpc.ping');
}

export function rpcGetVersion(baseUrl: string) {
  return callRpc<VersionInfo>(baseUrl, 'common:getVersion');
}

export function rpcGetPublicInfo(baseUrl: string) {
  return callRpc<PublicInfo>(baseUrl, 'common:getPublicInfo');
}

export function rpcGetNodes(baseUrl: string, uuid?: string) {
  type NodesResp = Client | Record<string, Client>;
  const params = uuid ? { uuid } : undefined;
  return callRpc<NodesResp>(baseUrl, 'common:getNodes', params);
}

export function rpcGetNodesLatestStatus(baseUrl: string, uuids?: string[]) {
  const params = Array.isArray(uuids) && uuids.length > 0 ? { uuids } : undefined;
  return callRpc<Record<string, NodeStatus>>(baseUrl, 'common:getNodesLatestStatus', params);
}

export function rpcGetMe(baseUrl: string) {
  return callRpc<MeInfo>(baseUrl, 'common:getMe');
}

export function rpcGetNodeRecentStatus(baseUrl: string, uuid: string) {
  return callRpc<RecentStatusResp>(baseUrl, 'common:getNodeRecentStatus', { uuid });
}

export function rpcGetRecords(
  baseUrl: string,
  params: {
    type?: 'load' | 'ping';
    uuid?: string;
    hours?: number;
    start?: string;
    end?: string;
    load_type?: 'cpu' | 'gpu' | 'ram' | 'swap' | 'load' | 'temp' | 'disk' | 'network' | 'process' | 'connections' | 'all';
    task_id?: number;
    maxCount?: number;
  } = {}
) {
  if (params.type === 'ping') {
    return callRpc<PingRecordsResp>(baseUrl, 'common:getRecords', params);
  }
  return callRpc<LoadRecordsWithUuid>(baseUrl, 'common:getRecords', params);
}


