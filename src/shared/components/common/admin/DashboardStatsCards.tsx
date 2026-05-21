'use client';

import {ArrowUpRight} from 'lucide-react';
import {useMemo} from 'react';
import {vehiclesQueries} from '@/shared/reactQuery';
import {useSelector} from 'react-redux';
import {getUserRole} from '@/shared/redux/slices/users';

interface StatItem {
  title: string;
  value: number | string;
}

export default function DashboardStatsCards() {
  const {
    useFetchActiveListingsCount,
    useFetchDashboardVehicleStats,
  } = vehiclesQueries();
  const role = useSelector(getUserRole);
  const isAdmin = role === 'admin';
  const {data: activeData, isLoading: isActiveLoading} = useFetchActiveListingsCount({
    enabled: !isAdmin,
  });
  const {data, isLoading: isDashboardLoading} = useFetchDashboardVehicleStats({
    enabled: isAdmin,
  });

  const activeListingsCount = useMemo(() => {
    const rawCount =
      activeData?.count ??
      activeData?.data?.count ??
      activeData?.data?.body?.count ??
      activeData?.body?.count ??
      data?.data?.activeListingsCount ??
      data?.body?.activeListingsCount ??
      data?.activeListingsCount ??
      0;

    return Number(rawCount) || 0;
  }, [activeData, data]);

  const managedListingsCount = useMemo(() => {
    const rawCount =
      data?.data?.managedByCartradezCount ??
      data?.body?.managedByCartradezCount ??
      data?.managedByCartradezCount ??
      0;

    return Number(rawCount) || 0;
  }, [data]);
  const isActiveCountLoading = isAdmin ? isDashboardLoading : isActiveLoading;

  const stats: StatItem[] = [
    {
      title: 'Active Listings',
      value: isActiveCountLoading ? '...' : activeListingsCount.toLocaleString(),
    },
    ...(isAdmin
      ? [{
          title: 'Managed by Cartradez',
          value: isDashboardLoading ? '...' : managedListingsCount.toLocaleString(),
        }]
      : []),
    // {title: 'Pending Listings', value: '453'},
    // {title: 'Managed Listings', value: '0'},
    // {title: 'New Users (7d)', value: '352'},
    // {title: 'Support Tickets', value: '967'},
  ];
  return (
    <section className='w-full px-2 sm:px-4'>
      <div
        className='
          grid grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-2
          sm:gap-3
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
