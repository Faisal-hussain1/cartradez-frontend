import {NextRequest, NextResponse} from 'next/server';

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

const configuredBucketHost = process.env.NEXT_PUBLIC_AWS_BUCKET_HOSTNAME
  ?.trim()
  .replace(/^https?:\/\//, '')
  .replace(/\/.*$/, '')
  .toLowerCase();

// Keep the proxy restricted to the image providers used by CarTradez.
// New uploads are stored in Cloudinary, while older vehicle records can
// still point at either of the legacy S3 hostnames.
const ALLOWED_IMAGE_HOSTS = new Set(
  [
    configuredBucketHost,
    'res.cloudinary.com',
    'cartradez.s3.amazonaws.com',
    'cartradez.s3.eu-north-1.amazonaws.com',
  ].filter((host): host is string => Boolean(host)),
);

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

    if (!ALLOWED_IMAGE_HOSTS.has(parsedUrl.hostname.toLowerCase())) {
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
    if (!contentType.toLowerCase().startsWith('image/')) {
      return NextResponse.json(
        {message: 'Upstream URL did not return an image'},
        {status: 415},
      );
    }
    const arrayBuffer = await upstream.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=300, stale-while-revalidate=600',
        'access-control-allow-origin': '*',
      },
    });
  } catch (_error) {
    return NextResponse.json({message: 'Image proxy failed'}, {status: 500});
  }
}
