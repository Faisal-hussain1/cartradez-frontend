'use client';

import Image from 'next/image';
import {BsFuelPump} from 'react-icons/bs';
import {IoSpeedometerOutline} from 'react-icons/io5';
import {TbAutomaticGearboxFilled} from 'react-icons/tb';

import {Badge} from '@/shared/components/ui/badge';
import {Card, CardContent} from '@/shared/components/ui/card';
import {Separator} from '@/shared/components/ui/separator';
import {stringToTitleCase, truncateChars} from '@/shared/utils/general';
import {VehicleCardProps} from '@/shared/interfaces/vehicles';
import PrimaryButton from '../buttons/PrimaryButton';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {PUBLIC_ROUTES, USER_ROUTES} from '@/shared/constants/PATHS';

export default function VehicleCard({vehicle}: VehicleCardProps) {
  const router = useLocaleRouter();

  // vehicle.badge = 'Good Price';

  return (
    <Card
      className='group relative overflow-hidden rounded-2xl shadow-md 
        transition-all duration-300 cursor-pointer 
        hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]
        bg-white'

      // onClick={() => router.push(USER_ROUTES.vehicleDetails(vehicle._id))}
    >
      <div className='relative w-full h-48'>
        <Image
          src={vehicle.coverImage.url}
          alt={vehicle.make}
          fill
          className='object-cover'
        />
        {/* {vehicle.isGreatPrice && (
          <Badge className='absolute top-3 left-3 bg-green-500 text-white px-3 py-1'>
            {vehicle.badge}
          </Badge>
        )} */}
      </div>
      <CardContent className='pt-5 pb-3'>
        <h3 className='text-lg font-semibold'>
          {truncateChars({
            text: `${stringToTitleCase({str: vehicle.make})} ${stringToTitleCase({str: vehicle.model})} ${vehicle.year}`,
            limit: 20,
          })}
        </h3>
        {/* <p className='text-sm text-gray-500'>
          {truncateChars({text: vehicle.description})}
        </p> */}

        {/* <Separator className='mt-2' />

        <div className='grid grid-cols-3 gap-2 mt-3 text-sm text-gray-600'>
          <div>
            <p className='flex justify-center'>
              <IoSpeedometerOutline />
            </p>
            <p className='text-center'>{vehicle.mileage}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <BsFuelPump />
            </p>
            <p className='text-center'>{vehicle.fuelType}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <TbAutomaticGearboxFilled />
            </p>
            <p className='text-center'>{vehicle.transmission}</p>
          </div>
        </div>

        <Separator className='mt-2' /> */}

        <div className='flex items-center justify-between mt-4'>
          {/* {vehicle.currency === 'usd' ? '$ ' : 'ZK '}
          {vehicle.price.toLocaleString()} */}
          <PrimaryButton
            buttonText='View Details'
            onClick={() => router.push(USER_ROUTES.vehicleDetails(vehicle._id))}
            styles={'w-full'}
          />
        </div>
      </CardContent>
    </Card>
  );
}
