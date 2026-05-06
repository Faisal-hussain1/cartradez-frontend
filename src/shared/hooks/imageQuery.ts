import {NextRequest, NextResponse} from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_IMAGE_HOSTS = new Set([
  'cartradez.s3.eu-north-1.amazonaws.com',
]);

export async function GET(req: NextRequest) {
  try {
    const imageUrl = req.nextUrl.searchParams.get('url');

    if (!imageUrl) {
      return NextResponse.json(
        {message: 'Image URL is required'},
        {status: 400},
      );
    }

    const parsedUrl = new URL(imageUrl);

    if (parsedUrl.protocol !== 'https:') {
      return NextResponse.json(
        {message: 'Only HTTPS image URLs are allowed'},
        {status: 400},
      );
    }

    if (!ALLOWED_IMAGE_HOSTS.has(parsedUrl.hostname)) {
      return NextResponse.json(
        {message: 'Image host is not allowed'},
        {status: 403},
      );
    }

    const response = await fetch(parsedUrl.toString(), {
      cache: 'force-cache',
    });

    if (!response.ok) {
      return NextResponse.json(
        {message: 'Failed to fetch image'},
        {status: response.status},
      );
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    if (!contentType.startsWith('image/')) {
      return NextResponse.json(
        {message: 'URL is not an image'},
        {status: 400},
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);

    return NextResponse.json(
      {message: 'Image proxy failed'},
      {status: 500},
    );
  }
}