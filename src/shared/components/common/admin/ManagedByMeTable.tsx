'use client';

import {Eye, Pencil, Trash2} from 'lucide-react';
import ActionButton from '../actionbutton/ActionButton';

const listings = [
  {
    id: 1,
    title: 'Bugatti Chiron Super Sport 300+',
    image: '/cars/bugatti.jpg',
    status: 'Active',
    views: 481,
    created: 'Feb 08, 2025',
  },
  {
    id: 2,
    title: 'Lamborghini Sian Roadster',
    image: '/cars/lamborghini.jpg',
    status: 'Active',
    views: 841,
    created: 'May 14, 2025',
  },
  {
    id: 3,
    title: 'SSC Tuatara',
    image: '/images/Frame 22.png',
    status: 'Draft',
    views: 529,
    created: 'Jul 01, 2025',
  },
];

export default function ManagedByMeTable() {
  return (
    <section className='bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between px-4 sm:px-5 py-4 border-b border-[var(--border)]'>
        <h2 className='text-base sm:text-lg font-semibold text-[var(--foreground)]'>
          Managed by Me
        </h2>
        <button className='text-sm font-medium text-[var(--primary)] hover:underline'>
          View All
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-[var(--muted)] text-[var(--muted-foreground)]'>
            <tr>
              <th className='px-5 py-3 text-left'>Listing</th>
              <th className='px-5 py-3 text-left'>Status</th>
              <th className='px-5 py-3 text-left'>Views</th>
              <th className='px-5 py-3 text-left'>Created</th>
              <th className='px-5 py-3 text-right'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((item) => (
              <tr
                key={item.id}
                className='border-t border-[var(--border)] hover:bg-[var(--accent)] transition'
              >
                <td className='px-5 py-4'>
                  <div className='flex items-center gap-3'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-10 h-10 rounded-md object-cover border border-[var(--border)]'
                    />
                    <span className='font-medium text-[var(--foreground)]'>
                      {item.title}
                    </span>
                  </div>
                </td>

                <td className='px-5 py-4'>
                  <StatusBadge status={item.status} />
                </td>

                <td className='px-5 py-4'>{item.views}</td>

                <td className='px-5 py-4 text-[var(--muted-foreground)]'>
                  {item.created}
                </td>

                <td className='px-5 py-4'>
                  <div className='flex justify-end gap-2'>
                    <ActionButton type='view' icon={<Eye size={16} />} />
                    <ActionButton type='edit' icon={<Pencil size={16} />} />
                    <ActionButton type='delete' icon={<Trash2 size={16} />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className='md:hidden divide-y divide-[var(--border)]'>
        {listings.map((item) => (
          <div key={item.id} className='p-4 space-y-3'>
            <div className='flex items-center gap-3'>
              <img
                src={item.image}
                alt={item.title}
                className='w-12 h-12 rounded-md object-cover border border-[var(--border)]'
              />
              <div className='flex-1'>
                <p className='font-medium text-[var(--foreground)] text-sm'>
                  {item.title}
                </p>
                <p className='text-xs text-[var(--muted-foreground)]'>
                  Created: {item.created}
                </p>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <StatusBadge status={item.status} />
              <span className='text-sm'>
                <strong>{item.views}</strong> views
              </span>
            </div>

            <div className='flex justify-end gap-2'>
              <ActionButton type='view' icon={<Eye size={16} />} />
              <ActionButton type='edit' icon={<Pencil size={16} />} />
              <ActionButton type='delete' icon={<Trash2 size={16} />} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= STATUS BADGE ================= */

function StatusBadge({status}: {status: string}) {
  const styles: Record<string, string> = {
    Active: 'bg-[var(--success-light)] text-[var(--success)]',
    Draft: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    Expiring: 'bg-[var(--warning-light)] text-[var(--warning)]',
  };

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
