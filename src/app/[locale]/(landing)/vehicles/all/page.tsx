import type {Metadata} from 'next';

import Vehicles from '@/shared/components/pages/landing/viewAllVehicles';
import {VEHICLES} from '@/shared/constants/reactQueryConstants';
import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {
  generateMetadata as buildMetadata,
} from '@/shared/utils/metadataUtils';

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata('vehicles');
}

export default function AllVehicles() {
  return (
    <ReactPrefetchQueryProvider
      queriesToFetch={[VEHICLES.fetchAllVehiclesList]}
    >
      <Vehicles />
    </ReactPrefetchQueryProvider>
  );
}