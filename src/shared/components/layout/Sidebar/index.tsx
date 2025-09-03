'use client';

import {SidebarProvider} from '@/shared/components/ui/sidebar';
import AppSidebar from './AppSidebar';
import {NodeChildrenProps} from '@/shared/interfaces/common';
import DashboardHeader from '@/shared/components/common/headers/DashboardHeader';

const SidebarLayout = ({children}: NodeChildrenProps) => {
  return (
    <SidebarProvider>
      <div className='flex w-full min-h-screen overflow-hidden'>
        <AppSidebar />
        <main className='flex-1 flex flex-col overflow-x-hidden'>
          <DashboardHeader />
          <div className='flex-1 overflow-y-auto'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
