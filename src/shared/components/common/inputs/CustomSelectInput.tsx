'use client';

import SelectInput from '@/shared/components/common/inputs/selectInput';

import Label from '@/shared/components/common/label';

export default function CustomSelectInput({
  label,
  name,
  control,
  placeholder = 'Please Select an Option',
  isRequired = false,
  options,
  description = '',
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  isRequired?: boolean;
  options: {value: string; label: string}[];
  description?: string;
}) {
  return (
    <div className='grid grid-cols-12 gap-4 mt-5'>
      <div className='col-span-2 flex items-center justify-end'>
        <Label text={label} isRequired={isRequired} />
      </div>

      <div className='col-span-5'>
        <SelectInput
          options={options}
          control={control}
          name={name}
          placeholder={placeholder}
        />
      </div>

      {description && (
        <div className='col-span-5 flex items-center'>{description}</div>
      )}
    </div>
  );
}
