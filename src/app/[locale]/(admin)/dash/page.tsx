import DashboardStatsCards from '@/shared/components/common/admin/DashboardStatsCards';
import PendingModerationTable from '@/shared/components/common/admin/PendingModerationTable';
import RecentActivityFeed from '@/shared/components/common/admin/RecentActivityFeed';
import QuickActions from '@/shared/components/common/admin/QuickActions';

export default function AdminDashboardPage() {
  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 space-y-6">

      {/* Stats */}
      <DashboardStatsCards />

      {/* Pending Table */}
      <div className="overflow-x-auto">
        <PendingModerationTable />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Activity Feed */}
        <div className="md:col-span-2 xl:col-span-2">
          <RecentActivityFeed />
        </div>

        {/* Quick Actions */}
        <div className="w-full">
          <QuickActions />
        </div>

      </div>

    </div>
  );
}