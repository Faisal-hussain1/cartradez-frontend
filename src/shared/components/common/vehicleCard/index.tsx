'use client';

import Image from 'next/image';

import { Card, CardContent } from '@/shared/components/ui/card';
import { stringToTitleCase, truncateChars } from '@/shared/utils/general';
import { VehicleCardProps } from '@/shared/interfaces/vehicles';
import PrimaryButton from '../buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import { USER_ROUTES } from '@/shared/constants/PATHS';

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const router = useLocaleRouter();

  return (
    <Card
      className="
        group relative overflow-hidden rounded-xl shadow-sm
        transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]
        bg-white
        max-w-[260px] w-full
      "
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

      <CardContent className="pt-3 pb-3 px-3">
        
        {/* Title */}
        <h3 className="text-sm font-semibold leading-tight">
          {truncateChars({
            text: `${stringToTitleCase({ str: vehicle.make })} ${stringToTitleCase({ str: vehicle.model })} ${vehicle.year}`,
            limit: 18,
          })}
        </h3>

        {/* Price Section */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-primary font-semibold text-sm">
            {vehicle?.currency === 'usd' ? '$' : 'ZK'}{' '}
            {vehicle?.price?.toLocaleString()}
          </p>
        </div>

        {/* Button */}
        <div className="mt-3">
          <PrimaryButton
            buttonText="View Details"
            onClick={() =>
              router.push(USER_ROUTES.vehicleDetails(vehicle._id))
            }
            styles="w-full text-sm py-1.5"
          />
        </div>
      </CardContent>
    </Card>
  );
}