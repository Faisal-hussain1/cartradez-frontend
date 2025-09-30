'use client';

import {ReactNode} from 'react';
import * as React from 'react';
import {Button} from '@/shared/components/ui/button';
import {cn} from '@/shared/utils/shadCNUtils';
import TextAreaInput from '../inputs/TextAreaInput';

interface DescriptionBoxProps {
  name: string;
  label?: ReactNode;
  placeholder?: string;
  control: any;
  suggestions?: string[];
  maxLength?: number;
  setValue: any;
  watch: any;
  className?: string;
  isRequired?: boolean;
}

export function DescriptionBox({
  name,
  label = '',
  placeholder = 'Describe your car...',
  control,
  suggestions = [
    'Like New',
    'Authorized Workshop Maintained',
    'Minor Accidental Cars',
    'Complete Service History',
    'Fresh Import',
    'Price Negotiable',
    'Alloy Rims',
  ],
  setValue,
  watch,
  maxLength = 1000,
  className,
  isRequired = false,
}: DescriptionBoxProps) {
  const handleAddSuggestion = (suggestion: string) => {
    const prev = watch('description'); // get current form value
    const updated = prev ? `${prev.trim()}. ${suggestion}` : suggestion;
    setValue('description', updated, {shouldValidate: true});
  };

  //   const handleReset = () => setText('');

  return (
    <div className={cn('w-full space-y-3', className)}>
      {label && (
        <label className='font-medium text-gray-700 mb-[5px] inline-flex items-center gap-1'>
          {label}
          {isRequired && (
            <span className='inline-flex md:hidden text-red100'>*</span>
          )}
        </label>
      )}

      {/* <textarea
        name={name}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className='w-full rounded-md border border-gray-300 p-3 text-sm focus:border-primary focus:ring focus:ring-primary/30'
        rows={5}
      /> */}

      <TextAreaInput name={name} control={control} placeholder={placeholder} />

      {/* <div className='flex items-center justify-between text-xs text-gray-500'>
        <span>Remaining Characters: {maxLength - text.length}</span>
        <button onClick={handleReset} className='text-blue-500 hover:underline'>
          Reset
        </button>
      </div> */}

      <div>
        <p className='text-sm text-gray-600 mb-2'>
          You can also use these suggestions
        </p>
        <div className='flex flex-wrap gap-2'>
          {suggestions.map((sug) => (
            <Button
              key={sug}
              type='button'
              variant='outline'
              size='sm'
              onClick={() => handleAddSuggestion(sug)}
              className='rounded-full p-5'
            >
              {sug}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
