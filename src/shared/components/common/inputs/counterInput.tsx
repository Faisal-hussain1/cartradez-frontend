'use client';
import {useState, useEffect} from 'react';
import {Controller} from 'react-hook-form';
import ErrorMessage from './errorMessage';
import {CounterFieldProps, CounterInputProps} from '@/shared/interfaces/inputs';
import {Button} from '@/shared/components/ui/button';
import {MinusIcon, PlusIcon} from '@/shared/components/icons';
import {Input} from '@/shared/components/ui/input';

const CounterField = ({
  field,
  error,
  name,
  label,
  placeholder,
  minValue = 0,
  maxValue = 999999,
}: CounterFieldProps) => {
  const rawValue = field.value ?? 0;
  const [localValue, setLocalValue] = useState(rawValue.toString());

  useEffect(() => {
    setLocalValue(rawValue.toString());
  }, [rawValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/^0+/, '') || '0';
    setLocalValue(input);
    const parsed = parseInt(input, 10);
    field.onChange(isNaN(parsed) ? 0 : parsed);
  };

  const handleBlur = () => {
    if (localValue === '') {
      setLocalValue('0');
      field.onChange(0);
    }
  };

  const increment = () => {
    const newValue = Math.min((parseInt(localValue, 10) || 0) + 1, maxValue);
    setLocalValue(newValue.toString());
    field.onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max((parseInt(localValue, 10) || 0) - 1, minValue);
    setLocalValue(newValue.toString());
    field.onChange(newValue);
  };

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium mb-1'>
          {label}
        </label>
      )}
      <div className='flex items-center border border-gray-100 rounded-[10px] overflow-hidden'>
        <Button
          variant='outline'
          size='icon'
          className='rounded-[5px] h-14 w-14 bg-red-100 border-none hover:bg-red-200 transition-all'
          onClick={decrement}
          type='button'
        >
          <MinusIcon className='h-6 w-6 text-secondary' />
        </Button>
        <Input
          className='border-none focus-visible:ring-0 focus-visible:outline-none w-full h-14 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type='number'
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
              e.preventDefault();
            }
          }}
          placeholder={placeholder}
        />
        <Button
          variant='outline'
          size='icon'
          className='rounded-[5px] h-14 w-14 bg-green-100 border-none hover:bg-green-200 transition-all'
          onClick={increment}
          type='button'
        >
          <PlusIcon className='h-6 w-6 text-secondary' />
        </Button>
      </div>
      {error && <ErrorMessage errorMsg={error.message} />}
    </div>
  );
};

const CounterInput = ({
  control,
  name,
  label,
  placeholder,
  minValue,
  maxValue,
}: CounterInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <CounterField
          field={field}
          error={error}
          name={name}
          label={label}
          placeholder={placeholder}
          minValue={minValue}
          maxValue={maxValue}
        />
      )}
    />
  );
};

export default CounterInput;
