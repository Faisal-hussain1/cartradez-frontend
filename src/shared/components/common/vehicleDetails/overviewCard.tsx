'use client';

import {stringToTitleCase} from '@/shared/utils/general';
import {Calendar, Gauge, Fuel, Settings2} from 'lucide-react';

interface OverviewCardProps {
  registrationYear?: string;
  mileage?: string;
  fuelType?: string;
  transmission?: string;
  features?: string[];
}

export default function OverviewCard({
  registrationYear = '2022',
  mileage = '3,200 km',
  fuelType = 'Petrol',
  transmission = 'Automatic',
  features = [
    'Air Conditioning',
    'Power Steering',
    'Keyless Entry',
    'Push Start',
    'Airbags',
    'ABS',
    'Reverse Camera',
    'Touchscreen Display',
    'Premium Sound System',
    'Alloy Rims',
    'Fog Lights',
    'Spoiler',
  ],
}: OverviewCardProps) {
  return (
    <div className='bg-white rounded-[16px] shadow-sm w-full p-6 flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-gray-900'>Overview</h2>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray-700'>
        <div className='flex items-center gap-3'>
          <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center'>
            <Calendar className='h-5 w-5 text-gray-600' />
          </div>
          <div>
            <p className='text-xs text-gray-500'>Registration Year</p>
            <p className='font-semibold text-gray-800'>{registrationYear}</p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center'>
            <Gauge className='h-5 w-5 text-gray-600' />
          </div>
          <div>
            <p className='text-xs text-gray-500'>Current Mileage</p>
            <p className='font-semibold text-gray-800'>{mileage} KM</p>
          </div>
        </div>

        {/* Fuel Type */}
        <div className='flex items-center gap-3'>
          <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center'>
            <Fuel className='h-5 w-5 text-gray-600' />
          </div>
          <div>
            <p className='text-xs text-gray-500'>Fuel Type</p>
            <p className='font-semibold text-gray-800'>
              {stringToTitleCase({str: fuelType})}
            </p>
          </div>
        </div>

        {/* Transmission */}
        <div className='flex items-center gap-3'>
          <div className='bg-gray-100 p-2 rounded-full flex items-center justify-center'>
            <Settings2 className='h-5 w-5 text-gray-600' />
          </div>
          <div>
            <p className='text-xs text-gray-500'>Transmission</p>
            <p className='font-semibold text-gray-800'>
              {stringToTitleCase({str: transmission})}
            </p>
          </div>
        </div>
      </div>

      {/* Feature Tags */}
      {/* <div className='flex flex-wrap gap-2 mt-3'>
        {features.map((feature) => (
          <span
            key={feature}
            className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium'
          >
            {feature}
          </span>
        ))}
      </div> */}
    </div>
  );
}
