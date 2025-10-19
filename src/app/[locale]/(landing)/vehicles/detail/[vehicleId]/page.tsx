import {vehicleDetailsPageProps} from '@/shared/interfaces/vehicles';
import {generateMetadata} from '@/shared/utils/metadataUtils';
import VehicleDetails from '@/shared/components/pages/landing/VehicleDetails';

export const metadata = async () => {
  return await generateMetadata('vehicleDetails');
};

export default async function VehicleDetailsPage({
  params,
}: vehicleDetailsPageProps) {
  const {vehicleId} = params;

  return <VehicleDetails vehicleId={vehicleId} />;
}
