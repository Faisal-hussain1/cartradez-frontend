'use client';

import Container from '@/shared/components/common/containers';
import {ArrowUpRightIcon} from '@/shared/components/icons';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {PUBLIC_ROUTES} from '@/shared/constants/PATHS';
import {LIST_TYPES} from '@/shared/constants/general';
import {userQueries, vehiclesQueries} from '@/shared/reactQuery';
import {Vehicle} from '@/shared/interfaces/common';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import VehicleListing from '@/shared/components/common/home/VehicleListing';
import CarOptions from './Options';
import FiltersBar from '@/shared/components/common/FilterBar';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {vehicleDetailsLinkProps} from '@/shared/interfaces/vehicles';
import {ImageSlider} from '@/shared/components/common/imagesSlider';

export default function VehicleDetails({vehicleId}: vehicleDetailsLinkProps) {
  console.log('vehicleId', vehicleId);

  const {useFetchVehicleById} = vehiclesQueries();

  const {data, isPending, error} = useFetchVehicleById({
    params: {vehicleId},
  });

  console.log('data', data);

  if (isPending)
    return (
      <div className='flex justify-center'>
        <Container>
          <GlobalLoader />
        </Container>
      </div>
    );

  return (
    <div className='flex justify-center'>
      <Container>
        <div className='mt-8'>
          <h1 className='text-5xl'>
            {data.vehicle.make} - {data.vehicle.year}
          </h1>

          <div className='mt-5'>
            <ImageSlider images={data.vehicle.images} />
          </div>
        </div>
      </Container>
    </div>
  );
}
