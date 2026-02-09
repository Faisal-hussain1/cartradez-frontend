'use client';

interface Activity {
  title: string;
  time: string;
}

const activities: Activity[] = [
  {title: 'Listing approved', time: '2023-11-20 10:00 AM'},
  {title: 'User account created', time: '2023-11-20 11:30 AM'},
  {title: 'Support ticket resolved', time: '2023-11-20 01:00 PM'},
  {title: 'Listing updated', time: '2023-11-20 02:45 PM'},
  {title: 'Payment processed', time: '2023-11-20 04:20 PM'},
  {title: 'Listing rejected', time: '2023-11-20 06:00 PM'},
  {title: 'User profile updated', time: '2023-11-20 07:30 PM'},
  {title: 'Support ticket opened', time: '2023-11-20 09:15 PM'},
];

const RecentActivityFeed = () => {
  return (
    <div
      className='
        bg-card
        border
        rounded-lg
        shadow-sm
        p-4
        h-fit
      '
    >
      <h2 className='text-sm font-semibold text-primary mb-4'>
        Recent Activity Feed
      </h2>

      <ul className='relative space-y-4'>
        {/* Vertical timeline */}
        <span
          className='
    absolute
    left-[5px]
    top-0
    bottom-0
    w-px
    bg-blue100/30
  '
        />
        {activities.map((activity, index) => (
          <li key={index} className='flex gap-3'>
            {/* Dot */}
            <span
              className='
                relative z-10 mt-[6px]
                h-2.5 w-2.5
                rounded-full
                bg-blue100
              '
            />

            {/* Content */}
            <div className='leading-tight'>
              <p className='text-xs font-medium text-secondary'>
                {activity.title}
              </p>
              <span className='text-[11px] text-muted-foreground'>
                {activity.time}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityFeed;
