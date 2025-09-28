import Home from '@/shared/components/pages/landing/home';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function page() {
  return <Home />;
}

export const metadata = async () => await generateMetadata('home');
