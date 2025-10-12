import {Controller} from 'react-hook-form';
import {PhoneInput} from 'react-international-phone';
import 'react-international-phone/style.css';
import ErrorMessage from './errorMessage';
import {TextInputProps} from '@/shared/interfaces/inputs';
import {cn} from '@/shared/utils/shadCNUtils';
import {THEME} from '@/shared/constants/theme';

const PhoneInputText = ({
  control,
  name,
  label,
  placeholder,
  disabled = false,
}: TextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => {
        const hasValue = field.value && field.value.trim() !== '';

        return (
          <div
            className={cn(
              'flex flex-col relative w-full group',
              'focus-within:[&_.react-international-phone-country-selector-button]:border-ring',
              'focus-within:[&_.react-international-phone-country-selector-button]:ring-1',
              'focus-within:[&_.react-international-phone-country-selector-button]:ring-ring',
              'focus-within:[&_.react-international-phone-country-selector-button]:ring-offset-0'
            )}
          >
            {label && (
              <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
                {label}
              </label>
            )}

            <PhoneInput
              placeholder={placeholder}
              {...field}
              inputProps={{
                name,
                className: cn(
                  'flex h-[52px] w-full rounded-br-[10px] border-gray-300 bg-white focus-visible:ring-primary' +
                    'placeholder:[color:var(--gray60)] md:text-sm px-4',
                  error &&
                    'border-[var(--error-light)] bg-[var(--error-light)] focus-visible:ring-error',
                  hasValue &&
                    'border-[var(--success-light)] bg-[var(--success-light)] focus-visible:[var(--success-light)]'
                ),
              }}
              disabled={disabled}
              className={cn(
                'rounded-[10px] h-[52px]',
                error &&
                  'border-error [&_.react-international-phone-input-container]:border-error'
              )}
              style={
                {
                  '--react-international-phone-border-top-left-radius': '10px',
                  '--react-international-phone-border-bottom-left-radius':
                    '10px',
                  '--react-international-phone-height': '52px',
                  '--react-international-phone-border-color': error
                    ? THEME.color.borderColor
                    : THEME.color.gray10,
                } as React.CSSProperties
              }
            />
            {error && <ErrorMessage errorMsg={error.message} />}
          </div>
        );
      }}
    />
  );
};

export default PhoneInputText;
