import type {MetadataRoute} from 'next';
import {getBaseUrl} from '@/shared/utils/general';

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    rules: {
      userAgent: '*',
      allow: isProduction ? '/' : '',
      disallow: isProduction ? ['/dashboard/'] : ['/'],
    },
    sitemap: isProduction ? `${getBaseUrl()}/sitemap.xml` : undefined,
  };
}
