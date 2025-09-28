import {Controller} from 'react-hook-form';
import ErrorMessage from './errorMessage';
import {Textarea} from '@/shared/components/ui/textarea';
import {TextInputProps} from '@/shared/interfaces/inputs';

const TextAreaInput = ({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  onFocus,
}: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => {
        const hasValue = field.value && field.value.trim() !== '';

        const baseClasses =
          'w-full rounded-md border p-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 transition';
        const errorClasses = 'border-red-500 bg-red-50 focus:ring-red-500';

        const successClasses =
          'border-green-500 bg-green-50 focus:ring-green-500';
        const normalClasses = 'border-gray-300 bg-white focus:ring-primary';

        return (
          <div className='flex flex-col relative w-full'>
            {label && (
              <label className='text-sm mb-1 text-secondary font-semibold'>
                {label}
              </label>
            )}

            <Textarea
              {...field}
              placeholder={placeholder}
              className={
                error
                  ? `${baseClasses} ${errorClasses}`
                  : hasValue
                    ? `${baseClasses} ${successClasses}`
                    : `${baseClasses} ${normalClasses}`
              }
              disabled={disabled}
              onFocus={onFocus}
              rows={5}
            />

            {error && (
              <div className='flex justify-start'>
                <ErrorMessage errorMsg={error.message} />
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default TextAreaInput;
