import {useCallback, useEffect, useState} from 'react';
import {parseAsString, useQueryState} from 'nuqs';

// import useSearchList from './useSearchList';
// import useSortList from './useSortList';
import usePagination from './usePagination';
import {ServerSideListFiltersProps} from '@/shared/interfaces/hooks';
import {PAGINATION_TYPES} from '@/shared/constants/general';
import {
  FilterProps,
  RequestsStatus,
  StatusOption,
} from '@/shared/interfaces/checkbook';
import {STATUS_OPTIONS} from '@/shared/constants/checkbook';

import useTranslation from '@/shared/hooks/useTranslation';
import {IdBasedPaginationOptions} from '@/shared/types/utils';
import {FILTERS_CONFIG} from '@/shared/constants/reactQueryConstants';

const useServerSideListFilters = <T>({
  listType,
  queryToCall,
  dataKey,
  paginationType = PAGINATION_TYPES.pageBased.value,
  useUrlParams = true,
}: /**
 * dataKey: Specifies the key in the API response that contains the list of items.
 * It supports both direct and nested keys using dot notation.
 *
 * Example Usage:
 * - If API response is { docs: [...], pagination: {...} }, pass dataKey = "docs"
 * - If API response is { trucks: [...], pagination: {...} }, pass dataKey = "trucks"
 * - If API response is { customers: { list: [...] }, pagination: {...} }, pass dataKey = "customers.list"
 *
 * This allows the hook to dynamically extract the correct array from the API response,
 * making it flexible for different API structures.
 */
ServerSideListFiltersProps<T> & {
  paginationType?: string;
  useUrlParams?: boolean;
}) => {
  const {ct} = useTranslation();

  const [serverSideComputedTotalPage, setServerSideComputedTotalPage] =
    useState(1);

  const [businessId, setBusinessId] = useQueryState('businessId', {
    defaultValue: '',
  });

  const [searchValue, setSearchValue] = useQueryState(
    'search',
    parseAsString.withDefault(FILTERS_CONFIG.search)
  );

  const [requestStatusValue, setRequestStatusValue] = useQueryState(
    'status',
    parseAsString.withDefault(ct(STATUS_OPTIONS).all.value)
  );

  const statusOptions = ct(STATUS_OPTIONS);

  const requestStatus: StatusOption = {
    value: requestStatusValue,
    label:
      (Object.values(statusOptions) as StatusOption[]).find(
        (option) => option.value === requestStatusValue
      )?.label || statusOptions.all.label,
  };

  const {
    PaginationComponent,
    pageOptions,
    getCurrentPageToken,
    updateNextToken,
    resetPaginationOptions,
  } = usePagination({
    listType,
    paginationType,
    useUrlParams,
    serverSideComputedTotalPage,
  });

  const {data, isLoading, error, message, statusCode, invalidateQuery} =
    queryToCall({
      params: {
        ...pageOptions,
        ...(businessId && {businessId}),
        ...(paginationType === PAGINATION_TYPES.cursorBased.value && {
          pageToken: getCurrentPageToken(),
        }),
        ...(paginationType === PAGINATION_TYPES.cursorBased.value && {
          pageToken: getCurrentPageToken(),
        }),
        ...(searchValue && {search: searchValue}),
        ...(requestStatus.value !== ct(STATUS_OPTIONS).all.value && {
          status: requestStatus.value,
        }),
        ...(paginationType === PAGINATION_TYPES.idBased.value &&
          (getCurrentPageToken() as IdBasedPaginationOptions)),
      },
    });

  // Update next token if available in response
  useEffect(() => {
    if (data?.pagination) {
      updateNextToken(data.pagination);
    }
  }, [data?.pagination, updateNextToken]);

  const getNestedValue = (obj: any, path: string): T[] => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) || [];
  };

  const list: T[] = dataKey ? getNestedValue(data, dataKey) : [];

  const pagination = data?.pagination || {};
  const {totalPages = 1} = pagination;

  useEffect(() => {
    setServerSideComputedTotalPage(totalPages);
  }, [totalPages]);

  const setFilters = useCallback(
    (updates: FilterProps) => {
      if ('searchValue' in updates) {
        setSearchValue(updates.searchValue as string);
      }
      if ('requestStatus' in updates) {
        const status = updates.requestStatus as RequestsStatus;
        setRequestStatusValue(status.value);
      }

      if ('businessId' in updates) {
        setBusinessId(updates.businessId as string);
      }

      resetPaginationOptions();
    },
    [
      setSearchValue,
      setRequestStatusValue,
      resetPaginationOptions,
      setBusinessId,
    ]
  );

  return {
    filteredData: list,
    PaginationComponent,
    filters: {
      pageOptions,
      businessId,
      searchValue,
      requestStatus,
    },
    isLoading,
    error,
    message,
    statusCode,
    resetPaginationOptions,
    invalidateQuery,
    setFilters,

    // resetFilters,
  };
};

export default useServerSideListFilters;
