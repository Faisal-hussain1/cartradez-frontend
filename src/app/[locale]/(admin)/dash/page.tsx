import DashboardStatsCards from '@/shared/components/common/admin/DashboardStatsCards';
import PendingModerationTable from '@/shared/components/common/admin/PendingModerationTable';
import RecentActivityFeed from '@/shared/components/common/admin/RecentActivityFeed';
import QuickActions from '@/shared/components/common/admin/QuickActions';

export default function AdminDashboardPage() {
  return (
    <div className='space-y-6 p-4'>
      {/* other dashboard components */}
      <DashboardStatsCards />
      <PendingModerationTable />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
        {/* Left */}
        <div className='lg:col-span-2'>
          <RecentActivityFeed />
        </div>

        {/* Right */}
        <QuickActions />
      </div>
    </div>
  );
}
