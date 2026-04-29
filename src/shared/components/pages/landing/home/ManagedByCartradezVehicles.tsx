'use client';

import Image from 'next/image';
import {stringToTitleCase, truncateChars} from '@/shared/utils/general';
import GlobalLoader from '@/shared/components/common/loaders/GlobalLoader';
import {CartradezVehicle, Vehicle} from '@/shared/interfaces/common';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import { useMemo } from 'react';
import { useQueries } from '@/shared/reactQuery/vehicles/queries';

export default function ManagedByCartradezVehicles({vehicles}: any) {

  const {useFetchAllVehicleList}=useQueries();
  const {data,isLoading}=useFetchAllVehicleList();

  const v=data?.vehicles;

  const managedByCarTradez = useMemo(() => {
  return v?.filter((v: Vehicle) => v.isManagedByCartradez==true);
}, [v]);
  if (isLoading) return <GlobalLoader height='h-[400px]' />;

  return (
    <>
      <p className='text-primary text-2xl font-bold mb-2 text-center'>
        Managed by Cartradez
      </p>

      {managedByCarTradez?.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {vehicles?.map((vehicle: CartradezVehicle) => (
            <div
              key={vehicle._id}
              className='relative flex items-center bg-white shadow-md rounded-xl overflow-hidden w-full hover:shadow-lg transition-all'
            >
              <div className='relative w-[130px] h-[105px] flex-shrink-0 rounded-lg overflow-hidden'>
                <Image
                  src={vehicle.coverImage?.url}
                  alt={vehicle._id}
                  fill
                  className='object-cover'
                />

                <div className='absolute top-2 left-2 w-[28px] h-[28px]'>
                  <Image
                    src='/images/small-logo.png'
                    alt='Cartradez Logo'
                    width={28}
                    height={28}
                    className='object-contain'
                  />
                </div>
              </div>

              <div className='flex flex-col justify-center px-3 py-2'>
                <h2 className='text-[14px] font-bold text-black'>
                  {truncateChars({
                    text: `${stringToTitleCase({str: vehicle.make})} ${stringToTitleCase({str: vehicle.model})}`,
                    limit: 20,
                  })}
                </h2>
                <p className='text-primary font-bold text-[18px] mt-1'>
                  {`${vehicle.currency.toLocaleUpperCase()} ${vehicle.price.toLocaleString()}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center w-full'>
          <EmptyDataPlaceholder title='vehicle' />
        </div>
      )}
    </>
  );
}
