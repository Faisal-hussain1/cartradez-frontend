'use client';

import Container from '@/shared/components/common/containers';
import {ArrowUpRightIcon} from '@/shared/components/icons';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {PUBLIC_ROUTES} from '@/shared/constants/PATHS';
import {LIST_TYPES} from '@/shared/constants/general';
import {vehiclesQueries} from '@/shared/reactQuery';
import {Vehicle} from '@/shared/interfaces/common';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import VehicleListing from '@/shared/components/common/vehicleListing';
import FiltersBar from '@/shared/components/common/FilterBar';

export default function HomeVehicles() {
  const router = useLocaleRouter();

  const {useFetchAllVehicleList} = vehiclesQueries();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Vehicle>({
      dataKey: 'vehicles',
      listType: LIST_TYPES.vehicles,
      queryToCall: useFetchAllVehicleList,
    });

  return (
    <div className='flex justify-center mb-10'>
      <Container>
        <p className='text-4xl font-bold text-center mt-10'>
          Find Your Dream Car
        </p>

        <p className='text-lg text-center mt-2'>
          Explore the best deals on used cars. Buy or Sell you used car safely
          and easily with Car Tradez
        </p>

        <div className='flex justify-center mt-8'>
          <FiltersBar
            setFilters={setFilters}
            filters={filters}
            hideSelect={true}
          />
        </div>

        <div className='flex justify-between mt-8'>
          <p className='text-xl md:text-2xl font-bold text-black mt-5 mb-5'>
            Featured Cars
          </p>

          {filteredData.length > 0 && (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => router.push(PUBLIC_ROUTES.vehicles.all)}
            >
              <p className='text-md md:text-md text-black mt-5 mb-5'>
                View All
              </p>
              <ArrowUpRightIcon className='ml-1' />
            </div>
          )}
        </div>

        <VehicleListing
          PaginationComponent={PaginationComponent}
          filteredData={filteredData}
          isLoading={isLoading}
          isPaginationShow={false}
        />
      </Container>
    </div>
  );
}
