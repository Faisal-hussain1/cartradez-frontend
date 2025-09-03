import * as React from 'react';
import {cn} from '@/shared/utils/shadCNUtils';

function Textarea({className, ...props}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'flex min-h-16 max-h-20 w-full rounded-[10px] border-[1px] border-gray10 bg-transparent px-4 py-3 text-base ring-offset-background placeholder:text-gray90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export {Textarea};
