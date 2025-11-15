'use client';

import {FEATURE_GROUPS_LIST} from '@/shared/constants/vehicles';
import {Calendar, Gauge, Fuel, Settings2} from 'lucide-react';

interface OverviewCardProps {
  registrationYear: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  features: string[];
}

export default function OverviewCard({
  registrationYear,
  mileage,
  fuelType,
  transmission,
  features,
}: OverviewCardProps) {
  const featureMap = FEATURE_GROUPS_LIST.flatMap((group) => group.items);

  const preparedData = [
    {
      label: 'Registration Year',
      value: registrationYear,
      icon: <Calendar className='h-5 w-5 text-gray90' />,
    },
    {
      label: 'Current Mileage',
      value: mileage,
      icon: <Gauge className='h-5 w-5 text-gray90' />,
    },
    {
      label: 'Fuel Type',
      value: fuelType,
      icon: <Fuel className='h-5 w-5 text-gray90' />,
    },
    {
      label: 'Transmission',
      value: transmission,
      icon: <Settings2 className='h-5 w-5 text-gray90' />,
    },
  ];

  return (
    <div className='bg-white rounded-[16px] shadow-sm w-full p-6 flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-black'>Overview</h2>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm text-gray90'>
        {preparedData.map((data) => (
          <div key={data.label} className='flex items-center gap-3'>
            <div className='bg-white p-2 rounded-full flex items-center justify-center'>
              {data.icon}
            </div>
            <div>
              <p className='text-xs text-gray90'>{data.label}</p>
              <p className='font-semibold text-gray-black'>{data.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Tags */}
      <div className='flex flex-wrap gap-2 mt-3'>
        {features.map((feature) => {
          const found = featureMap.find((f) => f.value === feature);

          return (
            <span
              key={feature}
              className='text-xs bg-gray20 text-black px-2 py-1 rounded-md font-medium'
            >
              {found ? found.label : feature}
            </span>
          );
        })}
      </div>
    </div>
  );
}
