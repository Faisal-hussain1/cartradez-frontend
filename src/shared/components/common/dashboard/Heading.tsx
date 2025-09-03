import {HeadingProps} from '@/shared/interfaces/common';
import PrimaryButton from '../buttons/PrimaryButton';

const Heading = ({title, buttonText, handleClick}: HeadingProps) => {
  return (
    <div className='flex-between py-6'>
      <h2 className='text-[24px] md:text-[30px] font-bold text-secondary'>
        {title}
      </h2>
      <PrimaryButton
        buttonText={buttonText}
        styles='flex-center text-xs md:text-base w-[125px] h-[40px] md:w-[167px] md:h-[54px]'
        onClick={handleClick}
      />
    </div>
  );
};

export default Heading;
