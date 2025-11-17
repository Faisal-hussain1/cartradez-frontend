import {useState} from 'react';
import useTranslation from '@/shared/hooks/useTranslation';
import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {Input} from '@/shared/components/ui/input';
import {SearchInputProps} from '@/shared/interfaces/inputs';
import {CloseIcon, SearchIcon} from '@/shared/components/icons';

const SearchInput = ({
  initialValue = '',
  onSearch,
  placeholder,
  additionalInputClassName = '',
  additionalButtonClassName = '',
}: SearchInputProps) => {
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
    <div className='flex w-full md:w-auto items-center gap-3'>
      {/* Search Input */}
      <div className='relative flex-1'>
        <Input
          type='text'
          value={search}
          onChange={(e) => {
            if (e.target.value) setSearch(e.target.value);
            else clearFilters();
          }}
          placeholder={placeholder || t('Search...')}
          className={`w-full h-[48px] bg-white border border-gray-300 rounded-[10px] pr-10 text-gray-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all ${additionalInputClassName}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />

        {/* Clear Button */}
        {search && (
          <button
            type='button'
            onClick={clearFilters}
            className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600'
          >
            <CloseIcon className='w-4 h-4' />
          </button>
        )}
      </div>

      {/* Search Button */}
      <PrimaryButton
        buttonText={
          <>
            <SearchIcon className='h-6 w-6' />
            {t('Search')}
          </>
        }
        onClick={handleSearch}
        styles={`h-[48px] px-6 bg-primary text-white rounded-[10px] font-semibold hover:bg-primary-dark transition-all ${additionalButtonClassName}`}
      />
    </div>
  );
};

export default SearchInput;
