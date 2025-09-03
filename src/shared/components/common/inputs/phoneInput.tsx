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
      render={({field, fieldState: {error}}) => (
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
                'flex h-[52px] w-full rounded-tr-[10px] rounded-br-[10px] border-[1px] border-gray10 bg-transparent px-4 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                error && 'border-error focus-visible:ring-error'
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
                '--react-international-phone-border-bottom-left-radius': '10px',
                '--react-international-phone-height': '52px',
                '--react-international-phone-border-color': error
                  ? THEME.color.borderColor
                  : THEME.color.gray10,
              } as React.CSSProperties
            }
          />
          {error && <ErrorMessage errorMsg={error.message} />}
        </div>
      )}
    />
  );
};

export default PhoneInputText;
