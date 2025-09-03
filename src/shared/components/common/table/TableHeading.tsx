import {TableHeadingProps} from '@/shared/interfaces/common';

const TableHeading = ({title}: TableHeadingProps) => {
  return (
    <div className='flex-between py-6'>
      <h2 className='text-[24px] md:text-[30px] font-bold text-secondary'>
        {title}
      </h2>
    </div>
  );
};

export default TableHeading;
