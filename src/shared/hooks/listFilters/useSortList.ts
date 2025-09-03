import {useMemo} from 'react';
import {SortOptions, UseSortListProps} from '@/shared/interfaces/hooks';
import {parseAsString, useQueryStates} from 'nuqs';
import {FILTERS_CONFIG} from '@/shared/constants/reactQueryConstants';

const useSortList = <T>({data}: UseSortListProps<T> = {data: []}) => {
  const [sortOptions, setSortOptions] = useQueryStates({
    sortBy: parseAsString.withDefault(FILTERS_CONFIG.sortBy),
    sortDir: parseAsString.withDefault(FILTERS_CONFIG.sortDir),
  });

  const sortedList = useMemo(() => {
    if (!data?.length || !sortOptions.sortBy) return data;

    if (data) {
      return [...data].sort((a, b) => {
        const aValue = sortOptions.sortBy
          ?.split('.')
          .reduce<any>((obj, prop) => obj?.[prop], a);

        const bValue = sortOptions.sortBy
          ?.split('.')
          .reduce<any>((obj, prop) => obj?.[prop], b);

        if (aValue == null) return 1;
        if (bValue == null) return -1;

        const comparison =
          typeof aValue === 'string'
            ? aValue.toLowerCase().localeCompare(bValue.toLowerCase())
            : aValue > bValue
            ? 1
            : -1;

        return sortOptions.sortDir === 'asc' ? comparison : -comparison;
      });
    }
  }, [data, sortOptions]);

  const updateSortOptions = (newOptions: Partial<SortOptions>) => {
    setSortOptions((prevOptions) => ({...prevOptions, ...newOptions}));
  };

  // Reset sorting & remove params from URL
  const resetSortOptions = () => {
    setSortOptions({
      sortBy: FILTERS_CONFIG.sortBy,
      sortDir: FILTERS_CONFIG.sortDir,
    });
  };

  return {sortedList, updateSortOptions, resetSortOptions, sortOptions};
};

export default useSortList;
