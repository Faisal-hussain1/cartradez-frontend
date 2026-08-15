import type {MetadataRoute} from 'next';
import {getBaseUrl} from '@/shared/utils/general';
import {SITE_MAP_LINKS} from '@/shared/constants/PATHS';

const API_SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

function extractVehicles(response: any): any[] {
  const body = response?.body ?? response?.data ?? response;

  if (Array.isArray(body)) return body;
  if (Array.isArray(body?.data)) return body.data;
  if (Array.isArray(body?.vehicles)) return body.vehicles;
  if (Array.isArray(body?.results)) return body.results;
  if (Array.isArray(body?.docs)) return body.docs;
  if (Array.isArray(body?.items)) return body.items;

  return [];
}

async function getVehiclesForSitemap() {
  try {
    const allVehicles: any[] = [];
    const limit = 50;
    let page = 1;

    while (true) {
      const res = await fetch(
        `${API_SERVER_URL}/vehicles?page=${page}&limit=${limit}&activeOnly=true`,
        {
          next: {
            revalidate: 3600,
          },
        },
      );

      if (!res.ok) {
        break;
      }

      const response = await res.json();
      const vehicles = extractVehicles(response);

      if (vehicles.length === 0) {
        break;
      }

      allVehicles.push(...vehicles);

      if (vehicles.length < limit) {
        break;
      }

      page += 1;
    }

    return allVehicles;
  } catch (error) {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = getBaseUrl();

  const staticPages: MetadataRoute.Sitemap = Object.values(SITE_MAP_LINKS).map(
    ({url, priority, changeFrequency, lastModified}) => ({
      url: `${BASE_URL}${url}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const vehicles = await getVehiclesForSitemap();

  const vehiclePages: MetadataRoute.Sitemap = vehicles
    .map((vehicle: any) => {
      const vehicleIdentifier =
  vehicle?.slug ||
  vehicle?._id ||
  vehicle?.id ||
  vehicle?.vehicleId;

if (!vehicleIdentifier) return null;
      return {
        url: `${BASE_URL}/vehicles/detail/${vehicleIdentifier}`,
        lastModified: vehicle?.updatedAt
          ? new Date(vehicle.updatedAt)
          : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    })
    .filter(Boolean) as MetadataRoute.Sitemap;

  return [...staticPages, ...vehiclePages];
}