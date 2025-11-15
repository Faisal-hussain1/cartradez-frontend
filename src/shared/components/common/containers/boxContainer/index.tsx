import {BoxContainerProps} from '@/shared/interfaces/common';

const BoxContainer = ({
  children,
  heading,
  subHeading = '',
  containerStyles = '',
}: BoxContainerProps) => {
  return (
    <div
      className={`w-full p-[14px] md:p-[24px] bg-white rounded-2xl border-l-4 border-transparent hover:border-primary shadow-none hover:shadow-2xl transition-all duration-300 ${containerStyles}`}
    >
      <p className='text-[18px] md:text-[24px] font-bold text-gray90 mb-2'>
        {heading}
      </p>
      <p className='text-sm text-gray90'>{subHeading}</p>
      {children}
    </div>
  );
};

export default BoxContainer;
