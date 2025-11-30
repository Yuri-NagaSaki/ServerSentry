export async function GET() {
  try {
    console.log('[API] Step 1: Reading environment variable');
    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      console.error('[API] BACKEND_API_URL not set');
      return Response.json(
        { error: 'Backend API URL not configured', step: 'env_check' },
        { status: 500, headers: { 'Cache-Control': 'no-cache' } }
      );
    }

    console.log('[API] Step 2: Fetching from backend');
    const response = await fetch(backendUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      // 缓存策略
      next: {
        revalidate: 1 // 1秒缓存
      }
    });

    console.log('[API] Step 3: Response received, status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API] Backend error:', response.status, errorText.substring(0, 100));
      return Response.json(
        {
          error: 'Backend returned error',
          step: 'fetch',
          status: response.status,
          statusText: response.statusText,
          preview: errorText.substring(0, 100)
        },
        { status: 500, headers: { 'Cache-Control': 'no-cache' } }
      );
    }

    console.log('[API] Step 4: Parsing JSON');
    const data = await response.json();
    console.log('[API] Step 5: JSON parsed, servers:', data?.servers?.length);

    console.log('[API] Step 6: Returning response');
    return Response.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1, stale-while-revalidate=2',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[API] Unexpected error:', errorMsg, errorStack);

    return Response.json(
      {
        error: 'Failed to fetch server status',
        message: errorMsg,
        stack: errorStack?.split('\n').slice(0, 3).join('\n'),
        step: 'unknown'
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        }
      }
    );
  }
}