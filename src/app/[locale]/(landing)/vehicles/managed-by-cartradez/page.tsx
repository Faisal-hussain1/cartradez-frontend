import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {VEHICLES} from '@/shared/constants/reactQueryConstants';
import ManagedByCartradezVehiclesPage from '@/shared/components/pages/landing/managedByCartradezVehicles';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function ManagedByCartradezVehicles() {
  return (
    <ReactPrefetchQueryProvider
      queriesToFetch={[VEHICLES.fetchAllCartradezVehiclesList]}
    >
      <ManagedByCartradezVehiclesPage />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () => await generateMetadata('vehicles');

