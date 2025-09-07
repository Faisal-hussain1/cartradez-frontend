'use client';
import Container from '@/shared/components/common/containers';
import {DUMMY_CARS_DATA} from '@/shared/constants/dummy';
import {ArrowUpRightIcon} from '@/shared/components/icons';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {PUBLIC_ROUTES} from '@/shared/constants/PATHS';
import ProductCard from '@/shared/components/common/home/ProductCard';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import {LIST_TYPES} from '@/shared/constants/general';
import {productsQueries} from '@/shared/reactQuery';
import {Product} from '@/shared/interfaces/common';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import ProductListing from '@/shared/components/common/home/ProductListing';
import CarOptions from './Options';

export default function HomeProducts() {
  const router = useLocaleRouter();

  const {useFetchAllProductList} = productsQueries();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Product>({
      dataKey: 'products',
      listType: LIST_TYPES.products,
      queryToCall: useFetchAllProductList,
    });

  return (
    <div className='flex justify-center'>
      <Container>
        <p className='text-4xl font-bold text-center mt-10'>
          Find Your Dream Car
        </p>

        <p className='text-lg text-center mt-2'>
          Explore the best deals on used cars. Buy or Sell you used car safely
          and easily with Car Tradez
        </p>

        <div className='flex justify-between mt-8'>
          <p className='text-xl md:text-2xl font-bold text-black mt-5 mb-5'>
            Featured Cars
          </p>

          {filteredData.length > 0 && (
            <div
              className='flex items-center cursor-pointer'
              onClick={() => router.push(PUBLIC_ROUTES.products.all)}
            >
              <p className='text-md md:text-md text-black mt-5 mb-5'>
                View All
              </p>
              <ArrowUpRightIcon className='ml-1' />
            </div>
          )}
        </div>

        <ProductListing
          PaginationComponent={PaginationComponent}
          filteredData={filteredData}
          isLoading={isLoading}
        />

        <CarOptions />
      </Container>
    </div>
  );
}
