import {Controller} from 'react-hook-form';
import ErrorMessage from './errorMessage';
import {Input} from '@/shared/components/ui/input';
import {TextInputProps} from '@/shared/interfaces/inputs';

const TextInput = ({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  isRequired = false,
  onFocus,
}: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => {
        const hasValue = field.value && field.value.trim() !== '';

        return (
          <div className='flex flex-col relative w-full'>
            {label && (
              <label className='font-medium text-gray-700 mb-[5px] inline-flex items-center gap-1'>
                {label}
                {isRequired && (
                  <span className='inline-flex md:hidden text-red100'>*</span>
                )}
              </label>
            )}
            <Input
              {...field}
              placeholder={placeholder}
              className={
                error
                  ? 'border-[var(--error-light)] bg-[var(--error-light)] focus-visible:ring-error'
                  : hasValue
                    ? 'border-[var(--success-light)] bg-[var(--success-light)] focus-visible:[var(--success-light)]'
                    : 'border-gray-300 bg-white focus-visible:ring-primary' +
                      'placeholder:[color:var(--gray60)]'
              }
              disabled={disabled}
              onFocus={onFocus}
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

export default TextInput;
