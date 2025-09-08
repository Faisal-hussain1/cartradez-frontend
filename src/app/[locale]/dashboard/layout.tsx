import Container from '@/shared/components/common/containers';
import SidebarLayout from '@/shared/components/layout/Sidebar';
import {NodeChildrenProps} from '@/shared/interfaces/common';

const DashboardLayout = ({children}: NodeChildrenProps) => {
  return (
    <SidebarLayout>
      <div className='flex justify-center w-full relative'>
        {/* <CheckbookBackdrop /> */}
        <Container className='max-w-[1200px] 2xl:max-w-[1440px]'>
          {children}
        </Container>
      </div>
    </SidebarLayout>
  );
};

export default DashboardLayout;
