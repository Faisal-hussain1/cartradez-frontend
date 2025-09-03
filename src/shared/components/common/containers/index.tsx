import {ContainerProps} from '@/shared/interfaces/common';
import {cn} from '@/shared/utils/shadCNUtils';

export default function Container({children, className = ''}: ContainerProps) {
  return (
    <div className={cn('w-full max-w-[1440px] px-5 md:px-10', className)}>
      {children}
    </div>
  );
}
