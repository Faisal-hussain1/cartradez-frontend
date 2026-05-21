'use client';

import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {usePathname, useSearchParams} from 'next/navigation';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

export default function ManageListingsHeader({
  title = 'Manage Listings',
}: {
  title?: string;
}) {
  const user = useSelector(getCurrentUser);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isAdminDealer =
    user?.systemRole === 'admin' || user?.systemRole === 'dealer';
  const router = useLocaleRouter();

  const listingType = searchParams.get('listingType') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const listingTypeOptions = useMemo(
    () => [
      {label: 'All', value: ''},
      {label: 'Premium', value: 'premium'},
      {label: 'Quick Sell', value: 'quick sell'},
      {label: 'Standard', value: 'standard'},
    ],
    []
  );

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.set('page', '1');
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <section className='space-y-4'>
      {/* Top row */}
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-2xl font-semibold text-[var(--blue100)]'>{title}</h1>

        {isAdminDealer ? <button onClick={() => router.push('/vehicles/add')}
          className='cursor-pointer
            w-full sm:w-auto
            px-4 py-2
            text-sm font-medium
            rounded-md
            text-white
            bg-[var(--sidebar-dark-blue)]
            hover:opacity-90
            transition
          '
        >
          Create a New Listing
        </button> : <button onClick={() => router.push('/selectRole')}
          className='cursor-pointer
            w-full sm:w-auto
            px-4 py-2
            text-sm font-medium
            rounded-md
            text-white
            bg-[var(--sidebar-dark-blue)]
            hover:opacity-90
            transition
          '
        >
          Create a New Listing
        </button>}
      </div>

      {/* Filters */}
      <div
        className='
          grid grid-cols-1
          md:grid-cols-4
          gap-4 mb-3
        '
      >
        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Listing Type
          </label>
          <select
            value={listingType}
            onChange={(e) => updateQueryParams({listingType: e.target.value})}
            className='w-full px-3 py-2 bg-card border border-border rounded-md text-sm'
          >
            {listingTypeOptions.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Created From
          </label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => updateQueryParams({startDate: e.target.value})}
            className='w-full px-3 py-2 bg-card border border-border rounded-md text-sm'
          />
        </div>

        <div className='space-y-1.5'>
          <label className='text-xs font-medium text-muted-foreground'>
            Created To
          </label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => updateQueryParams({endDate: e.target.value})}
            className='w-full px-3 py-2 bg-card border border-border rounded-md text-sm'
          />
        </div>

        <div className='flex items-end'>
          <button
            onClick={() =>
              updateQueryParams({
                listingType: '',
                startDate: '',
                endDate: '',
              })
            }
            className='w-full px-3 py-2 rounded-md border border-border text-sm hover:bg-muted'
          >
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
}
