import type {MetadataRoute} from 'next';
import {getBaseUrl} from '@/shared/utils/general';
import {SITE_MAP_LINKS} from '@/shared/constants/PATHS';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = getBaseUrl();

  return Object.values(SITE_MAP_LINKS).map(
    ({url, priority, changeFrequency, lastModified}) => ({
      url: `${BASE_URL}${url}`,
      lastModified,
      changeFrequency,
      priority,
    })
  );
}
