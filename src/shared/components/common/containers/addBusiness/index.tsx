import {AddBusinessContainerProps} from '@/shared/interfaces/business';

export default function AddBusinessContainer({
  children,
  heading,
}: AddBusinessContainerProps) {
  return (
    <div className='shadow-glow my-6 p-6 rounded-[14px]'>
      <h3 className='font-semibold text-lg leading-7 text-gray90'>{heading}</h3>
      <div className='mt-4'>{children}</div>
    </div>
  );
}
