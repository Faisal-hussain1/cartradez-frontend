import {NextRequest} from 'next/server';
import {GET as getProxiedImage} from '@/app/api/image-proxy/route';

export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return getProxiedImage(request);
}
