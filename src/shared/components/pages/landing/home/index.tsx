'use client';

import { useMemo } from 'react';
import HomeVehicles from './vehicles';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import { LIST_TYPES } from '@/shared/constants/general';
import { vehiclesQueries } from '@/shared/reactQuery';
import { CartradezVehicle, Vehicle } from '@/shared/interfaces/common';
import FiltersBar from '@/shared/components/common/FilterBar';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import { FilterSearchIcon } from '@/shared/components/icons';
import Container from '@/shared/components/common/containers';
import ManagedByCartradezVehicles from './ManagedByCartradezVehicles';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/shared/redux/slices/users';

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

export default function Home() {
  const user=useSelector(getCurrentUser);
  const { useFetchAllVehicleList, useFetchAllCartradezVehicleList } =
    vehiclesQueries();

  const { PaginationComponent, filteredData, isLoading, filters, setFilters } =
    useServerSideListFilters<Vehicle>({
      dataKey: 'vehicles',
      listType: LIST_TYPES.homePageVehicles,
      queryToCall: useFetchAllVehicleList,
    });

  const {
    filteredData: managedByCartradezVehicles,
    isLoading: getCartradezVehiclesLoading,
  } = useServerSideListFilters<CartradezVehicle>({
    dataKey: 'vehicles',
    listType: LIST_TYPES.managedByCartradezVehicles,
    queryToCall: useFetchAllCartradezVehicleList,
  });

  const frontendFilteredVehicles = useMemo(() => {
    const keyword = normalizeText(filters?.searchValue);

    if (!keyword) return filteredData || [];

    return (filteredData || []).filter((vehicle: any) => {
      const searchableText = getVehicleSearchText(vehicle);

      return searchableText.includes(keyword);
    });
  }, [filteredData, filters?.searchValue]);



  return (
    <div>
      <div className="w-full h-[300px] bg-[url('/images/home/banner.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className='w-[85%] max-w-6xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-6'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <p className='text-2xl text-primary font-semibold'>
                Find the Car You’ll Love
              </p>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-1 md:gap-3 mt-5'>
            <div className='col-span-12 md:col-span-9'>
              <FiltersBar
                setFilters={setFilters}
                filters={filters}
                hideSelect={true}
                placeholder='Search by Make, Model, Price, Listing Type'
              />
            </div>

            <div className='col-span-12 md:col-span-3 flex justify-center md:justify-end'>
              <PrimaryButton
                buttonText={
                  <>
                    <FilterSearchIcon className='h-6 w-6' />
                    {'Advanced Filters'}
                  </>
                }
                styles='h-[48px] bg-white text-primary hover:text-white'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-center mb-10'>
        <Container>
          <div className='grid grid-cols-12 gap-6 md:gap-6 mt-8'>
            <div className='col-span-12 md:col-span-9 w-full flex justify-between'>
             <HomeVehicles
  PaginationComponent={PaginationComponent}
  filteredData={frontendFilteredVehicles}
  isLoading={isLoading}
  searchValue={filters?.searchValue}
/>
            </div>

            <div className='col-span-12 md:col-span-3 bg-[#E5E7EB] p-5 rounded-2xl flex flex-col gap-4'>
              <ManagedByCartradezVehicles
                vehicles={managedByCartradezVehicles}
                isLoading={getCartradezVehiclesLoading}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}