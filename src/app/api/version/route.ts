import { rpcGetVersion } from '@/lib/rpc2';

export async function GET() {
  try {
    const data = await rpcGetVersion();
    return Response.json({ status: 'success', message: '', data }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Proxy /api/version error:', error);
    return Response.json(
      { error: 'Failed to fetch version' },
      { status: 500 }
    );
  }
}


