'use client';

import Label from '@/shared/components/common/label';
import TextInput from './textInput';

export default function CustomTextInput({
  label,
  name,
  control,
  placeholder = 'Please Enter Text',
  isRequired = false,
}: {
  label: string;
  name: string;
  control: any;
  placeholder?: string;
  isRequired?: boolean;
}) {
  return (
    <>
      <div>
        <Label text={label} isRequired={isRequired} />
      </div>
      <div className=''>
        <TextInput
          name={name}
          control={control}
          placeholder={placeholder}
          isRequired={isRequired}
        />
      </div>
    </>
  );
}
