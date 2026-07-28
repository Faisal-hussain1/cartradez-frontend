'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {Download, X} from 'lucide-react';
import {toBlob, toPng} from 'html-to-image';
import {vehiclesQueries} from '@/shared/reactQuery';

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year?: number;
  price?: number;
  currency?: string;
  listingType?: string | null;
  coverImage?:
    | {
        key?: string;
        url?: string;
      }
    | string;
  images?: Array<
    | {
        key?: string;
        url?: string;
      }
    | string
  >;
  image?: string;
  title?: string;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  engineSize?: number;
  registrationCity?: string;
  registrationYear?: number;
  registrationNumber?: string;
  numberOfOwners?: string | number;
  condition?: string;
  driveType?: string;
  variant?: string;
  description?: string;
  features?: string[];
}

function shouldFetchVehicleDetail(vehicle: Vehicle) {
  return !vehicle.variant || !vehicle.fuelType || !vehicle.transmission;
}

function formatPrice(currency?: string, price?: number) {
  const symbol = currency?.toUpperCase() === 'USD' ? '$' : 'ZMW';
  if (!price && price !== 0) return `${symbol} —`;

  return `${symbol} ${Number(price).toLocaleString()}`;
}

async function waitForImages(element: HTMLElement, timeoutMs = 3000) {
  const images = Array.from(element.querySelectorAll('img'));

  await Promise.all(
    images.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const timeoutId = setTimeout(() => {
          resolve();
        }, timeoutMs);

        img.onload = () => {
          clearTimeout(timeoutId);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(timeoutId);
          resolve();
        };
      });
    }),
  );
}

function preloadFallback(src: string): Promise<void> {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => resolve(), 2000);
    const img = new Image();

    img.onload = () => {
      clearTimeout(timeoutId);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timeoutId);
      resolve();
    };
    img.src = src;
  });
}

function getVehicleTitle(vehicle: Vehicle) {
  return (
    vehicle.title ||
    [vehicle.make.charAt(0).toUpperCase() + vehicle.make.slice(1), vehicle.model, vehicle.year ? `(${vehicle.year})` : '']
      .filter(Boolean)
      .join(' ')
  );
}

const FALLBACK_IMAGE = '/images/table-fallback.png';

function makeImageUrl(url?: string) {
  if (!url) return FALLBACK_IMAGE;
  const normalized = String(url).trim().replace(/\\/g, '/');
  if (normalized.startsWith('data:')) return normalized;
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return normalized;
  }
  if (normalized.startsWith('//')) return `https:${normalized}`;
  if (normalized.startsWith('/')) return normalized;

  const bucketHost = process.env.NEXT_PUBLIC_AWS_BUCKET_HOSTNAME?.replace(
    /^https?:\/\//,
    '',
  );
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '');

  if (bucketHost) return `https://${bucketHost}/${normalized}`;
  if (serverUrl) return `${serverUrl}/${normalized}`;

  return `/${normalized}`;
}

function getProxyImageUrl(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) return url;

  return `/api/image-proxy?url=${encodeURIComponent(url)}`;
}

function getVehicleImage(vehicle: Vehicle, useProxy = false) {
  const coverImage =
    typeof vehicle.coverImage === 'string'
      ? vehicle.coverImage
      : vehicle.coverImage?.url;

  const firstGalleryImage =
    typeof vehicle.images?.[0] === 'string'
      ? vehicle.images?.[0]
      : vehicle.images?.[0]?.url;

  const imageUrl = makeImageUrl(
    coverImage || firstGalleryImage || vehicle.image || FALLBACK_IMAGE,
  );


  return useProxy ? getProxyImageUrl(imageUrl) : imageUrl;
}

