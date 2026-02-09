'use client';

import Image from 'next/image';
import {Eye, Trash2} from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'Bugatti Chiron Super Sport 300+',
    image: '/images/Frame 22.png',
    type: 'Premium',
    price: 'ZMW 2,940,000',
    seller: 'Darrell Steward',
    created: 'Feb 08, 2025',
  },
  {
    id: 2,
    title: 'Lamborghini Sian Roadster',
    image: '/images/Frame 22.png',
    type: 'Standard',
    price: 'ZMW 2,940,000',
    seller: 'Brooklyn Simmons',
    created: 'May 14, 2025',
  },
];

export default function ManageListingsTable() {
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
        <span>Seller</span>
        <span>Created</span>
        <span className='text-right'>Actions</span>
      </div>

      {/* Rows */}
      {listings.map((item, index) => (
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
              src={item.image}
              alt={item.title}
              width={36}
              height={36}
              className='rounded-md object-cover'
            />
            <span className='font-medium truncate'>{item.title}</span>
          </div>

          {/* Type */}
          <span>{item.type}</span>

          {/* Price */}
          <span>{item.price}</span>

          {/* Seller */}
          <span>{item.seller}</span>

          {/* Created */}
          <span className='text-muted-foreground'>{item.created}</span>

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
