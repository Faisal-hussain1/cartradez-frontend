import {vehicleDetailsPageProps} from '@/shared/interfaces/vehicles';
import {generateMetadata} from '@/shared/utils/metadataUtils';
import VehicleDetails from '@/shared/components/pages/landing/VehicleDetails';

export default async function VehicleDetailsPage({
  params,
}: vehicleDetailsPageProps) {
  const {vehicleId} = await params;

  return <VehicleDetails vehicleId={vehicleId} />;
}

export const metadata = async () => await generateMetadata('vehicleDetails');
