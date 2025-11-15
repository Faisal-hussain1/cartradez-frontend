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
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  isRequired?: boolean;
  options: {value: string; label: string}[];
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
        />
      </div>
    </>

    // <div className='grid grid-cols-12 gap-4 mt-5'>
    //   <div className='hidden md:col-span-3 lg:col-span-2 md:flex items-center justify-end'>
    //     <Label text={label} isRequired={isRequired} />
    //   </div>

    //   <div className='col-span-12 md:col-span-5 lg:col-span-6'>
    //     <SelectInput
    //       label={<span className='block md:hidden'>{label}</span>}
    //       options={options}
    //       control={control}
    //       name={name}
    //       placeholder={placeholder}
    //       isRequired={isRequired}
    //     />
    //   </div>

    //   {description && (
    //     <div className='col-span-12 md:col-span-4 flex items-center'>
    //       {description}
    //     </div>
    //   )}
    // </div>
  );
}
