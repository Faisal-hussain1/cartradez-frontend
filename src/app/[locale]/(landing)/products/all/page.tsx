import Products from '@/shared/components/pages/products';
import {PRODUCTS} from '@/shared/constants/reactQueryConstants';
import ReactPrefetchQueryProvider from '@/shared/providers/ReactPrefetchQueryProvider';
import {generateMetadata} from '@/shared/utils/metadataUtils';

export default function AllProducts() {
  return (
    <ReactPrefetchQueryProvider
      queriesToFetch={[PRODUCTS.fetchAllProductsList]}
    >
      <Products />
    </ReactPrefetchQueryProvider>
  );
}

export const metadata = async () => await generateMetadata('products');
