import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {VehicleCardProps} from '@/shared/interfaces/vehicles';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import {Vehicle} from '@/shared/interfaces/common';
import VehicleCard from '../vehicleCard';

export default function VehicleListing({
  PaginationComponent,
  filteredData,
  isLoading,
  isPaginationShow = true,
}: any) {
  if (isLoading) return <GlobalLoader height='h-[400px]' />;

  console.log(filteredData)

  return (
    <div className='w-full'>
      {filteredData.length > 0 ? (
        <div className='flex flex-col w-full min-h-96'>
          <div className='grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {(filteredData as Vehicle[]).map((vehicle: Vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>

          {isPaginationShow && (
            <div className='w-full flex justify-end my-5'>
              {PaginationComponent}
            </div>
          )}
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center w-full'>
          <EmptyDataPlaceholder title='vehicle' />
        </div>
      )}
    </div>
  );
}
