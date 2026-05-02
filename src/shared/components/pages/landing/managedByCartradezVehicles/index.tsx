'use client';

import {useMemo} from 'react';
import Container from '@/shared/components/common/containers';
import VehicleListing from '@/shared/components/common/vehicleListing';
import FiltersBar from '@/shared/components/common/FilterBar';
import {LIST_TYPES} from '@/shared/constants/general';
import {vehiclesQueries} from '@/shared/reactQuery';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import {Vehicle} from '@/shared/interfaces/common';

const normalizeText = (value: any) =>
  String(value || '')
    .toLowerCase()
    .trim();

const getVehicleSearchText = (vehicle: any) => {
  return [
    vehicle?.name,
    vehicle?.title,
    vehicle?.make,
    vehicle?.model,
    vehicle?.variant,
    vehicle?.year,
    vehicle?.price,
    vehicle?.city,
    vehicle?.location,
    vehicle?.fuelType,
    vehicle?.fuel_type,
    vehicle?.transmission,
    vehicle?.color,
    vehicle?.listingType,
    vehicle?.listing_type,
    vehicle?.packageType,
    vehicle?.bodyType,
    vehicle?.body_type,
    vehicle?.engineCapacity,
    vehicle?.engine_capacity,
    vehicle?.mileage,
    vehicle?.condition,
    vehicle?.registeredCity,
    vehicle?.registered_city,
  ]
    .map(normalizeText)
    .join(' ');
};

export default function ManagedByCartradezVehiclesPage() {
  const {useFetchAllCartradezVehicleList} = vehiclesQueries();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Vehicle>({
      dataKey: 'vehicles',
      listType: LIST_TYPES.managedByCartradezVehicles,
      queryToCall: useFetchAllCartradezVehicleList,
    });

  const frontendFilteredVehicles = useMemo(() => {
    const keyword = normalizeText(filters?.searchValue);
    if (!keyword) return filteredData || [];

    return (filteredData || []).filter((vehicle: any) =>
      getVehicleSearchText(vehicle).includes(keyword)
    );
  }, [filteredData, filters?.searchValue]);

  return (
    <div className='flex justify-center'>
      <Container>
        <p className='text-4xl font-bold text-center mt-10'>
          Managed by Cartradez Vehicles
        </p>

        <p className='text-lg text-center mt-2'>
          Browse all vehicles verified and managed by Cartradez.
        </p>

        <div className='flex justify-center mt-8'>
          <FiltersBar
            setFilters={setFilters}
            filters={filters}
            hideSelect={true}
          />
        </div>

        <div className='mt-8'>
          <VehicleListing
            PaginationComponent={PaginationComponent}
            filteredData={frontendFilteredVehicles}
            isLoading={isLoading}
            isPaginationShow={true}
            cardClassName='max-w-[230px]'
            gridClassName='gap-2'
          />
        </div>
      </Container>
    </div>
  );
}
