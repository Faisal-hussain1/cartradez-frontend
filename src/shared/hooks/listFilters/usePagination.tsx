import {useMemo, useCallback, useState, useEffect} from 'react';
import Pagination from '@/shared/components/common/pagination';
import {PaginationOptions, UsePaginationProps} from '@/shared/interfaces/hooks';
import {FILTERS_CONFIG} from '@/shared/constants/reactQueryConstants';
import {parseAsInteger, useQueryStates} from 'nuqs';
import {PAGINATION_TYPES} from '@/shared/constants/general';
import {IdBasedPaginationOptions} from '@/shared/types/utils';

const usePagination = ({
  data = [],
  listType,
  paginationType = PAGINATION_TYPES.pageBased.value,
  useUrlParams = true,
  serverSideComputedTotalPage,
}: Omit<UsePaginationProps, 'data'> & {
  data?: any[];
  useUrlParams?: boolean;
}) => {
  const initialPageNo = listType.page.pageNo || FILTERS_CONFIG.pageNo;
  const initialPagelimit = listType.page.pageLimit || FILTERS_CONFIG.pageLimit;

  const isIdBasedPagination = paginationType === PAGINATION_TYPES.idBased.value;

  const isCursorBasedPagination =
    paginationType === PAGINATION_TYPES.cursorBased.value;

  // Store previous tokens for cursor-based pagination || id based pagination
  const initialTokenData = isIdBasedPagination
    ? [
        {
          nextPageStartAfter: null,
          hasMore: false,
        },
      ]
    : [null];

  const [tokensArray, setTokensArray] =
    useState<(string | null | IdBasedPaginationOptions)[]>(initialTokenData);

  const [urlPageOptions, setUrlPageOptions] = useQueryStates(
    {
      pageNo: parseAsInteger.withDefault(initialPageNo),
      pageLimit: parseAsInteger.withDefault(initialPagelimit),
    },
    {
      clearOnDefault: false,
    }
  );

  const [localPageOptions, setLocalPageOptions] = useState({
    pageNo: initialPageNo,
    pageLimit: initialPagelimit,
  });

  const pageOptions = useUrlParams ? urlPageOptions : localPageOptions;
  const setPageOptions = useUrlParams ? setUrlPageOptions : setLocalPageOptions;

  const totalItems = data.length ? data.length : 0;

  const totalPages = data.length
    ? Math.ceil(totalItems / pageOptions.pageLimit)
    : serverSideComputedTotalPage || 0;

  useEffect(() => {
    if (!serverSideComputedTotalPage && totalPages < pageOptions.pageNo) {
      setPageOptions({
        pageLimit: initialPagelimit,
        pageNo: initialPageNo,
      });
    }
  }, [
    totalPages,
    pageOptions.pageNo,
    serverSideComputedTotalPage,
    setPageOptions,
    initialPageNo,
    initialPagelimit,
  ]);

  const paginatedList = useMemo(() => {
    if (!data.length) return [];

    // For page-based pagination, slice the data
    if (paginationType === PAGINATION_TYPES.pageBased.value) {
      return data.slice(
        (pageOptions.pageNo - 1) * pageOptions.pageLimit,
        pageOptions.pageNo * pageOptions.pageLimit
      );
    }

    // For cursor-based pagination, return all data as it's already filtered by the backend
    return data;
  }, [data, pageOptions, paginationType]);

  const goToNextPage = useCallback(() => {
    setPageOptions((prev) => ({
      ...prev,
      pageNo: prev.pageNo + 1,
    }));
  }, [setPageOptions]);

  const goToPreviousPage = useCallback(() => {
    setPageOptions((prev) => ({
      ...prev,
      pageNo: Math.max(prev.pageNo - 1, 1),
    }));
  }, [setPageOptions]);

  const resetPaginationOptions = useCallback(() => {
    setTokensArray([null]);
    setPageOptions({
      pageNo: initialPageNo,
      pageLimit: initialPagelimit,
    });
  }, [setPageOptions, initialPageNo, initialPagelimit]);

  // Get the current pageToken for API calls
  const getCurrentPageToken = useCallback(() => {
    if (isCursorBasedPagination || isIdBasedPagination) {
      return tokensArray[pageOptions.pageNo - 1];
    }
  }, [
    pageOptions.pageNo,
    tokensArray,
    isIdBasedPagination,
    isCursorBasedPagination,
  ]);

  // Update next token from API response
  const updateNextToken = useCallback(
    (paginationData: PaginationOptions) => {
      setTokensArray((prev) => {
        const newArray = [...prev];

        if (isIdBasedPagination) {
          // In case of id-based pagination, we expect token to have nextPageStartAfter and hasMore
          newArray[pageOptions.pageNo] = {
            nextPageStartAfter: paginationData.nextPageStartAfter ?? null,
            hasMore: paginationData.hasMore ?? false,
          };
        } else {
          // For cursor-based, we just store the pageToken
          newArray[pageOptions.pageNo] = paginationData.pageToken ?? null;
        }

        return newArray;
      });
    },
    [pageOptions.pageNo, isIdBasedPagination]
  );

  // Determine if there is a next page based on the pagination type and token state
  const hasNextPage = useMemo(() => {
    if (isIdBasedPagination) {
      // In ID-based pagination, check the `hasMore` flag from the stored pagination token object
      const currentToken = tokensArray[
        pageOptions.pageNo
      ] as IdBasedPaginationOptions;

      return Boolean(currentToken?.hasMore);
    }

    // In cursor-based pagination, a non-null token for the next page means more pages are available
    return tokensArray[pageOptions.pageNo] !== null;
  }, [isIdBasedPagination, tokensArray, pageOptions.pageNo]);

  return {
    paginatedList,
    pageOptions,
    updatePageOptions: setPageOptions,
    resetPaginationOptions,
    getCurrentPageToken,
    updateNextToken,
    PaginationComponent: (
      <Pagination
        handleNextPage={goToNextPage}
        handlePreviousPage={goToPreviousPage}
        currentPage={pageOptions.pageNo}
        totalPages={totalPages}
        paginationType={paginationType}
        hasNextPage={hasNextPage}
      />
    ),
  };
};

export default usePagination;
