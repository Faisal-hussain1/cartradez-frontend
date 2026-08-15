import type {Metadata} from 'next';

import {NodeChildrenProps} from '@/shared/interfaces/common';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const AuthLayout = ({children}: NodeChildrenProps) => {
  return <div className='min-h-screen w-full'>{children}</div>;
};

export default AuthLayout;