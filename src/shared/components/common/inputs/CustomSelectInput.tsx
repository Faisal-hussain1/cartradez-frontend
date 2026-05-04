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
  isCreatable = false,
  isSearchable = true,
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  isRequired?: boolean;
  options: {value: string; label: string}[];
  isCreatable?: boolean;
  isSearchable?: boolean;
}) {
  return (
    <>
      <div>
        <Label text={label} isRequired={isRequired} />
      </div>
      <div className=''>
        <SelectInput
          options={options}
          control={control}
          name={name}
          placeholder={placeholder}
          isRequired={isRequired}
          isCreatable={isCreatable}
          isSearchable={isSearchable}
        />
      </div>
    </>
  );
}
