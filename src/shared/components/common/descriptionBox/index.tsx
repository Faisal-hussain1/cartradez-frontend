'use client';
import * as React from 'react';
import {Button} from '@/shared/components/ui/button';
import {cn} from '@/shared/utils/shadCNUtils';
import TextAreaInput from '../inputs/TextAreaInput';

interface DescriptionBoxProps {
  name: string;
  placeholder?: string;
  control: any;
  suggestions: string[];
  setValue: any;
  watch: any;
  className?: string;
}

export function DescriptionBox({
  name,
  placeholder = 'Describe your car...',
  control,
  suggestions,
  setValue,
  watch,
  className,
}: DescriptionBoxProps) {
  const handleAddSuggestion = (suggestion: string) => {
    const prev = watch('description'); // get current form value
    const updated = prev ? `${prev.trim()}. ${suggestion}` : suggestion;
    setValue('description', updated, {shouldValidate: true});
  };

  //   const handleReset = () => setText('');

  return (
    <div className={cn('w-full space-y-3', className)}>
      <TextAreaInput name={name} control={control} placeholder={placeholder} />

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
              className='bg-gray20 text-black p-3'
            >
              {sug}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
