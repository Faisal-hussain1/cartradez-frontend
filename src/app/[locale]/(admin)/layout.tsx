import Leftbar from '@/shared/components/common/admin/Leftbar';
import Topbar from '@/shared/components/common/admin/Topbar';

export default function DashboardLayout({children}) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='fixed left-0 top-0 h-screen w-64 bg-white border-r z-30'>
        <Leftbar />
      </aside>

      {/* Main Wrapper */}
      <div className='flex-1 ml-64'>
        <Topbar />

        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
