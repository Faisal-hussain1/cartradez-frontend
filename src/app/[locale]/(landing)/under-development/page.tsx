import UnderDevelopment from '@/shared/components/pages/underDevelopment';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function UnderDevelopmentPage() {
  return <UnderDevelopment />;
}

export const metadata = async () => await generateMetadata('underDevelopment');
