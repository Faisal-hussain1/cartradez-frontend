import {Controller} from 'react-hook-form';
import ErrorMessage from './errorMessage';
import {Input} from '@/shared/components/ui/input';
import {RadioGroupProps} from '@/shared/interfaces/inputs';

const RadioGroup = ({
  control,
  name,
  label,
  options,
  disabled = false,
}: RadioGroupProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <div className='flex flex-col w-full'>
          {label && (
            <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
              {label}
            </label>
          )}
          <div className='flex items-center gap-6 pt-2'>
            {options.map((option) => (
              <label
                key={option.label}
                className='flex items-center text-sm font-light gap-2'
              >
                <Input
                  type='radio'
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className='h-4 w-4'
                  disabled={disabled}
                />
                {option.label}
              </label>
            ))}
          </div>
          {error && <ErrorMessage errorMsg={error.message} />}
        </div>
      )}
    />
  );
};

export default RadioGroup;
