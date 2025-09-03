import {useMemo, useCallback} from 'react';
import {UseSearchListProps} from '@/shared/interfaces/hooks';
import {parseAsString, useQueryState} from 'nuqs';
import {FILTERS_CONFIG} from '@/shared/constants/reactQueryConstants';

const useSearchList = <T>(
  {data, listType}: UseSearchListProps<T> = {data: [], listType: null}
) => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault(FILTERS_CONFIG.search)
  );

  const extractNestedValue = (item: any, key: any) =>
    key.split('.').reduce((obj: any, prop: any) => obj?.[prop], item);

  const isMatchingSearch = useCallback(
    (item: any) =>
      listType?.search?.keys.some((key) => {
        const value = extractNestedValue(item, key);

        return (
          typeof value === 'string' &&
          value.toLowerCase().includes(search.toLowerCase())
        );
      }),
    [listType?.search?.keys, search]
  );

  const filteredList = useMemo(() => {
    if (!data?.length || !search) return data;

    return data.filter(isMatchingSearch);
  }, [data, search, isMatchingSearch]);

  const updateSearchValue = (value: string) => {
    setSearch(value);
  };

  const resetSearchValue = () => {
    setSearch(FILTERS_CONFIG.search);
  };

  return {filteredList, updateSearchValue, resetSearchValue, search};
};

export default useSearchList;
