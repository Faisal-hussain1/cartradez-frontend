import Faq from '@/shared/components/pages/landing/faq';
import { generateMetadata } from '@/shared/utils/metadataUtils';


export default function FaqPage() {
  return <Faq />;
}

export const metadata = async () => await generateMetadata('faq');
