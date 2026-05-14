import Leftbar from '@/shared/components/common/admin/Leftbar';
import Topbar from '@/shared/components/common/admin/Topbar';

export default function DashboardLayout({children}) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Leftbar />

      {/* Main Wrapper */}
      <div className='flex-1 md:ml-64'>
        <Topbar />

        <main className='px-3 py-4 sm:px-4 md:p-6'>{children}</main>
      </div>
    </div>
  );
}
