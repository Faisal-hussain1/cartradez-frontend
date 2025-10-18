'use client';

import {vehicleDetailsLinkProps} from '@/shared/interfaces/vehicles';
import Image from 'next/image';
import {Heart, MapPin, Share2} from 'lucide-react';
import VehicleDetailsSidebar from './vehicleDetailsSidebar';
import VehicleImages from './vehicleImage';
import OverviewCard from '@/shared/components/common/vehicleDetails/overviewCard';
import DescriptionCard from '@/shared/components/common/vehicleDetails/descriptionCard';
import KeyInformationCard from '@/shared/components/common/vehicleDetails/KeyInformationCard';
import Container from '@/shared/components/common/containers'; // ✅ import Container

export default function VehicleDetails({vehicleId}: vehicleDetailsLinkProps) {
  return (
    <Container className='bg-[#F3F4F6] py-6'>
      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-12 gap-6'>
          {/* ================= Left Section ================= */}
          <div className='col-span-12 lg:col-span-9 flex flex-col gap-6'>
            {/* ================= Vehicle Header Card ================= */}
            <div className='bg-white rounded-2xl shadow-sm w-full p-4 md:p-8'>
              {/* Title + Icons */}
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-5'>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900 leading-tight'>
                  Bugatti Chiron Super Sport 2022
                </h1>
                <div className='flex gap-4 mt-4 md:mt-0'>
                  <Share2 className='w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer transition' />
                  <Heart className='w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition' />
                </div>
              </div>

              {/* Tags */}
              <div className='flex flex-wrap gap-2 mb-5'>
                {[
                  'One Owner',
                  '8.0L W16 Engine',
                  'Imported (France)',
                  'AWD',
                ].map((tag) => (
                  <span
                    key={tag}
                    className='text-xs md:text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className='text-[#0B3E77] font-bold text-2xl md:text-3xl mb-5'>
                ZMW 104,000,000
              </p>

              {/* Location + Date */}
              <div className='flex items-center justify-between text-sm md:text-base text-gray-600 mb-6'>
                {' '}
                <div className='flex items-center gap-2'>
                  {' '}
                  <MapPin className='w-4 h-4 text-gray-500' />{' '}
                  <span className='truncate'>
                    {' '}
                    Viscolo del buio (Grand Golf Road, London), Zambia{' '}
                  </span>{' '}
                </div>{' '}
                <div className='whitespace-nowrap text-gray-500'>
                  {' '}
                  Published: Sept 14, 2025{' '}
                </div>
              </div>
              {/* Vehicle Images */}
              <VehicleImages
                images={[
                  {
                    id: '1',
                    url: '/images/vehicle/Frame 22.png',
                    alt: 'Front view of Bugatti Chiron',
                    isFeatured: true,
                  },
                  {
                    id: '2',
                    url: '/images/vehicle/Frame 22.png',
                    alt: 'Side view of Bugatti Chiron',
                  },
                  {
                    id: '3',
                    url: '/images/vehicle/Frame 22.png',
                    alt: 'Back view of Bugatti Chiron',
                  },
                  {
                    id: '4',
                    url: '/images/vehicle/Frame 22.png',
                    alt: 'Interior dashboard',
                  },
                  {
                    id: '5',
                    url: '/images/vehicle/Frame 22.png',
                    alt: 'Interior seats',
                  },
                  {
                    id: '6',
                    url: '/images/vehicle/engine.jpg',
                    alt: 'Engine view',
                  },
                ]}
                maxThumbnailsToShow={3}
              />
            </div>

            {/* ================= Overview ================= */}
            <OverviewCard
              registrationYear='2021'
              mileage='18,500 km'
              fuelType='Hybrid'
              transmission='Manual'
              features={['Cruise Control', 'Heated Seats', 'Bluetooth']}
            />

            {/* ================= Key Info ================= */}
            <KeyInformationCard
              leftLabels={[
                'Make',
                'Body Type',
                'Engine Capacity',
                'Exterior Color',
                'Number of Owners',
              ]}
              leftValues={[
                'Bugatti',
                'Coupe',
                '8.0L Quad-Turbo W16',
                'Blue Dawn',
                '1',
              ]}
              rightLabels={[
                'Model',
                'Condition',
                'Drive Type',
                'Assembly',
                'Registration City',
              ]}
              rightValues={[
                'Chiron Super Sport',
                'Used',
                'AWD',
                'Imported (France)',
                'Lusaka',
              ]}
            />

            {/* ================= Description ================= */}
            <DescriptionCard
              title='Description'
              paragraphs={[
                `Experience unmatched performance and craftsmanship with the Bugatti Chiron Super Sport 2022 — a masterpiece of engineering that pushes the limits of automotive excellence.`,
                `Powered by an 8.0-liter quad-turbocharged W16 engine producing 1,577 horsepower, this machine delivers breathtaking acceleration and effortless control.`,
              ]}
              bullets={[
                `Unmatched performance: 8.0L quad-turbocharged W16 engine delivering 1,577 horsepower.`,
                `Record-breaking speed: Accelerates 0–100 km/h in just 2.4 seconds — pure engineering art.`,
              ]}
            />
          </div>

          {/* ================= Sidebar ================= */}
          <div className='col-span-12 lg:col-span-3'>
            <VehicleDetailsSidebar />
          </div>
        </div>
      </div>
    </Container>
  );
}
