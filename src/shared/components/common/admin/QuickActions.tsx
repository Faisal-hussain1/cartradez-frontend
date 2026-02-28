'use client';

const QuickActions = () => {
  return (
    <div
      className='
        bg-card
        rounded-lg
        border
        shadow-sm
        p-4
        max-w-sm
        h-fit
      '
    >
      <h2 className='text-sm font-semibold text-primary mb-4'>
        Quick Actions & Alerts
      </h2>

      <div className='space-y-2'>
        <button
          className='
            w-full
            bg-primary
            text-primary-foreground
            py-2
            text-xs
            rounded-md
            font-medium
            hover:opacity-90
            transition
          '
        >
          Create Listing
        </button>

        <button
          className='
            w-full
            bg-muted
            text-secondary
            py-2
            text-xs
            rounded-md
            font-medium
            hover:bg-gray10
            transition
          '
        >
          Bulk Upload
        </button>

        <button
          className='
            w-full
            bg-muted
            text-secondary
            py-2
            text-xs
            rounded-md
            font-medium
            hover:bg-gray10
            transition
          '
        >
          Export CSV
        </button>

        <button
          className='
            w-full
            border
            border-red100
            text-red100
            py-2
            text-xs
            rounded-md
            font-medium
            hover:bg-red-50
            transition
          '
        >
          System Alerts (4)
        </button>

        <button
          className='
            w-full
            border
            border-orange-400
            text-orange-500
            py-2
            text-xs
            rounded-md
            font-medium
            hover:bg-orange-50
            transition
          '
        >
          Pending Refunds (75)
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
