'use client';

import Label from '@/shared/components/common/label';
import TextInput from './textInput';

export default function CustomNumberInput({
  label,
  name,
  control,
  placeholder = 'Please Enter value',
  isRequired = false,
  description = '',
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  isRequired?: boolean;
  description?: string;
}) {
  return (
    <div className='grid grid-cols-12 gap-4 mt-5'>
      <div className='col-span-2 flex items-center justify-end'>
        <Label text={label} isRequired={isRequired} />
      </div>

      <div className='col-span-5'>
        <TextInput
          name={name}
          control={control}
          placeholder={placeholder}
          isRequired={isRequired}
        />
      </div>

      {description && (
        <div className='col-span-5 flex items-center'>{description}</div>
      )}
    </div>
  );
}
