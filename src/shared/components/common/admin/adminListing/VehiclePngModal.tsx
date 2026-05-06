'use client';

import {useMemo, useRef, useState} from 'react';
import {Download, X} from 'lucide-react';
import {toPng} from 'html-to-image';
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
  engineCapacity?: number;
  registrationCity?: string;
  registrationYear?: number;
  condition?: string;
  description?: string;
  features?: string[];
}

function formatPrice(currency?: string, price?: number) {
  const symbol = currency?.toUpperCase() === 'USD' ? '$' : 'ZMW';
  if (!price && price !== 0) return `${symbol} —`;
  return `${symbol} ${Number(price).toLocaleString()}`;
}

// FIX 1: resolve() on onerror instead of reject().
// If an image fails (network error, CORS, missing file) we should NOT abort
// the entire download — we just let it render with whatever the browser has,
// which is either the broken-image placeholder or the fallback src already
// swapped in by the <img onError> handler below.
async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll('img'));

  await Promise.all(
    images.map((img) => {
      // Already loaded and valid
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();

      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        // FIX: was `reject(new Error(...))` — that threw and killed the download
        // for a missing fallback image. Now we resolve so toPng still runs.
        img.onerror = () => resolve();
      });
    }),
  );
}

// FIX 2: pre-load the fallback image so the browser has it in cache before
// toPng tries to embed it. html-to-image inlines images as base64 and needs
// the image to actually be loadable at capture time.
function preloadFallback(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // still resolve — best-effort
    img.src = src;
  });
}

function getVehicleTitle(vehicle: Vehicle) {
  return (
    vehicle.title ||
    [vehicle.make, vehicle.model, vehicle.year ? `(${vehicle.year})` : '']
      .filter(Boolean)
      .join(' ')
  );
}

const FALLBACK_IMAGE = '/images/default-car.jpg';

function makeImageUrl(url?: string) {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return url;
  return `/${url}`;
}

function getProxyImageUrl(url: string) {
  if (url.startsWith('https://cartradez.s3.eu-north-1.amazonaws.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
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
  const image = getVehicleImage(vehicle, useProxyImage);

  const details = [
    {label: 'Year', value: vehicle.year || 'N/A'},
    {
      label: 'Mileage',
      value: vehicle.mileage
        ? `${vehicle.mileage.toLocaleString()} KM`
        : 'N/A',
    },
    {label: 'Fuel', value: vehicle.fuelType || 'N/A'},
    {label: 'Transmission', value: vehicle.transmission || 'N/A'},
    {label: 'Body Type', value: vehicle.bodyType || 'N/A'},
    {label: 'Color', value: vehicle.color || 'N/A'},
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
      <div className='absolute left-0 top-[120px] h-[610px] w-full bg-neutral-200'>
        <img
          src={image}
          alt={title}
          className='h-full w-full object-cover'
          onError={(e) => {
            // Swap to fallback only once to avoid infinite loop
            if (e.currentTarget.src !== window.location.origin + FALLBACK_IMAGE) {
              e.currentTarget.src = FALLBACK_IMAGE;
            }
          }}
        />
        <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-14 pb-12 pt-36 text-white'>
          <h1 className='max-w-[850px] text-6xl font-black leading-tight'>
            {title}
          </h1>
          <p className='mt-5 text-5xl font-black text-[#facc15]'>
            {formatPrice(vehicle.currency, vehicle.price)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className='absolute left-0 top-[730px] w-full px-14'>
        <div className='grid grid-cols-2 gap-5'>
          {details.map((item) => (
            <div
              key={item.label}
              className='rounded-3xl border border-black/10 bg-white p-7 shadow-sm'
            >
              <p className='text-2xl font-semibold text-black/45'>
                {item.label}
              </p>
              <p className='mt-3 text-4xl font-black capitalize text-black'>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className='mt-8 rounded-[32px] bg-black px-10 py-8 text-center text-white'>
          <h3 className='text-4xl font-black'>Interested in this vehicle?</h3>
          <p className='mt-3 text-2xl font-medium text-white/70'>
            Visit CarTradez and contact the seller directly.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-0 left-0 w-full bg-white px-14 py-9 text-center'>
        <p className='text-2xl font-bold text-black'>www.cartradez.com</p>
        <p className='mt-3 text-xl font-medium leading-snug text-black/55'>
          We are not selling vehicles. We only provide online ad/listing
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

  const {data, isLoading} = useFetchVehicleById({
    params: {vehicleId: vehicle._id},
  });

  const fullVehicle: Vehicle = useMemo(() => {
    return data?.vehicle || vehicle;
  }, [data?.vehicle, vehicle]);

  const handleDownload = async () => {
    if (!posterRef.current) return;

    try {
      setIsDownloading(true);

      // Wait for fonts
      if (document.fonts) await document.fonts.ready;

      // FIX 2: pre-load the fallback so html-to-image can embed it as base64.
      // Without this, if the vehicle image fails and the browser swaps to the
      // fallback, html-to-image may still see an unloaded <img> and produce a
      // blank square or throw.
      await preloadFallback(FALLBACK_IMAGE);

      // FIX 1: waitForImages now resolves on error — won't throw for broken imgs
      await waitForImages(posterRef.current);

      // Small settle delay — ensures any src-swap triggered by onError has
      // finished re-rendering before we capture
      await new Promise((r) => setTimeout(r, 150));

      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
        skipAutoScale: true,
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${getVehicleTitle(fullVehicle)
        .replace(/\s+/g, '-')
        .toLowerCase()}-cartradez-poster.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
              Preview advertising post and download high-quality PNG.
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground'
          >
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className='flex h-[420px] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground'>
            Loading vehicle poster...
          </div>
        ) : (
          <>
            {/* Visible scaled preview */}
            <div className='mx-auto h-[565px] w-full max-w-[454px] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm'>
              <div className='origin-top-left scale-[0.42]'>
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