function PosterDesign({
  vehicle,
  useProxyImage = false,
}: {
  vehicle: Vehicle;
  useProxyImage?: boolean;
}) {
  const title = getVehicleTitle(vehicle);

  // Derive URLs fresh from props on every render — no stale state
  const rawImage = getVehicleImage(vehicle, false);
  const proxiedImage = getVehicleImage(vehicle, true);

  // imgOverride only tracks error-fallback state.
  // Reset to null whenever the source vehicle image changes so a newly
  // resolved fullVehicle always shows its own cover image.
  const [imgOverride, setImgOverride] = useState<string | null>(null);

  useEffect(() => {
    setImgOverride(null);
  }, [rawImage, proxiedImage]);

  const imageSrc = imgOverride ?? (useProxyImage ? proxiedImage : rawImage);

  const details = [
    {label: 'Year', value: vehicle.year || 'N/A'},
    {label: 'Variant', value: vehicle.variant || 'N/A'},
    {
      label: 'Mileage',
      value: vehicle.mileage
        ? `${vehicle.mileage.toLocaleString()} KM`
        : 'N/A',
    },
    {label: 'Fuel Type', value: vehicle.fuelType || 'N/A'},
    {label: 'Transmission', value: vehicle.transmission || 'N/A'},
    {label: 'Body Type', value: vehicle.bodyType || 'N/A'},
    {label: 'Color', value: vehicle.color || 'N/A'},
    {label: 'Condition', value: vehicle.condition || 'N/A'},
    {
      label: 'Engine',
      value: vehicle.engineSize
        ? `${vehicle.engineSize} cc`
        : 'N/A',
    },
    {label: 'Drive Type', value: vehicle.driveType || 'N/A'},
    {label: 'Available.City', value: vehicle.registrationCity || 'N/A'},
    {label: 'Owners', value: vehicle.numberOfOwners || 'N/A'},
  ];

  return (
    <div
      className='relative h-[1350px] w-[1080px] overflow-hidden bg-[#f7f7f7] text-black'
      style={{fontFamily: 'Arial, sans-serif'}}
    >
      {/* Header */}
      <div className='absolute left-0 top-0 z-10 flex w-full items-center justify-between bg-black px-14 py-9 text-white'>
        <div>
          <h2 className='text-5xl font-black tracking-tight'>CarTradez</h2>
          <p className='mt-2 text-2xl font-medium text-white/70'>
            Zambia's Vehicle Listing Platform
          </p>
        </div>
        <div className='rounded-full bg-[#facc15] px-8 py-4 text-2xl font-black uppercase text-black'>
          {vehicle.listingType || 'Listed Vehicle'}
        </div>
      </div>

      {/* Vehicle Image */}
      <div className='absolute left-0 top-[120px] h-[500px] w-full bg-neutral-200'>
        <img
          src={imageSrc}
          alt={title}
          referrerPolicy='no-referrer'
          loading='eager'
          className='h-full w-full object-cover'
          onError={() => {
            // Never fall back from the proxy to a remote URL. Doing so makes
            // html-to-image fetch S3 in the browser and fail when CORS is not
            // configured on the bucket.
            if (imageSrc !== FALLBACK_IMAGE) {
              setImgOverride(FALLBACK_IMAGE);
            }
          }}
        />
        <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/30 to-transparent px-14 pb-12 pt-36 text-white'>
          <h1 className='max-w-[850px] text-6xl font-black leading-tight'>
            {title}
          </h1>
          <p className='mt-5 text-5xl font-black text-[#facc15]'>
            {formatPrice(vehicle.currency, vehicle.price)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className='absolute left-0 top-[640px] w-full px-12'>
        <div className='grid grid-cols-3 gap-4'>
          {details.map((item) => (
            <div
              key={item.label}
              className='rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm'
            >
              <p className='text-xl font-semibold text-black/45'>
                {item.label}
              </p>
              <p className='mt-2 truncate text-3xl font-black capitalize text-black'>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-6 rounded-[28px] bg-black px-8 py-6 text-center text-white'>
          <h3 className='text-3xl font-black'>Interested in this vehicle?</h3>
          <p className='mt-2 text-xl font-medium text-white/70'>
            Visit CarTradez and contact the seller directly.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-0 left-0 w-full bg-white px-14 py-9 text-center'>
        <p className='text-2xl font-bold text-black'>www.cartradez.com</p>
        <p className='mt-3 text-xl font-medium leading-snug text-black/60'>
          We are not selling vehicles. We only provide online Ad/Listing
          packages.
        </p>
      </div>
    </div>
  );
}

export default function VehiclePngModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const {useFetchVehicleById} = vehiclesQueries();
  const shouldFetchDetail = shouldFetchVehicleDetail(vehicle);

  const {data, isLoading} = useFetchVehicleById({
    params: {vehicleId: shouldFetchDetail ? vehicle._id : ''},
  });

  const fullVehicle: Vehicle = useMemo(() => {
    return data?.vehicle || vehicle;
  }, [data?.vehicle, vehicle]);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      setIsDownloading(true);

      if (document.fonts) await document.fonts.ready;

      await preloadFallback(FALLBACK_IMAGE);
      await waitForImages(posterRef.current);

      // Small settle delay — ensures any src-swap triggered by onError has
      // finished re-rendering before we capture
      await new Promise((r) => setTimeout(r, 150));
      await waitForImages(posterRef.current);

      const filename = `${getVehicleTitle(fullVehicle)
        .replace(/\s+/g, '-')
        .toLowerCase()}-cartradez-poster.png`;

      const exportPixelRatio =
        window.innerWidth <= 430 ? 1 : Math.min(window.devicePixelRatio || 1, 1.75);

      const blob = await toBlob(posterRef.current, {
        cacheBust: true,
        pixelRatio: exportPixelRatio,
        backgroundColor: '#ffffff',
        skipAutoScale: true,
      });

      const link = document.createElement('a');
      if (blob) {
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = filename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoking synchronously can cancel the download in Safari/WebKit.
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);

        return;
      }

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: exportPixelRatio,
        backgroundColor: '#ffffff',
        skipAutoScale: true,
      });

      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (!link.download) {
        window.open(dataUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('PNG download failed:', error);
      alert('PNG download failed. Please check console for details.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm'>
      <div className='w-full max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-xl'>
        <div className='mb-4 flex items-center justify-between gap-4'>
          <div>
            <h3 className='text-lg font-semibold text-foreground'>
              Vehicle PNG Poster
            </h3>
            <p className='text-sm text-muted-foreground'>
              Preview advertising post.
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            <X size={20} />
          </button>
        </div>

        {isLoading && shouldFetchDetail ? (
          <div className='flex h-[420px] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground'>
            Loading vehicle poster...
          </div>
        ) : (
          <>
            {/* Visible scaled preview */}
            <div className='mx-auto h-[360px] w-full max-w-[288px] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm min-[390px]:h-[405px] min-[390px]:max-w-[324px] sm:h-[565px] sm:max-w-[454px]'>
              <div className='origin-top-left scale-[0.266] min-[390px]:scale-[0.3] sm:scale-[0.42]'>
                <PosterDesign vehicle={fullVehicle} />
              </div>
            </div>

            {/* Hidden full-size export version — rendered off-screen, not display:none */}
            <div className='fixed left-[-9999px] top-0'>
              <div ref={posterRef}>
                <PosterDesign vehicle={fullVehicle} useProxyImage />
              </div>
            </div>
          </>
        )}

        <div className='mt-5 flex justify-end gap-3'>
          <button
            onClick={onClose}
            disabled={isDownloading}
            className='rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={handleDownload}
            disabled={isDownloading || isLoading}
            className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50'
          >
            <Download size={16} />
            {isDownloading ? 'Generating...' : 'Download PNG'}
          </button>
        </div>
      </div>
    </div>
  );
}
