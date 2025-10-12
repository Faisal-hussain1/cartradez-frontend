import {useState} from 'react';
import {Controller} from 'react-hook-form';
import ErrorMessage from '@/shared/components/common/inputs/errorMessage';
import {EyeIcon, EyeSlashIcon} from '@/shared/components/icons';
import {Input} from '@/shared/components/ui/input';
import {TextInputProps} from '@/shared/interfaces/inputs';

const PasswordInput = ({control, name, label, placeholder}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => {
        const hasValue = field.value && field.value.trim() !== '';

        return (
          <div className='flex flex-col relative w-full'>
            {label && (
              <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
                {label}
              </label>
            )}
            <div className='relative'>
              <Input
                {...field}
                type={showPassword ? 'text' : 'password'}
                className={
                  error
                    ? 'border-[var(--error-light)] bg-[var(--error-light)] focus-visible:ring-error'
                    : hasValue
                      ? 'border-[var(--success-light)] bg-[var(--success-light)] focus-visible:[var(--success-light)]'
                      : 'border-gray-300 bg-white focus-visible:ring-primary' +
                        'placeholder:[color:var(--gray60)]'
                }
                placeholder={placeholder}
              />
              <button
                className='absolute top-[17px] right-[10px] cursor-pointer'
                onClick={togglePasswordVisibility}
                type='button'
              >
                {showPassword ? (
                  <EyeSlashIcon size={18} className='text-secondary' />
                ) : (
                  <EyeIcon size={18} className='text-secondary' />
                )}
              </button>
            </div>
            {error && <ErrorMessage errorMsg={error.message} />}
          </div>
        );
      }}
    />
  );
};

export default PasswordInput;
