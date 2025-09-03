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
      render={({field, fieldState: {error}}) => (
        <div className='flex flex-col relative w-full'>
          {label && (
            <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
              {label}
            </label>
          )}
          <Textarea
            {...field}
            placeholder={placeholder}
            className={error ? 'border-error focus-visible:ring-error' : ''}
            disabled={disabled}
            onFocus={onFocus}
          />
          {error && <ErrorMessage errorMsg={error.message} />}
        </div>
      )}
    />
  );
};

export default TextAreaInput;
