import Guidelines from '@/shared/components/pages/landing/guidelines';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function GuidelinesPage() {
  return <Guidelines />;
}

export const metadata = async () => await generateMetadata('vehicleGuidelines');
