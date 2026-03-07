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
    <div className="w-full">
      <h2 className="text-xl font-semibold text-black mb-5">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-6 justify-items-center">
        {vehicles?.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center w-full">
            <EmptyDataPlaceholder title="vehicle" />
          </div>
        )}
      </div>
    </div>
  );
}