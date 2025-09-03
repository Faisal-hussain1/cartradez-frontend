import Select from 'react-select';
import {ReactSelectProps} from '@/shared/interfaces/checkbook';
import {STATUS_OPTIONS_LIST} from '@/shared/constants/checkbook';

import useTranslation from '@/shared/hooks/useTranslation';
import {THEME} from '@/shared/constants/theme';

const ReactSelect = ({value, onChange, className = ''}: ReactSelectProps) => {
  const {ct} = useTranslation();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      height: '48px',
      minHeight: '48px',
      borderRadius: '6px 0 0 6px',
      minWidth: '150px',
      boxShadow: 'none',
      backgroundColor: THEME.color.mist,
      marginRight: '14px',
      border: 'none',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      height: '48px',
      padding: '0 12px',
    }),
    input: (provided: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '48px',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: THEME.color.secondary,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: THEME.color.secondary,
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '6px',
      boxShadow: `0 2px 8px ${THEME.color.shadowColor}`,
      zIndex: 50,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? THEME.color.primary : 'white',
      color: state.isFocused ? 'white' : 'black',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: THEME.color.primary,
        color: 'white',
      },
    }),
  };

  return (
    <Select
      value={value}
      onChange={onChange}
      options={ct(STATUS_OPTIONS_LIST)}
      styles={customStyles}
      isSearchable={false}
      className={className}
    />
  );
};

export default ReactSelect;
