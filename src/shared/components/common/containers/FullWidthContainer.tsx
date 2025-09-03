import {FullWidthContainerProps} from '@/shared/interfaces/common';

export default function FullWidthContainer({
  children,
  className,
}: FullWidthContainerProps) {
  return <div className={`w-full ${className}`}>{children}</div>;
}
