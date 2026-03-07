import { ContainerProps } from '@/shared/interfaces/common';
import { cn } from '@/shared/utils/shadCNUtils';

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10',
        className
      )}
    >
      {children}
    </div>
  );
}