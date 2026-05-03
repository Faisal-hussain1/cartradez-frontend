'use client';

import {ArrowUpRight} from 'lucide-react';

interface StatItem {
  title: string;
  value: number | string;
}

const stats: StatItem[] = [
  {title: 'Active Listings', value: '5,617'},
  {title: 'Pending Listings', value: '453'},
  {title: 'Managed Listings', value: '0'},
  // {title: 'New Users (7d)', value: '352'},
  // {title: 'Support Tickets', value: '967'},
];

export default function DashboardStatsCards() {
  return (
    <section className='w-full'>
      <div
        className='
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
          gap-3
          items-stretch
        '
      >
        {stats.map((item, index) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            delay={index * 60}
          />
        ))}
      </div>
    </section>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  delay: number;
}

const StatCard = ({title, value, delay}: StatCardProps) => {
  return (
    <div
      style={{animationDelay: `${delay}ms`}}
      className='
        bg-card border border-border rounded-lg
        px-4 py-3
        shadow-sm hover:shadow transition
        min-h-[92px]
        flex flex-col justify-between
        animate-in fade-in slide-in-from-bottom-2
      '
    >
      <span className='text-xs font-medium text-primary flex items-center gap-1'>
        {title}
        <ArrowUpRight size={12} />
      </span>

      <h2 className='text-xl font-semibold text-foreground leading-tight'>
        {value}
      </h2>
    </div>
  );
};
