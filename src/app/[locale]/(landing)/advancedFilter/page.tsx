import AdvancedFilter from '@/shared/components/pages/landing/advancedFilter';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function AdvancedFilterPage() {
  return <AdvancedFilter />;
}

export const metadata = async () => await generateMetadata('advancedFilter');
