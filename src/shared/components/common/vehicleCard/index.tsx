'use client';

import Image from 'next/image';

import { Card, CardContent } from '@/shared/components/ui/card';
import { stringToTitleCase, truncateChars } from '@/shared/utils/general';
import { VehicleCardProps } from '@/shared/interfaces/vehicles';
import PrimaryButton from '../buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import { USER_ROUTES } from '@/shared/constants/PATHS';

export default function VehicleCard({ vehicle, className = '' }: VehicleCardProps) {
  const router = useLocaleRouter();
  const handleViewDetails = () => {
    router.push(USER_ROUTES.vehicleDetails(vehicle._id), { scroll: true });
  };


  return (
    <Card
      onClick={handleViewDetails}
      className={`
        group relative overflow-hidden rounded-xl shadow-sm
        transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
        bg-white
        w-full max-w-[260px]
        flex flex-col h-full
        ${className}
      `}
    >
      {/* Image */}
      <div className="relative w-full h-36">
        <Image
          src={vehicle.coverImage?.url}
          alt={vehicle.make}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="pt-3 pb-3 px-3 flex flex-col flex-1">
        
        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight min-h-[40px]">
  {truncateChars({
    text: `${stringToTitleCase({ str: vehicle.make })} ${stringToTitleCase({ str: vehicle.model })} ${vehicle.year}`,
    limit: 18,
  })}
</h3>

<div className="mt-2">
  <p className="text-primary font-semibold text-sm">
    {vehicle?.currency === 'usd' ? '$' : 'ZK'}{' '}
    {vehicle?.price?.toLocaleString()}
  </p>
</div>

<div className="mt-auto pt-3">
  <PrimaryButton
    buttonText="View Details"
    onClick={handleViewDetails}
    styles="w-full text-sm py-1.5"
  />
</div>
      </CardContent>
    </Card>
  );
}
