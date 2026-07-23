import type {Metadata} from 'next';
import {vehicleDetailsPageProps} from '@/shared/interfaces/vehicles';
import VehicleDetails from '@/shared/components/pages/landing/VehicleDetails';

const API_SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'https://cartradez.com';

function titleCase(value: any) {
  return String(value || '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()
    .replace(/\w\S*/g, word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function formatPrice(price: any, currency: any) {
  if (!price) return '';

  const currencyText = String(currency || '').toUpperCase();

  if (currencyText === 'ZMW') {
    return `ZK ${Number(price).toLocaleString()}`;
  }

  return `${currencyText} ${Number(price).toLocaleString()}`;
}

function getVehicle(response: any) {
  return response?.data?.vehicle || response?.body?.vehicle || null;
}

async function fetchVehicle(vehicleId: string) {
  try {
    const res = await fetch(`${API_SERVER_URL}/vehicles/${vehicleId}`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) return null;

    const response = await res.json();
    return getVehicle(response);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: vehicleDetailsPageProps): Promise<Metadata> {
  const {vehicleId} = await params;
  const vehicle = await fetchVehicle(vehicleId);

  if (!vehicle) {
    return {
      title: 'Vehicle for Sale in Zambia | CarTradez',
      description:
        'View vehicle details, photos, price, specifications and seller information on CarTradez.',
      alternates: {
        canonical: `/vehicles/detail/${vehicleId}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const make = titleCase(vehicle.make);
  const model = titleCase(vehicle.model);
  const variant = titleCase(vehicle.variant);
  const year = vehicle.year || '';
  const city = titleCase(vehicle.registrationCity || 'Zambia');
  const bodyType = titleCase(vehicle.bodyType);
  const transmission = titleCase(vehicle.transmission);
  const fuelType = titleCase(vehicle.fuelType);
  const engineSize = vehicle.engineSize ? `${vehicle.engineSize}cc` : '';
  const mileage = vehicle.mileage
    ? `${Number(vehicle.mileage).toLocaleString()} km`
    : '';
  const price = formatPrice(vehicle.price, vehicle.currency);

  const vehicleName = [year, make, model].filter(Boolean).join(' ');

  const titleModifier =
    variant || transmission || bodyType || fuelType || '';

  const seoTitle = titleModifier
    ? `${vehicleName} ${titleModifier} for Sale in ${city} | CarTradez`
    : `${vehicleName} for Sale in ${city} | CarTradez`;

  const fallbackDescription = [
    `Used ${vehicleName}${variant ? ` ${variant}` : ''} for sale in ${city}`,
    price ? `at ${price}` : '',
    mileage ? `with ${mileage} mileage` : '',
    engineSize ? `${engineSize} engine` : '',
    transmission ? `${transmission} transmission` : '',
    fuelType ? `${fuelType} fuel` : '',
    'View photos, specifications and seller details on CarTradez.',
  ]
    .filter(Boolean)
    .join(', ')
    .replace(', View', '. View');

  const metaDescription = (vehicle.description || fallbackDescription).slice(
    0,
    160,
  );

  const imageUrl =
    vehicle?.coverImage?.url ||
    vehicle?.images?.[0]?.url ||
    `${SITE_URL}/images/og/vehicles.jpg`;

  const canonicalPath = `/vehicles/detail/${vehicleId}`;
  const fullUrl = `${SITE_URL}${canonicalPath}`;

  const keywords = [
    `${vehicleName} for sale`,
    `${make} ${model} for sale Zambia`,
    `${make} ${model} ${year}`,
    `${make} ${model} ${transmission}`,
    `${make} ${model} ${bodyType}`,
    `cars for sale in ${city}`,
    `used cars in ${city}`,
    'used cars Zambia',
    'cars for sale Zambia',
    bodyType,
    transmission,
    fuelType,
    variant,
  ].filter(Boolean);

  return {
    title: seoTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seoTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: 'CarTradez',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: metaDescription,
      images: [imageUrl],
    },
  };
}

export default async function VehicleDetailsPage({
  params,
}: vehicleDetailsPageProps) {
  const {vehicleId} = await params;

  return <VehicleDetails vehicleId={vehicleId} />;
}