'use client';

import {stringToTitleCase} from '@/shared/utils/general';

interface KeyInformationCardProps {
  leftLabels?: string[];
  leftValues?: string[];
  rightLabels?: string[];
  rightValues?: string[];
}

export default function KeyInformationCard({
  leftLabels = [
    'Make',
    'Body Type',
    'Engine Capacity',
    'Exterior Color',
    'Number of Owners',
  ],
  leftValues,
  rightLabels = [
    'Model',
    'Condition',
    'Drive Type',
    'Assembly',
    'Registration City',
  ],
  rightValues,
}: KeyInformationCardProps) {
  return (
    <div className='bg-white rounded-[16px] shadow-sm w-full p-6 flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-gray-900 mb-4'>
        Key information
      </h2>

      <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 text-sm'>
        {/* Left labels column */}
        <div className='flex flex-col space-y-2'>
          {leftLabels.map((label, idx) => (
            <span key={idx} className='text-gray-600'>
              {label}
            </span>
          ))}
        </div>
        {/* Left values column */}
        <div className='flex flex-col space-y-2'>
          {leftValues?.map((val, idx) => (
            <span key={idx} className='font-semibold text-gray-800'>
              {stringToTitleCase({str: val})}
            </span>
          ))}
        </div>
        {/* Right labels column */}
        <div className='flex flex-col space-y-2'>
          {rightLabels.map((label, idx) => (
            <span key={idx} className='text-gray-600'>
              {label}
            </span>
          ))}
        </div>
        {/* Right values column */}
        <div className='flex flex-col space-y-2'>
          {rightValues?.map((val, idx) => (
            <span key={idx} className='font-semibold text-gray-800'>
              {stringToTitleCase({str: val})}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
