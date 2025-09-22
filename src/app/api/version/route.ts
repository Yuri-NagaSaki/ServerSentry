export async function GET() {
  try {
    const baseUrl = process.env.KOMARI_BASE_URL;
    if (!baseUrl) {
      throw new Error('KOMARI_BASE_URL not configured');
    }

    const res = await fetch(`${baseUrl}/api/version`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch /api/version: ${res.status}`);
    }
    const data = await res.json();
    return Response.json(data, {
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


