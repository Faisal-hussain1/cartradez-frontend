'use client';

import Image from 'next/image';
import {RotateCcw, Search, Trash2} from 'lucide-react';
import {formatDate} from 'date-fns';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useState} from 'react';
import GlobalLoader from '../../loaders/GlobalLoader';
import Pagination from '@/shared/components/common/pagination';
import {useFetchDeletedVehicles} from '@/shared/reactQuery/vehicles/queries';
import {useMutations} from '@/shared/reactQuery/vehicles/mutations';
import {PAGINATION_TYPES} from '@/shared/constants/general';

interface DeletedVehicle {
  _id: string;
  make: string;
  model: string;
  year?: number;
  price: number;
  currency: string;
  listingType?: string | null;
  coverImage?: {key: string; url: string};
  deletedAt?: string;
  deletedBy?: string;
}

function RestoreButton({
  vehicleId,
  onRestored,
}: {
  vehicleId: string;
  onRestored: () => void | Promise<unknown>;
}) {
  const {useRestoreVehicleMutation} = useMutations();

  const {mutate, isPending} = useRestoreVehicleMutation({
    vehicleId,
    callBackFuncs: {onSuccessAlways: onRestored},
  });

  return (
    <button
      type='button'
      onClick={() => mutate()}
      disabled={isPending}
      title='Restore vehicle'
      className='inline-flex h-8 items-center gap-1.5 rounded-md border border-green-600 px-2 text-xs font-medium text-green-700 hover:bg-green-50 disabled:opacity-50'
    >
      <RotateCcw size={14} className={isPending ? 'animate-spin' : ''} />
      {isPending ? 'Restoring' : 'Restore'}
    </button>
  );
}

export default function DeletedVehiclesTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Math.max(1, Number(searchParams.get('page') || '1'));
  const search = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(search);
  const pageLimit = 12;

  const {data, isLoading, isError, refetch} = useFetchDeletedVehicles({
    params: {pageNo: page, pageLimit, search},
  });
  const vehicles: DeletedVehicle[] = data?.data?.vehicles ?? data?.vehicles ?? [];
  const pagination = data?.data?.pagination ?? data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const count = pagination?.count ?? 0;

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.replace(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    updateParams({search: searchValue.trim(), page: '1'});
  };

  if (isLoading) return <GlobalLoader height='h-[240px]' />;

  return (
    <div className='w-full space-y-4'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-[var(--blue100)]'>Deleted Vehicles</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            {count.toLocaleString()} deleted vehicle{count === 1 ? '' : 's'}
          </p>
        </div>
        <form onSubmit={submitSearch} className='flex w-full gap-2 sm:max-w-sm'>
          <div className='relative flex-1'>
            <Search size={15} className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder='Search make, model, or type'
              className='h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm'
            />
          </div>
          <button className='h-10 rounded-md bg-[var(--sidebar-dark-blue)] px-4 text-sm font-medium text-white'>
            Search
          </button>
        </form>
      </div>

      <section className='overflow-hidden rounded-xl border border-border bg-card'>
        {isError ? (
          <div className='flex min-h-56 flex-col items-center justify-center gap-3 p-8 text-center'>
            <Trash2 size={28} className='text-red-600' />
            <p className='font-medium'>Could not load deleted vehicles</p>
            <button
              type='button'
              onClick={() => refetch()}
              className='h-9 rounded-md border border-border px-3 text-sm font-medium hover:bg-muted'
            >
              Try again
            </button>
          </div>
        ) : vehicles.length === 0 ? (
          <div className='flex min-h-56 flex-col items-center justify-center gap-3 p-8 text-center'>
            <Trash2 size={28} className='text-muted-foreground' />
            <p className='font-medium'>No deleted vehicles found</p>
            <p className='text-sm text-muted-foreground'>Soft-deleted listings will appear here.</p>
          </div>
        ) : (
          <div className='divide-y divide-border'>
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center'>
                {vehicle.coverImage?.url ? (
                  <Image
                    src={vehicle.coverImage.url}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={64}
                    height={48}
                    className='h-12 w-16 rounded-md object-cover'
                  />
                ) : (
                  <div className='h-12 w-16 rounded-md bg-muted' />
                )}
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium'>
                    {vehicle.make} {vehicle.model} {vehicle.year ? `(${vehicle.year})` : ''}
                  </p>
                  <p className='mt-1 text-xs capitalize text-muted-foreground'>
                    {vehicle.listingType || 'No listing type'} · Deleted by {vehicle.deletedBy || 'unknown'}
                  </p>
                </div>
                <div className='text-sm sm:text-right'>
                  <p className='font-medium'>
                    {vehicle.currency?.toUpperCase() === 'USD' ? '$' : 'ZMW'} {vehicle.price?.toLocaleString()}
                  </p>
                  <p className='mt-1 text-xs text-muted-foreground'>
                    {vehicle.deletedAt ? formatDate(new Date(vehicle.deletedAt), 'LLL dd, yyyy') : 'Unknown date'}
                  </p>
                </div>
                <RestoreButton vehicleId={vehicle._id} onRestored={refetch} />
              </div>
            ))}
          </div>
        )}
        {vehicles.length > 0 && (
          <div className='flex justify-end border-t border-border px-4'>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              paginationType={PAGINATION_TYPES.pageBased.value}
              handlePreviousPage={() => updateParams({page: String(Math.max(1, page - 1))})}
              handleNextPage={() => updateParams({page: String(Math.min(totalPages, page + 1))})}
            />
          </div>
        )}
      </section>
    </div>
  );
}
