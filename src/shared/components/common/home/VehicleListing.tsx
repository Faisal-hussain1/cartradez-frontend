import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import VehicleCard from '@/shared/components/common/home/VehicleCard';
import {VehicleCardProps} from '@/shared/interfaces/vehicles';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import {Vehicle} from '@/shared/interfaces/common';

export default function VehicleListing({
  PaginationComponent,
  filteredData,
  isLoading,
  isPaginationShow = true,
}: any) {
  if (isLoading) return <GlobalLoader height='h-[400px]' />;

  return (
    <>
      {filteredData.length > 0 ? (
        <div className='flex flex-col min-h-96'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {(filteredData as Vehicle[]).map((vehicle: Vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          {isPaginationShow && (
            <div className='w-full flex-end my-5'>{PaginationComponent}</div>
          )}
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <EmptyDataPlaceholder title='vehicle' />
        </div>
      )}
    </>
  );
}
