import {NodeChildrenProps} from '@/shared/interfaces/common';

export const PaymentPageContainer = ({children}: NodeChildrenProps) => {
  return <div className='w-full flex'>{children}</div>;
};

export const LeftSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-[20%] md:block hidden overflow-hidden'>{children}</div>
  );
};

export const RightSideContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full md:w-[80%] flex flex-col items-center p-4 md:mt-0 mt-[30px] md:p-[60px]'>
      {children}
    </div>
  );
};
