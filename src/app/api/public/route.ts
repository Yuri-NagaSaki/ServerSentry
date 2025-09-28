import { rpcGetPublicInfo } from '@/lib/rpc2';

export async function GET() {
  try {
    const data = await rpcGetPublicInfo();
    return Response.json({ status: 'success', message: '', data }, {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=10',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Proxy /api/public error:', error);
    return Response.json(
      { error: 'Failed to fetch public settings' },
      { status: 500 }
    );
  }
}


