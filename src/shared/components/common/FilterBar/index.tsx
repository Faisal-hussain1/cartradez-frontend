import useTranslation from '@/shared/hooks/useTranslation';
import ReactSelect from '@/shared/components/common/inputs/ReactSelect';
import SearchInput from '@/shared/components/common/inputs/searchInput';

import {FiltersBarProps} from '@/shared/interfaces/checkbook';
import {STATUS_OPTIONS} from '@/shared/constants/checkbook';

const FiltersBar = ({
  setFilters,
  filters: {requestStatus, searchValue},
  hideSelect = false,
}: FiltersBarProps) => {
  const {ct, t} = useTranslation();

  const defaultSelectValue = ct(STATUS_OPTIONS).all;

  const selectValue = {
    ...(requestStatus || defaultSelectValue),
    label: `${t('checkbook.requests.filters.status')} ${(requestStatus || ct(STATUS_OPTIONS).all).label}`,
  };

  const handleSearch = (searchValue: string) => {
    setFilters({searchValue});
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
      <SearchInput
        initialValue={searchValue}
        onSearch={handleSearch}
        placeholder={t('checkbook.requests.filters.typeHere')}
      />
    </div>
  );
};

export default FiltersBar;
