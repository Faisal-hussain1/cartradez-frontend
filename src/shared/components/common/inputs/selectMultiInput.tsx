import {useId} from 'react';
import {Controller} from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from './errorMessage';
import {SelectInputProps} from '@/shared/interfaces/inputs';

function SelectMultiInput({
  label,
  options,
  control,
  name,
  placeholder = 'Select a Type',
  ...rest
}: SelectInputProps) {
  const id = useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {value, onChange}, fieldState: {error}}) => {
        return (
          <div className='flex flex-col relative'>
            {label && (
              <label className='text-[14px] mb-[10px] text-secondary font-semibold'>
                {label}
              </label>
            )}
            <Select
              isMulti
              onChange={(selectedOptions) => {
                onChange(
                  selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : []
                );
              }}
              value={options.filter((option) =>
                Array.isArray(value) ? value.includes(option.value) : false
              )}
              className={`react-select ${error && 'border-danger'}`}
              options={options}
              placeholder={placeholder}
              instanceId={id}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '52px',
                  borderRadius: '10px',
                  borderColor: error ? 'var(--error)' : base.borderColor,
                  '&:hover': {
                    borderColor: error ? 'var(--error)' : 'var(--primary)',
                  },
                }),
                option: (base, {isFocused, isSelected}) => ({
                  ...base,
                  backgroundColor: isSelected
                    ? 'var(--primary)'
                    : isFocused
                      ? 'var(--primary)'
                      : base.backgroundColor,
                  color: isFocused || isSelected ? 'white' : base.color,
                  '&:active': {
                    backgroundColor: 'var(--primary)',
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: 'var(--primary)',
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'white',
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: 'white',
                  ':hover': {
                    color: 'white',
                  },
                }),
              }}
              {...rest}
            />
            {error && <ErrorMessage errorMsg={error.message} />}
          </div>
        );
      }}
    />
  );
}

export default SelectMultiInput;
