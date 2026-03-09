'use client';

import Image from 'next/image';
import {Eye, Trash2} from 'lucide-react';
import { useQueries } from '@/shared/reactQuery/vehicles/queries';
import GlobalLoader from '../../loaders/GlobalLoader';
import { useMemo } from 'react';
import { formatDate } from 'date-fns';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/shared/redux/slices/users';

// 

export default function ManageListingsTable() {
  const {useFetchAllVehicleList}=useQueries();
  const user=useSelector(getCurrentUser);
  const {data,isLoading}=useFetchAllVehicleList();
  const vehicles=data?.vehicles;
  const listings = useMemo(() => {
    return vehicles?.filter((v:any) => v.listingType !==null && v.creatorId===user?._id );
  }, [vehicles]);
  if (isLoading) return <GlobalLoader height='h-[200px]' />;
  return (
    <section className='bg-card border border-border rounded-xl overflow-hidden'>
      {/* Header */}
      <div
        className='
          grid grid-cols-[40px_1.5fr_120px_140px_160px_120px_120px]
          px-4 py-3
          text-xs font-semibold
          text-muted-foreground
          bg-muted
        '
      >
        <span>#</span>
        <span>Listing</span>
        <span>Listing Type</span>
        <span>Price</span>
        <span>Created</span>
        <span className='text-right'>Actions</span>
      </div>

      {/* Rows */}
      {listings.map((item:any, index:number) => (
        <div
          key={item.id}
          className='
            grid grid-cols-[40px_1.5fr_120px_140px_160px_120px_120px]
            px-4 py-3
            items-center
            text-sm
            border-t border-border
            hover:bg-muted/50
            transition
          '
        >
          {/* Index */}
          <span className='text-muted-foreground'>{index + 1}</span>

          {/* Listing */}
          <div className='flex items-center gap-3 min-w-0'>
            <Image
              src={item?.coverImage.url}
              alt={item?.coverImage.key}
              width={36}
              height={36}
              className='rounded-md object-cover'
            />
            <span className='font-medium truncate'>{item.title}</span>
          </div>

          {/* Type */}
          <span>{item?.listingType}</span>

          {/* Price */}
          <span>{item?.price} {item?.currency==='usd'?'$':'ZMW'}</span>

          {/* Created */}
         <span className='text-muted-foreground'>
  {item?.createdAt
    ? formatDate(item.createdAt, 'LLL dd, yyyy')
    : 'N/A'}
</span>

          {/* Actions */}
          <div className='flex justify-end gap-2'>
            <ActionButton type='view' icon={<Eye size={14} />} />
            <ActionButton type='delete' icon={<Trash2 size={14} />} />
          </div>
        </div>
      ))}
    </section>
  );
}

/* -------------------- */

function ActionButton({
  icon,
  type,
}: {
  icon: React.ReactNode;
  type: 'view' | 'delete';
}) {
  const styles = {
    view: `
      text-[color:var(--blue100)]
      border-[color:var(--blue100)]
      hover:bg-[color:var(--blue10)]
    `,
    delete: `
      text-[color:var(--red100)]
      border-[color:var(--red100)]
      hover:bg-[color:var(--error-light)]
    `,
  };

  return (
    <button
      className={`
        h-8 w-8
        flex-center
        rounded-md
        border
        transition-colors
        ${styles[type]}
      `}
    >
      {icon}
    </button>
  );
}
