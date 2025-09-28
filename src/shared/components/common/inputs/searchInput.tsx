import {useState} from 'react';
import useTranslation from '@/shared/hooks/useTranslation';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {Input} from '@/shared/components/ui/input';
import {SearchInputProps} from '@/shared/interfaces/inputs';
import {CloseIcon} from '@/shared/components/icons';

const SearchInput = ({
  initialValue = '',
  onSearch,
  placeholder,
  additionalInputClassName = '',
  additionalButtonClassName = '',
}: SearchInputProps) => {
  const baseInputClassName =
    'md:w-[390px] h-[48px] border-r-0 rounded-tl-[10px] rounded-bl-[10px] rounded-tr-none rounded-br-none';

  const baseButtonClassName =
    'h-[48px] rounded-tr-[10px] rounded-br-[10px] rounded-tl-none rounded-bl-none';

  const inputClassName = `${baseInputClassName} ${additionalInputClassName}`;

  const buttonClassName = `${baseButtonClassName} ${additionalButtonClassName}`;

  const {t} = useTranslation();
  const [search, setSearch] = useState(initialValue);

  const handleSearch = () => {
    onSearch(search);
  };

  const clearFilters = () => {
    setSearch('');
    onSearch('');
  };

  return (
    <div className='relative w-full md:w-auto flex'>
      <Input
        type='text'
        value={search}
        onChange={(e) => {
          if (e.target.value) setSearch(e.target.value);
          else clearFilters();
        }}
        placeholder={placeholder || t('asdasda')}
        className={inputClassName}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />

      {search && (
        <button
          type='button'
          onClick={clearFilters}
          className='absolute right-21 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
        >
          <CloseIcon />
        </button>
      )}

      <PrimaryButton
        buttonText={t('Search')}
        onClick={handleSearch}
        styles={buttonClassName}
      />
    </div>
  );
};

export default SearchInput;
