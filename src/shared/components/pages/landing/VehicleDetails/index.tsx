'use client';

import {JSX} from 'react';
import {vehicleDetailsLinkProps} from '@/shared/interfaces/vehicles';
import {MapPin} from 'lucide-react';
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

type VehicleDetailsProps = vehicleDetailsLinkProps & {
  initialVehicle?: any;
};

export default function VehicleDetails({
  vehicleId,
  initialVehicle,
}: VehicleDetailsProps): JSX.Element {
  const {useFetchVehicleById} = vehiclesQueries();

  const router = useLocaleRouter();

  const {
    data: vehicleDetail,
    isPending,
  } = useFetchVehicleById({
    params: {vehicleId},
  });

  const vehicle = vehicleDetail?.vehicle || initialVehicle;
  const naValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'string' && !value.trim()) return 'N/A';
    return String(value);
  };

  const titleParts = [
    vehicle?.make ? stringToTitleCase({str: vehicle.make}) : '',
    vehicle?.model ? stringToTitleCase({str: vehicle.model}) : '',
    vehicle?.year ? String(vehicle.year) : '',
  ].filter(Boolean);

  const locationParts = [
    vehicle?.creatorId?.address,
    vehicle?.creatorId?.city,
    vehicle?.creatorId?.country,
  ].filter((part) => typeof part === 'string' && part.trim());

  const priceLabel =
    typeof vehicle?.price === 'number'
      ? `${vehicle.currency === 'usd' ? '$' : 'ZK'} ${vehicle.price.toLocaleString()}`
      : 'N/A';

  if (isPending && !initialVehicle) return <GlobalLoader />;

  return (
    <Container className='bg-[#F3F4F6] py-6' key={vehicleId}>
      {/* Disclaimer Section */}
      <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded text-yellow-900 text-sm">
        <strong>Disclaimer:</strong> CarTradz only provides a platform for users to buy and sell cars. We are not involved in any transaction between the buyer and seller. CarTradez is not responsible for authentication of uploaded vehicles; it is the customer's responsibility to verify authenticity. Users must read our <a href="/guidelines" className="underline text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">Buyer & Seller Safety Guide</a> before proceeding.
      </div>
      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-12 gap-6'>
          {/* ================= Left Section ================= */}
          <div className='col-span-12 lg:col-span-9 flex flex-col gap-6'>
            <div className="mb-4">
  <button
    onClick={() => router.push(ROOT_ROUTE)}
    className="cursor-pointer flex items-center gap-2
      text-sm font-medium text-gray-600
      hover:text-black transition
    "
  >
    ← Back
  </button>
</div>
            {/* ================= Vehicle Header Card ================= */}
            <div className='bg-white rounded-2xl shadow-sm w-full p-4 md:p-8'>
              {/* Title + Icons */}
              <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-5'>
                <h1 className='text-2xl md:text-3xl font-bold text-black leading-tight'>
                  {titleParts.length > 0 ? titleParts.join(' ') : 'N/A'}
                </h1>
                {/* <div className='flex gap-4 mt-4 md:mt-0'>
                  <Share2 className='w-6 h-6 text-gray-400 hover:text-black cursor-pointer transition' />
                  <Heart className='w-6 h-6 text-gray-400 hover:text-red100 cursor-pointer transition' />
                </div> */}
              </div>
              <p className='text-primary font-bold text-2xl md:text-3xl mb-5'>
                {priceLabel}
              </p>

              {/* Location + Date */}
              <div className='flex items-center justify-between text-sm md:text-base text-gray-600 mb-6'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-gray80' />{' '}
                  <span className='truncate'>
                   N/A
                  </span>
                </div>
                <div className='whitespace-nowrap text-gray80'>
                  Published:{' '}
                  {vehicle?.createdAt
                    ? formatDate({
                        date: vehicle.createdAt,
                        format: 'LLL dd, yyyy',
                      })
                    : 'N/A'}
                </div>
              </div>
              {/* Vehicle Images */}
              <VehicleImages
                images={vehicle?.images || []}
                maxThumbnailsToShow={3}
              />
            </div>

            {/* ================= Overview ================= */}
            <OverviewCard
              registrationYear={naValue(vehicle?.year)}
              mileage={naValue(vehicle?.mileage)}
              fuelType={
                VEHICLE_FUEL_TYPES[
                  vehicle?.fuelType as keyof typeof VEHICLE_FUEL_TYPES
                ]?.label || 'N/A'
              }
              transmission={
                VEHICLE_TRANSMISSION_TYPES[
                  vehicle?.transmission as keyof typeof VEHICLE_TRANSMISSION_TYPES
                ]?.label || 'N/A'
              }
              features={vehicle?.features || []}
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
                naValue(vehicle?.make),
                naValue(vehicle?.bodyType),
                naValue(vehicle?.engineSize),
                naValue(vehicle?.color),
                naValue(vehicle?.numberOfOwners),
              ]}
              rightLabels={[
                'Model',
                'Condition',
                'Drive Type',
                'Registration City',
              ]}
              rightValues={[
                naValue(vehicle?.model),
                naValue(vehicle?.condition),
                naValue(vehicle?.driveType),
                naValue(vehicle?.registrationCity),
              ]}
            />

            {/* ================= Description ================= */}
            <DescriptionCard
              title='Description'
              paragraphs={[naValue(vehicle?.description)]}
            />
          </div>

          {/* ================= Sidebar ================= */}
          <div className='col-span-12 lg:col-span-3'>
            <VehicleDetailsSidebar
              sellerDetails={vehicle?.creatorId}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
