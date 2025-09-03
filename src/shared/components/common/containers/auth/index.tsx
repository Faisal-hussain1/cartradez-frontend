import {NodeChildrenProps} from '@/shared/interfaces/common';

export const AuthSectionContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-full flex'>{children}</div>;
};

export const LeftSideContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-[25%] md:block hidden'>{children}</div>;
};

export const RightSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full md:w-[75%] flex-col-center p-4 md:mt-0 mt-[30px] md:p-[60px]'>
      {children}
    </div>
  );
};
