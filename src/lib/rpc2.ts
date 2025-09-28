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

// RPC2 方法封装
export function rpcGetNodes(baseUrl: string, uuid?: string) {
  return callRpc<unknown>(baseUrl, 'common:getNodes', uuid ? { uuid } : undefined);
}

export function rpcGetPublicInfo(baseUrl: string) {
  return callRpc<unknown>(baseUrl, 'common:getPublicInfo');
}

export function rpcGetVersion(baseUrl: string) {
  return callRpc<unknown>(baseUrl, 'common:getVersion');
}

export function rpcGetNodesLatestStatus(baseUrl: string, uuids?: string[]) {
  const params = Array.isArray(uuids) && uuids.length > 0 ? { uuids } : undefined;
  return callRpc<Record<string, unknown>>(baseUrl, 'common:getNodesLatestStatus', params);
}


