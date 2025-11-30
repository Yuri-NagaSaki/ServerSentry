export async function GET() {
  try {
    // 从环境变量获取后端地址，代码中绝不出现真实地址
    const backendUrl = process.env.BACKEND_API_URL;
    
    if (!backendUrl) {
      throw new Error('Backend API URL not configured');
    }

    const response = await fetch(backendUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      // 缓存策略
      next: {
        revalidate: 1 // 1秒缓存
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return Response.json(data, {
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