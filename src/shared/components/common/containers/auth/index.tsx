import {NodeChildrenProps} from '@/shared/interfaces/common';

export const AuthSectionContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-full flex'>{children}</div>;
};

export const LeftSideContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-[25%] md:block hidden'>{children}</div>;
};

export const RightSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full md:w-[75%] flex-col-center md:mt-0 mt-[10px] p-[15px]'>
      {children}
    </div>
  );
};
