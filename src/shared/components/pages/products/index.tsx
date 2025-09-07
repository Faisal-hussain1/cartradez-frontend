'use client';
import Container from '@/shared/components/common/containers';

import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import {LIST_TYPES} from '@/shared/constants/general';
import {productsQueries} from '@/shared/reactQuery';

import Banner from '@/shared/components/common/banner';
import {Product} from '@/shared/interfaces/common';
import ProductListing from '@/shared/components/common/home/ProductListing';
import FiltersBar from '@/shared/components/common/FilterBar';

export default function Products() {
  const {useFetchAllProductList} = productsQueries();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Product>({
      dataKey: 'products',
      listType: LIST_TYPES.products,
      queryToCall: useFetchAllProductList,
    });

  return (
    <>
      <Banner heading='Cars' />

      <div className='flex justify-center'>
        <Container>
          <div className='mt-8'>
            <p className='text-4xl font-bold text-center'>
              Find Your Dream Car
            </p>

            <div className='flex justify-center mt-8'>
              <FiltersBar
                setFilters={setFilters}
                filters={filters}
                hideSelect={true}
              />
            </div>

            <p className='text-xl md:text-2xl font-bold text-black mt-5 mb-5'>
              All Cars
            </p>
          </div>

          <ProductListing
            PaginationComponent={PaginationComponent}
            filteredData={filteredData}
            isLoading={isLoading}
          />
        </Container>
      </div>
    </>
  );
}
