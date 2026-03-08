'use client';

import {JSX} from 'react';
import {vehicleDetailsLinkProps} from '@/shared/interfaces/vehicles';
import {Heart, MapPin, Share2} from 'lucide-react';
import VehicleDetailsSidebar from './vehicleDetailsSidebar';
import VehicleImages from './vehicleImage';
import OverviewCard from '@/shared/components/common/vehicleDetails/overviewCard';
import DescriptionCard from '@/shared/components/common/vehicleDetails/descriptionCard';
import KeyInformationCard from '@/shared/components/common/vehicleDetails/KeyInformationCard';
import Container from '@/shared/components/common/containers';
import {vehiclesQueries} from '@/shared/reactQuery';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {ROOT_ROUTE} from '@/shared/constants/PATHS';
import {stringToTitleCase} from '@/shared/utils/general';
import {formatDate} from '@/shared/utils/dateUtils';
import {
  VEHICLE_FUEL_TYPES,
  VEHICLE_TRANSMISSION_TYPES,
} from '@/shared/constants/vehicles';

export default function VehicleDetails({
  vehicleId,
}: vehicleDetailsLinkProps): JSX.Element {
  const {useFetchVehicleById} = vehiclesQueries();

  const router = useLocaleRouter();

  const {
    data: vehicleDetail,
    isPending,
    error,
  } = useFetchVehicleById({
    params: {vehicleId},
  });
  

  if (isPending) return <GlobalLoader />;

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
                <h1 className='text-2xl md:text-3xl font-bold text-black leading-tight'>
                  {/* Bugatti Chiron Super Sport 2022 */}
                  {`${stringToTitleCase({str: vehicleDetail?.vehicle.make})} ${stringToTitleCase({str: vehicleDetail.vehicle.model})} ${vehicleDetail.vehicle.year}`}
                </h1>
                <div className='flex gap-4 mt-4 md:mt-0'>
                  <Share2 className='w-6 h-6 text-gray-400 hover:text-black cursor-pointer transition' />
                  <Heart className='w-6 h-6 text-gray-400 hover:text-red100 cursor-pointer transition' />
                </div>
              </div>
              <p className='text-primary font-bold text-2xl md:text-3xl mb-5'>
                {`${vehicleDetail.vehicle.currency === 'usd' ? '$' : 'ZK'} ${vehicleDetail.vehicle.price.toLocaleString()}`}
              </p>

              {/* Location + Date */}
              <div className='flex items-center justify-between text-sm md:text-base text-gray-600 mb-6'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-gray80' />{' '}
                  <span className='truncate'>N/A</span>
                </div>
                <div className='whitespace-nowrap text-gray80'>
                  Published:{' '}
                  {formatDate({
                    date: vehicleDetail.vehicle.createdAt,
                    format: 'LLL dd, yyyy',
                  })}
                </div>
              </div>
              {/* Vehicle Images */}
              <VehicleImages
                images={vehicleDetail.vehicle.images}
                maxThumbnailsToShow={3}
              />
            </div>

            {/* ================= Overview ================= */}
            <OverviewCard
              registrationYear={vehicleDetail.vehicle.year}
              mileage={vehicleDetail.vehicle.mileage}
              fuelType={
                VEHICLE_FUEL_TYPES[
                  vehicleDetail.vehicle
                    .fuelType as keyof typeof VEHICLE_FUEL_TYPES
                ].label
              }
              transmission={
                VEHICLE_TRANSMISSION_TYPES[
                  vehicleDetail.vehicle
                    .transmission as keyof typeof VEHICLE_TRANSMISSION_TYPES
                ].label
              }
              features={vehicleDetail.vehicle.features || []}
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
                `${vehicleDetail.vehicle.make}`,
                `${vehicleDetail.vehicle.bodyType}`,
                `${vehicleDetail.vehicle.engineSize}`,
                `${vehicleDetail.vehicle.color}`,
                `${vehicleDetail.vehicle.numberOfOwners}`,
              ]}
              rightLabels={[
                'Model',
                'Condition',
                'Drive Type',
                'Registration City',
              ]}
              rightValues={[
                `${vehicleDetail.vehicle.model}`,
                `${vehicleDetail.vehicle.condition}`,
                `${vehicleDetail.vehicle.driveType}`,
                `${vehicleDetail.vehicle.registrationCity}`,
              ]}
            />

            {/* ================= Description ================= */}
            <DescriptionCard
              title='Description'
              paragraphs={[`${vehicleDetail.vehicle.description}`]}
            />
          </div>

          {/* ================= Sidebar ================= */}
          <div className='col-span-12 lg:col-span-3'>
            <VehicleDetailsSidebar
              sellerDetails={vehicleDetail.vehicle.creatorId}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
