import {NodeChildrenProps} from '@/shared/interfaces/common';

export const ShadowContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full px-3 md:px-20 shadow-xl border border-gray-100 rounded-[14px]'>
      <div className='p-2 md:p-8'>{children}</div>
    </div>
  );
};
