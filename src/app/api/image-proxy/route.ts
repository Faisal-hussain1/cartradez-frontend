import {NextRequest, NextResponse} from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE_HOSTS = new Set([
  'cartradez.s3.eu-north-1.amazonaws.com',
]);

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({message: 'Missing url query parameter'}, {status: 400});
  }

  try {
    const parsedUrl = new URL(imageUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({message: 'Invalid image URL protocol'}, {status: 400});
    }

    if (!ALLOWED_IMAGE_HOSTS.has(parsedUrl.hostname)) {
      return NextResponse.json({message: 'Image host is not allowed'}, {status: 403});
    }

    const upstream = await fetch(parsedUrl.toString(), {
      headers: {
        'user-agent': 'Mozilla/5.0',
        accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      },
      cache: 'no-store',
      redirect: 'follow',
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
        'access-control-allow-origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json({message: 'Image proxy failed'}, {status: 500});
  }
}
