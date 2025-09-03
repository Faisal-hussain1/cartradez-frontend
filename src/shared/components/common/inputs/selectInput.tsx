import {useId} from 'react';
import {Controller} from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from './errorMessage';
import {SelectInputProps} from '@/shared/interfaces/inputs';

function SelectInput({
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
            {label && <label className='ml-[2px] mt-[3px]'>{label}</label>}
            <Select
              onChange={(selectedOption) => {
                onChange(selectedOption?.value);
              }}
              className={`react-select ${error && 'border-danger'}`}
              options={options}
              placeholder={placeholder}
              value={options?.filter((option) => option.value === value)}
              instanceId={id}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: 'var(--mist)',
                  minHeight: '43px',
                  minWidth: '180px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'black',
                  border: '1px solid var(--gray20)',
                  transition: 'transform 0.2s',
                  boxShadow: state.isFocused
                    ? '0 0 0 1px var(--primary)'
                    : base.boxShadow,
                  '&:hover': {
                    color: 'white',
                    backgroundColor: 'var(--primary)',
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'inherit',
                  fontSize: '15px',
                  fontWeight: '450',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: 'black',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  padding: '0 8px',
                  color: 'inherit',
                  '& svg': {
                    width: '18px',
                    height: '18px',
                    transition: 'transform 0.2s',
                    path: {
                      strokeWidth: '0px',
                      vectorEffect: 'non-scaling-stroke',
                    },
                  },
                  '&:hover': {
                    color: 'inherit',
                    '& svg': {
                      transform: 'none',
                    },
                  },
                }),
                indicatorSeparator: () => ({
                  display: 'none',
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

export default SelectInput;
