'use client';

import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

export default function PendingModerationTable() {
  const router = useLocaleRouter();

  return (
    <section className='mt-4'>
      <div className='flex items-center justify-between mb-2'>
        <h2 className='text-sm font-semibold text-blue100'>
          Pending Moderation Queue
        </h2>

        <span className='text-xs text-muted-foreground'>Coming soon</span>
      </div>

      <div className='bg-card border border-border rounded-lg px-6 py-10 text-center'>
        <p className='text-sm text-muted-foreground'>
          No listings are waiting for moderation right now.
        </p>
        <p className='text-xs text-muted-foreground mt-1'>
          You can manage all active listings from the listings page.
        </p>
        <button
          onClick={() => router.push('/listings')}
          className='mt-4 px-4 py-2 text-sm font-medium rounded-md text-white bg-[var(--sidebar-dark-blue)] hover:opacity-90 transition'
        >
          Go to Listings
        </button>
      </div>
    </section>
  );
}
