'use client';

import {ReactNode, useEffect, useState} from 'react';
import {
  BadgeDollarSign,
  CalendarDays,
  Fuel,
  Globe2,
  Instagram,
  Phone,
  Settings,
} from 'lucide-react';

interface VehicleImage {
  key?: string;
  url?: string;
}

interface PosterVehicle {
  make: string;
  model: string;
  year?: number;
  price?: number;
  currency?: string;
  coverImage?: VehicleImage | string;
  images?: Array<VehicleImage | string>;
  image?: string;
  title?: string;
  fuelType?: string;
  condition?: string;
  registrationYear?: number;
  variant?: string;
}

const FALLBACK_IMAGE = '/images/table-fallback.png';

function makeImageUrl(url?: string) {
  if (!url) return FALLBACK_IMAGE;

  const normalized = String(url).trim().replace(/\\/g, '/');
  if (normalized.startsWith('data:')) return normalized;
  if (/^https?:\/\//.test(normalized)) return normalized;
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

function proxyImageUrl(url: string) {
  if (!/^https?:\/\//.test(url)) return url;

  // Production routes /api/* to the Express backend. Keep this proxy on a
  // frontend-owned path so the request reaches the Next.js route handler.
  return `/poster-image?url=${encodeURIComponent(url)}`;
}

function getImageSources(vehicle: PosterVehicle, useProxyImage: boolean) {
  const coverImage =
    typeof vehicle.coverImage === 'string'
      ? vehicle.coverImage
      : vehicle.coverImage?.url;

  const galleryImages = (vehicle.images || []).map((image) =>
    typeof image === 'string' ? image : image.url,
  );

  const uniqueImages = Array.from(
    new Set([coverImage, vehicle.image, ...galleryImages].filter(Boolean)),
  ).map((url) => makeImageUrl(url));
  const availableImages = uniqueImages.length ? uniqueImages : [FALLBACK_IMAGE];

  return Array.from({length: 4}, (_, index) => {
    const imageUrl = availableImages[index % availableImages.length];
    
return useProxyImage ? proxyImageUrl(imageUrl) : imageUrl;
  });
}

function formatPrice(currency?: string, price?: number) {
  const symbol = currency?.toUpperCase() === 'USD' ? '$' : 'ZMW';
  if (price === undefined || price === null) return `${symbol} —`;
  
return `${symbol} ${Number(price).toLocaleString()}`;
}

function PosterImage({
  src,
  alt,
  className,
  objectPosition = 'center',
}: {
  src: string;
  alt: string;
  className: string;
  objectPosition?: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <img
      src={failed ? FALLBACK_IMAGE : src}
      alt={alt}
      referrerPolicy='no-referrer'
      loading='eager'
      className={className}
      style={{objectPosition}}
      onError={() => setFailed(true)}
    />
  );
}

function PosterStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className='flex min-w-0 items-center gap-3'>
      <div className='flex h-12 w-12 shrink-0 items-center justify-center text-[#ef171d]'>
        {icon}
      </div>
      <div className='min-w-0'>
        <p className='text-[16px] font-bold leading-none text-[#242424]'>{label}</p>
        <p className='mt-1 truncate text-[25px] font-medium leading-none text-[#07508b]'>
          {value}
        </p>
      </div>
    </div>
  );
}

export default function VehiclePosterDesign({
  vehicle,
  useProxyImage = false,
}: {
  vehicle: PosterVehicle;
  useProxyImage?: boolean;
}) {
  const title =
    vehicle.title ||
    [vehicle.make, vehicle.model, vehicle.year ? `(${vehicle.year})` : '']
      .filter(Boolean)
      .join(' ');
  const imageSources = getImageSources(vehicle, useProxyImage);

  const vehicleName = [vehicle.make, vehicle.model]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();
  const modelDetail = vehicle.variant || vehicle.year?.toString() || 'N/A';
  const registration = vehicle.registrationYear || vehicle.year || 'N/A';

  return (
    <div
      className='relative h-[1350px] w-[1080px] overflow-hidden bg-[#f2f1ef] text-black'
      style={{fontFamily: 'Arial, Helvetica, sans-serif'}}
    >
      <div className='absolute left-[42px] top-[10px] grid h-[525px] w-[996px] grid-cols-3 gap-[14px]'>
        {imageSources.slice(1, 4).map((src, index) => (
          <div key={`${src}-${index}`} className='overflow-hidden bg-[#d9d9d9]'>
            <PosterImage
              src={src}
              alt={`${title} view ${index + 1}`}
              className='h-full w-full object-cover'
              objectPosition={
                index === 0 ? '30% center' : index === 2 ? '70% center' : 'center'
              }
            />
          </div>
        ))}
      </div>

      <div className='absolute left-[57px] top-[38px] z-20 flex h-[154px] w-[154px] items-center justify-center rounded-2xl bg-white/90 p-2 shadow-lg'>
        <img
          src='/images/favicon.png'
          alt='CarTradez'
          className='h-full w-full object-contain'
        />
      </div>

      <div className='absolute left-[68px] top-[476px] z-10 h-[445px] w-[944px] overflow-hidden rounded-[28px] border-[10px] border-[#f2f1ef] bg-white shadow-[0_18px_45px_rgba(0,0,0,0.16)]'>
        <PosterImage
          src={imageSources[0]}
          alt={title}
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent' />
      </div>

      <div className='absolute left-[55px] top-[930px] w-[970px] text-center'>
        <h1 className='truncate text-[62px] font-black uppercase leading-none tracking-tight text-[#ed151c]'>
          {vehicleName}
        </h1>
        <div className='mt-3 flex items-center justify-center gap-3 text-[#07508b]'>
          <span className='h-px w-36 bg-[#07508b]' />
          <p className='max-w-[600px] truncate text-[39px] font-medium leading-none'>
            Model&nbsp; {modelDetail}
          </p>
          <span className='h-px w-36 bg-[#07508b]' />
        </div>
        <p className='mt-5 text-[28px] font-bold text-[#ed151c]'>
          Available at an Exceptionally Low Price
        </p>
      </div>

      <div className='absolute left-[105px] top-[1118px] grid w-[870px] grid-cols-4 gap-5'>
        <PosterStat
          icon={<Settings size={46} strokeWidth={2.5} />}
          label='Condition'
          value={vehicle.condition || 'Good'}
        />
        <PosterStat
          icon={<CalendarDays size={45} strokeWidth={2.3} />}
          label='Registration'
          value={String(registration)}
        />
        <PosterStat
          icon={<Fuel size={46} strokeWidth={2.3} />}
          label='Fuel Type'
          value={vehicle.fuelType || 'N/A'}
        />
        <PosterStat
          icon={<BadgeDollarSign size={48} strokeWidth={2.4} />}
          label='Price'
          value={formatPrice(vehicle.currency, vehicle.price)}
        />
      </div>

      <div className='absolute bottom-[30px] left-[65px] flex h-[82px] w-[950px] items-center justify-between'>
        <div className='flex h-full w-[320px] items-center gap-4 rounded-[22px] bg-white px-5 shadow-sm'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#12aa50] text-white'>
            <Phone size={31} fill='currentColor' />
          </div>
          <div>
            <p className='text-[16px]'>Contact Us</p>
            <p className='text-[21px] font-black'>+260 574928425</p>
          </div>
        </div>

        <div className='flex w-[245px] flex-col items-center gap-2 text-[16px]'>
          <div className='flex items-center gap-2 rounded-md bg-white px-3 py-1 shadow-sm'>
            <Instagram size={22} className='text-[#ed151c]' />
            <span>@cartradezofficial</span>
          </div>
          <div className='flex items-center gap-2 rounded-md bg-white px-3 py-1 shadow-sm'>
            <span className='flex h-5 w-5 items-center justify-center rounded bg-[#1877f2] text-xs font-black text-white'>
              f
            </span>
            <span className='flex h-5 w-5 items-center justify-center rounded bg-[#0a66c2] text-[11px] font-black text-white'>
              in
            </span>
            <span>@CarTradez</span>
          </div>
        </div>

        <div className='flex h-full w-[320px] items-center justify-between rounded-[22px] bg-white px-6 shadow-sm'>
          <div className='text-right'>
            <p className='text-[16px]'>Visit Our Website</p>
            <p className='text-[20px] font-black'>www.cartradez.com</p>
          </div>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-[#ed151c] text-white'>
            <Globe2 size={35} />
          </div>
        </div>
      </div>
    </div>
  );
}
