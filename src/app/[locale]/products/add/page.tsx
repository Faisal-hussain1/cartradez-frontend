import AddProductForm from '@/shared/components/pages/home/products/add';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function page() {
  return <AddProductForm />;
}

// export const metadata = async () => await generateMetadata({pageName: 'home'});
