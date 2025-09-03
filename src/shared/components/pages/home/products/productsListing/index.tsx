'use client';
import Container from '@/shared/components/common/containers';
import {DUMMY_CARS_DATA} from '@/shared/constants/dummy';

import ProductCard from './ProductCard';
import FiltersBar from './FiltersBar';
import useServerSideListFilters from '@/shared/hooks/listFilters/useServerSideListFilters';
import {LIST_TYPES} from '@/shared/constants/general';
import {checkbookQueries} from '@/shared/reactQuery';
import {Contact} from '@/shared/interfaces/checkbook';

export default function ProductListing() {
  const {useGetCheckbookContacts} = checkbookQueries();

  const {PaginationComponent, filteredData, isLoading, filters, setFilters} =
    useServerSideListFilters<Contact>({
      dataKey: 'checkbookContacts',
      listType: LIST_TYPES.sellers,
      queryToCall: useGetCheckbookContacts,
    });

  return (
    <div className='flex justify-center'>
      <Container>
        <div className='mt-8'>
          <p className='text-4xl font-bold text-center'>Find Your Dream Car</p>

          <div className='flex justify-center mt-8'>
            <FiltersBar
              setFilters={setFilters}
              filters={filters}
              hideSelect={true}
            />
          </div>

          <p className='text-xl md:text-2xl font-bold text-black mt-5 mb-5'>
            Explore All Vehicles
          </p>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {DUMMY_CARS_DATA.map((car) => (
            <ProductCard key={car.id} {...car} />
          ))}
        </div>
      </Container>
    </div>
  );
}
