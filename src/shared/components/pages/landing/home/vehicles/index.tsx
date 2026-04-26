'use client';

import VehicleListingWithListingType from '@/shared/components/common/vehicleListingWithListingType';
import { Vehicle } from '@/shared/interfaces/common';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';

export interface HomeVehiclesProps {
  PaginationComponent?: React.ReactNode;
  filteredData: Vehicle[];
  isLoading?: boolean;
  searchValue?: string;
}

export default function HomeVehicles({
  PaginationComponent,
  filteredData,
  isLoading,
  searchValue = '',
}: HomeVehiclesProps) {
  if (isLoading) return <GlobalLoader height='h-[400px]' />;

  return (
    <VehicleListingWithListingType
      PaginationComponent={PaginationComponent}
      filteredData={filteredData}
      searchValue={searchValue}
      isPaginationShow={false}
    />
  );
}