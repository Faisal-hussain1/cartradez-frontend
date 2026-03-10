'use client';

import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {ChevronDown, Calendar} from 'lucide-react';

export default function ManageListingsHeader() {
  const router=useLocaleRouter();
  return (
    <section className='space-y-4'>
      {/* Top row */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-[var(--blue100)]'>
          Manage Listings
        </h1>

        <button onClick={()=>router.push('/selectRole')}
          className='cursor-pointer
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
        </button>
      </div>

      {/* Filters */}
      <div
        className='
          grid grid-cols-1
          md:grid-cols-3
          gap-4
        '
      >
        {/* Listed By */}
        <FilterSelect label='Listed By' placeholder='All' />

        {/* Listing Type */}
        <FilterSelect label='Listing Type' placeholder='All' />

        {/* Created On */}
        <FilterDate />
      </div>
    </section>
  );
}

/* ----------------------- */

function FilterSelect({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className='space-y-1.5'>
      <label className='text-xs font-medium text-muted-foreground'>
        {label}
      </label>

      <div
        className='
          flex items-center justify-between
          px-3 py-2
          bg-card
          border border-border
          rounded-md
          cursor-pointer
          hover:border-[var(--blue100)]
          transition
        '
      >
        <span className='text-sm text-foreground'>{placeholder}</span>
        <ChevronDown size={16} className='text-muted-foreground' />
      </div>
    </div>
  );
}

/* ----------------------- */

function FilterDate() {
  return (
    <div className='space-y-1.5'>
      <label className='text-xs font-medium text-muted-foreground'>
        Created On
      </label>

      <div
        className='
          flex items-center justify-between
          px-3 py-2
          bg-card
          border border-border
          rounded-md
          hover:border-[var(--blue100)]
          transition
        '
      >
        <span className='text-sm text-muted-foreground'>
          Select Date or Date Range
        </span>
        <Calendar size={16} className='text-muted-foreground' />
      </div>
    </div>
  );
}
