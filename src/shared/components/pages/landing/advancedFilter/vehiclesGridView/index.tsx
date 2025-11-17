import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import VehicleCard from '@/shared/components/common/vehicleCard';

export default function VehiclesGridView({
  title,
  vehicles,
}: {
  title: string;
  vehicles: any[];
}) {
  return (
    <div className='w-full'>
      <h2 className='text-xl font-semibold text-black mb-3'>{title}</h2>

      <div className='grid grid-cols-12 gap-4'>
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle.id} className='col-span-3'>
              <VehicleCard vehicle={vehicle} />
            </div>
          ))
        ) : (
          <div className='flex-1 flex items-center justify-center w-full'>
            <EmptyDataPlaceholder title='premium vehicle' />
          </div>
        )}
      </div>
    </div>
  );
}
