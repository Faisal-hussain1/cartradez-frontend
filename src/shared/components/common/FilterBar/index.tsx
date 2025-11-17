'use client';

import {useRouter} from 'next/navigation';
import useTranslation from '@/shared/hooks/useTranslation';
import ReactSelect from '@/shared/components/common/inputs/ReactSelect';
import SearchInput from '@/shared/components/common/inputs/searchInput';
import {FiltersBarProps} from '@/shared/interfaces/common';
import {STATUS_OPTIONS} from '@/shared/constants/general';

const FiltersBar = ({
  setFilters,
  filters: {requestStatus, searchValue},
  hideSelect = false,
  placeholder = 'Search...',
  redirectPath = '', // 👈 optional, to specify where to redirect
}: FiltersBarProps & {redirectPath?: string}) => {
  const {ct, t} = useTranslation();
  const router = useRouter();

  const defaultSelectValue = ct(STATUS_OPTIONS).all;

  const selectValue = {
    ...(requestStatus || defaultSelectValue),
    label: `${t('search')} ${(requestStatus || ct(STATUS_OPTIONS).all).label}`,
  };

  const handleSearch = (searchValue: string) => {
    if (redirectPath) {
      // 👇 Redirect to a custom path, e.g. /filtered?search=term
      router.push(`${redirectPath}?search=${encodeURIComponent(searchValue)}`);
    } else {
      setFilters({searchValue});
    }
  };

  const handleStatusChange = (val: any) => {
    setFilters({
      requestStatus: val || defaultSelectValue,
    });
  };

  return (
    <div className='flex flex-col md:flex-row items-center mb-10 gap-4 md:gap-0'>
      {!hideSelect && (
        <div className='w-full md:w-auto flex justify-center md:justify-start'>
          <ReactSelect value={selectValue} onChange={handleStatusChange} />
        </div>
      )}

      <div className='flex-1 w-full'>
        <SearchInput
          initialValue={searchValue}
          onSearch={handleSearch}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
