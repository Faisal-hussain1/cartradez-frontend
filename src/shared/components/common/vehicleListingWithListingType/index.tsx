import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import {Vehicle} from '@/shared/interfaces/common';
import {CommonCarousel} from '../cardSlider';
import {useResponsiveSlides} from '@/shared/hooks/useResponsiveSlide';
import VehicleCard from '../vehicleCard';
import { useQueries } from '@/shared/reactQuery/vehicles/queries';
import { useMemo } from 'react';


export default function VehicleListingWithListingType({
  PaginationComponent,
  filteredData,
  isPaginationShow = true,
}: any) {
  const slidesToShow = useResponsiveSlides();
  const {useFetchAllVehicleList}=useQueries();
  const { data, isLoading, error } = useFetchAllVehicleList();
  console.log(data?.vehicles)

 const vehicles = data?.vehicles || [];

const premiumVehicles = useMemo(() => {
  return vehicles.filter((v: Vehicle) => v.listingType === "premium");
}, [vehicles]);

const quickSellVehicles = useMemo(() => {
  return vehicles.filter((v: Vehicle) => v.listingType === "quick sell");
}, [vehicles]);

const standardVehicles = useMemo(() => {
  return vehicles.filter((v: Vehicle) => v.listingType === "standard");
}, [vehicles]);

if (isLoading) return <GlobalLoader height='h-[400px]' />;

  return (
    <div className='w-full'>
      <div>
        {premiumVehicles.length > 0 ? (
          <div className=''>
            <CommonCarousel
              title='Premium Listings'
              items={premiumVehicles}
              slidesToShow={slidesToShow}
              renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
            />

            {isPaginationShow && (
              <div className='w-full flex justify-end my-5'>
                {PaginationComponent}
              </div>
            )}
          </div>
        ) : (
          <div className='flex-1 flex items-center justify-center w-full'>
            <EmptyDataPlaceholder title='premium vehicle' />
          </div>
        )}
      </div>

      <div className='mt-10'>
        {quickSellVehicles.length > 0 ? (
          <div className=''>
            <CommonCarousel
              title='Quick Sell Listings'
              items={quickSellVehicles}
              slidesToShow={slidesToShow}
              renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
            />

            {isPaginationShow && (
              <div className='w-full flex justify-end my-5'>
                {PaginationComponent}
              </div>
            )}
          </div>
        ) : (
          <div className='flex-1 flex items-center justify-center w-full'>
            <EmptyDataPlaceholder title='quick sell vehicle' />
          </div>
        )}
      </div>

      <div className='mt-10'>
        {standardVehicles.length > 0 ? (
          <div className=''>
            <CommonCarousel
              title='Standard Listings'
              items={standardVehicles}
              slidesToShow={slidesToShow}
              renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
            />

            {isPaginationShow && (
              <div className='w-full flex justify-end my-5'>
                {PaginationComponent}
              </div>
            )}
          </div>
        ) : (
          <div className='flex-1 flex items-center justify-center w-full'>
            <EmptyDataPlaceholder title='standard vehicle' />
          </div>
        )}
      </div>
    </div>
  );
}
