import AddVehicleForm from '@/shared/components/pages/landing/addVehicle';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function page() {
  return <AddVehicleForm />;
}

export const metadata = async () => await generateMetadata('addVehicles');
