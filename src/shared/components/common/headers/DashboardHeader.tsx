'use client';

import Image from 'next/image';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {SidebarTrigger} from '@/shared/components/ui/sidebar';
import Container from '@/shared/components/common/containers';
import {HeaderContainer, HeaderSection} from './Reusables';

const DashboardHeader = () => {
  const user = useSelector(getCurrentUser);

  return (
    <HeaderContainer>
      <Container>
        <HeaderSection>
          <div className='flex items-center gap-[10px]'>
            <Image
              src='/images/user.png'
              alt='user'
              width={36}
              height={36}
              className='rounded-full'
            />
            <div className='flex flex-col'>
              <p className='text-sm text-secondary font-semibold'>
                {user?.name}
              </p>
              <span className='text-[10px] text-secondary'>{user?.email}</span>
            </div>
          </div>
          <SidebarTrigger />
        </HeaderSection>
      </Container>
    </HeaderContainer>
  );
};

export default DashboardHeader;
