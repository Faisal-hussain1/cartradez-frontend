import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import ProductCard from '@/shared/components/common/home/ProductCard';
import {Product} from '@/shared/interfaces/common';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';

export default function Products({
  PaginationComponent,
  filteredData,
  isLoading,
}: any) {
  if (isLoading) return <GlobalLoader height='h-[400px]' />;

  return (
    <>
      {filteredData.length > 0 ? (
        <div className='flex flex-col min-h-96'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {(filteredData as Product[]).map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className='w-full flex-end my-5'>{PaginationComponent}</div>
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center'>
          <EmptyDataPlaceholder title='product' />
        </div>
      )}
    </>
  );
}
