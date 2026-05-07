import {NodeChildrenProps} from '@/shared/interfaces/common';

export const PaymentPageContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-full flex'>{children}</div>;
};

export const LeftSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='hidden md:block md:w-1/4 lg:w-1/5 overflow-hidden'>{children}</div>
  );
};

export const RightSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full md:w-3/4 lg:w-4/5 flex flex-col items-center p-4 md:mt-0 mt-[30px] md:p-[60px]'>
      {children}
    </div>
  );
};
