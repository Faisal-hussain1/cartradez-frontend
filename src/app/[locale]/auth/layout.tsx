import {NodeChildrenProps} from '@/shared/interfaces/common';

const AuthLayout = ({children}: NodeChildrenProps) => {
  return <div className='min-h-screen w-full'>{children}</div>;
};

export default AuthLayout;
