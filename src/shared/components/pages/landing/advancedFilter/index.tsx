'use client';

import HomeVehicles from './vehicles';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import {LIST_TYPES} from '@/shared/constants/general';
import {vehiclesQueries} from '@/shared/reactQuery';
import {Vehicle} from '@/shared/interfaces/common';
import FiltersBar from '@/shared/components/common/FilterBar';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {FilterSearchIcon} from '@/shared/components/icons';
import Container from '@/shared/components/common/containers';
import {groupVehiclesByType} from '@/shared/utils/vehicleUtils';
import {CommonCarousel} from '@/shared/components/common/cardSlider';
import VehicleCard from '@/shared/components/common/vehicleCard';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import {useResponsiveSlides} from '@/shared/hooks/useResponsiveSlide';
import {useState} from 'react';
import VehiclesViewBar from './vehiclesViewBar';
import VehiclesGridView from './vehiclesGridView';
import VehiclesListView from './vehiclesListView';

export default function AdvancedFilter() {
  const {useFetchAllVehicleList} = vehiclesQueries();
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const slidesToShowPremiumVehicles = useResponsiveSlides({baseSlides: 6});
  const slidesToShow = useResponsiveSlides();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Vehicle>({
      dataKey: 'vehicles',
      listType: LIST_TYPES.homePageVehicles,
      queryToCall: useFetchAllVehicleList,
    });

  // const {data, isPending, error} = useFetchAllVehicleList();

  // console.log('Home filteredData:', filteredData);

  // console.log('data', data);

  const {
    premium: premiumVehicles,
    quickSell: quickSellVehicles,
    standard: standardVehicles,
  } = groupVehiclesByType({
    vehicles: filteredData || [],
  });

  return (
    <div>
      <div className="w-full h-[300px] bg-[url('/images/home/advanced-filter-banner.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className='w-[85%] max-w-6xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 p-6'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12'>
              <p className='text-2xl text-primary font-semibold'>
                Find the Car You’ll Love
              </p>
            </div>
          </div>

          <div className='grid grid-cols-12  gap-1 md:gap-3 mt-5'>
            <div className='col-span-12 md:col-span-9'>
              <FiltersBar
                setFilters={setFilters}
                filters={filters}
                hideSelect={true}
                placeholder='Search by Make or Model'
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

      <div className='grid grid-cols-12'>
        <div className='col-span-12'>
          <div className="w-full min-h-[300px] bg-[url('/images/home/advanced-filer-premium-listing-banner.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
            <Container>
              <div className='w-full py-5'>
                {premiumVehicles.length > 0 ? (
                  <div className=''>
                    <CommonCarousel
                      title='Premium Listings'
                      titleColor='text-white'
                      items={premiumVehicles}
                      slidesToShow={slidesToShowPremiumVehicles}
                      renderItem={(vehicle) => (
                        <VehicleCard vehicle={vehicle} />
                      )}
                      isShowArrows={false}
                    />
                  </div>
                ) : (
                  <div className='flex-1 flex items-center justify-center w-full'>
                    <EmptyDataPlaceholder title='premium vehicle' />
                  </div>
                )}
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className='flex justify-center mb-10'>
        <Container>
          <div className='grid grid-cols-12 gap-6 md:gap-6 mt-8'>
            <div className='col-span-12 md:col-span-3 bg-[#E5E7EB] p-5 rounded-2xl flex flex-col gap-4'>
              <h1>Advanced Filters</h1>
            </div>
            <div className='col-span-12 md:col-span-9 w-full'>
              <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12 w-full'>
                  <VehiclesViewBar view={viewType} setView={setViewType} />
                </div>
              </div>
              <div className='grid grid-cols-12 gap-4 mt-5'>
                <div className='col-span-12 w-full flex justify-between'>
                  {viewType === 'grid' ? (
                    <VehiclesGridView
                      title='Standard Listings'
                      vehicles={standardVehicles}
                    />
                  ) : (
                    <VehiclesListView
                      title='Standard Listings'
                      vehicles={standardVehicles}
                    />
                  )}
                </div>

                <div className='col-span-12 w-full flex justify-between mt-3'>
                  {viewType === 'grid' ? (
                    <VehiclesGridView
                      title='Quick Sell Listings'
                      vehicles={quickSellVehicles}
                    />
                  ) : (
                    <VehiclesListView
                      title='Quick Sell Listings'
                      vehicles={quickSellVehicles}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
