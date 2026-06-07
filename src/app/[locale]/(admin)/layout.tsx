import Leftbar from '@/shared/components/common/admin/Leftbar';
import Topbar from '@/shared/components/common/admin/Topbar';
import BlockedAccountGate from '@/shared/components/common/admin/BlockedAccountGate';
import {ReactNode} from 'react';

export default function DashboardLayout({children}: {children: ReactNode}) {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Leftbar />

      {/* Main Wrapper */}
      <div className='flex-1 md:ml-64'>
        <Topbar />

        <main className='px-3 py-4 sm:px-4 md:p-6'>
          <BlockedAccountGate>{children}</BlockedAccountGate>
        </main>
      </div>
    </div>
  );
}
