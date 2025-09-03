'use client';
import {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import ErrorMessage from './errorMessage';
import {Input} from '@/shared/components/ui/input';
import {NumberInputProps} from '@/shared/interfaces/inputs';

const NumberField = ({
  field,
  error,
  label,
  placeholder,
  minValue = 0,
}: {
  field: any;
  error: any;
  label?: string;
  placeholder?: string;
  minValue?: number;
}) => {
  const rawValue = field.value ?? minValue;
  const [localValue, setLocalValue] = useState(rawValue.toString());

  useEffect(() => {
    setLocalValue(rawValue.toString());
  }, [rawValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setLocalValue(input);
    const parsed = parseFloat(input);
    field.onChange(isNaN(parsed) ? minValue : Math.max(parsed, minValue));
  };

  const handleBlur = () => {
    if (localValue === '') {
      setLocalValue(minValue.toString());
      field.onChange(minValue);
    }
  };

  return (
    <div className='flex flex-col relative'>
      {label && (
        <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
          {label}
        </label>
      )}
      <Input
        type='number'
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={error && 'border-error focus-visible:ring-error'}
        min={minValue}
        step='any'
      />
      {error && <ErrorMessage errorMsg={error.message} />}
    </div>
  );
};

const NumberInput = ({
  control,
  name,
  label,
  placeholder,
  minValue = 0,
}: NumberInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <NumberField
          field={field}
          error={error}
          label={label}
          placeholder={placeholder}
          minValue={minValue}
        />
      )}
    />
  );
};

export default NumberInput;
