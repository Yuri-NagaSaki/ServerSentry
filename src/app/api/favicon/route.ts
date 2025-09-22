export async function GET() {
  try {
    const url = process.env.FAVICON_URL;
    if (!url) {
      return new Response('FAVICON_URL not configured', { status: 404 });
    }

    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return new Response('Failed to fetch favicon', { status: 502 });
    }

    const contentType = res.headers.get('content-type') || 'image/x-icon';
    const arrayBuffer = await res.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return new Response('Favicon proxy error', { status: 500 });
  }
}


