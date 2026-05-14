import {NextRequest, NextResponse} from 'next/server';

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({message: 'Missing url query parameter'}, {status: 400});
  }

  try {
    const upstream = await fetch(imageUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0',
      },
      cache: 'no-store',
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {message: 'Failed to fetch upstream image'},
        {status: upstream.status},
      );
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await upstream.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    return NextResponse.json({message: 'Image proxy failed'}, {status: 500});
  }
}
