import {NodeChildrenProps} from '@/shared/interfaces/common';

export const HeaderSection = ({children}: NodeChildrenProps) => {
  return (
    <div className='flex-between md:hidden p-[10px] bg-white rounded-[8px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.04)]'>
      {children}
    </div>
  );
};

export const HeaderContainer = ({children}: NodeChildrenProps) => {
  return <div className='flex justify-center w-full mt-[10px]'>{children}</div>;
};
