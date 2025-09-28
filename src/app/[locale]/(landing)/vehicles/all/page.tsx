import Vehicles from '@/shared/components/pages/vehicles';
import {VEHICLES} from '@/shared/constants/reactQueryConstants';
import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function AllVehicles() {
  return (
    <ReactPrefetchQueryProvider
      queriesToFetch={[VEHICLES.fetchAllVehiclesList]}
    >
      <Vehicles />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () => await generateMetadata('vehicles');
