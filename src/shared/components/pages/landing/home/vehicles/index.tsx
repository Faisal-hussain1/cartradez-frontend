'use client';

import VehicleListing from '@/shared/components/common/vehicleListing';
import {Vehicle} from '@/shared/interfaces/common';

export interface HomeVehiclesProps {
  PaginationComponent?: React.ReactNode;
  filteredData: Vehicle[];
  isLoading?: boolean;
}

export default function HomeVehicles({
  PaginationComponent,
  filteredData,
  isLoading,
}: HomeVehiclesProps) {
  return (
    <VehicleListing
      PaginationComponent={PaginationComponent}
      filteredData={filteredData}
      isLoading={isLoading}
      isPaginationShow={false}
    />
  );
}
