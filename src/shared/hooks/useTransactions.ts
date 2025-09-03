import {useEffect, useRef} from 'react';
import {LIST_TYPES, PAGINATION_TYPES} from '@/shared/constants/general';
import {transactionsQueries} from '@/shared/reactQuery';
import {TransactionType} from '@/shared/types/sellers';
import useServerSideListFilters from './listFilters/useServerSideListFilters';
import {useSelector} from 'react-redux';
import {getDefaultBusinessId} from '../redux/slices/defaultBusiness';

export const useTransactions = () => {
  const businessId = useSelector(getDefaultBusinessId);

  const {useGetTransactionsList, useGetTransactionsListAfter30Seconds} =
    transactionsQueries();
  const isLatestTransactionFetchedRef = useRef(false);

  const firstTransactionRef = useRef<{
    transactionTimestamp: number | null;
  }>({
    transactionTimestamp: null,
  });

  const {
    filteredData,
    PaginationComponent,
    isLoading,
    resetPaginationOptions,
    filters,
    setFilters,
    invalidateQuery: invalidateTransactionsQuery,
  } = useServerSideListFilters<TransactionType>({
    listType: LIST_TYPES.transactions,
    queryToCall: useGetTransactionsList,
    dataKey: 'transactions',
    paginationType: PAGINATION_TYPES.cursorBased.value,
    useUrlParams: false,
  });

  useEffect(() => {
    if (filters.businessId !== businessId) {
      setFilters({businessId});
    }
  }, [setFilters, businessId, filters.businessId]);

  useGetTransactionsListAfter30Seconds({
    params: {
      pageNo: LIST_TYPES.transactions.page.pageNo,
      pageLimit: LIST_TYPES.transactions.page.pageLimit,
      businessId: filters.businessId,
    },
    callBackFuncs: {
      onSuccess: ({data}) => {
        if (data) {
          const {transactions} = data;

          if (transactions && transactions.length > 0) {
            const firstTransaction = transactions[0];

            if (
              firstTransactionRef.current.transactionTimestamp !==
              firstTransaction.transactionTimestamp
            ) {
              firstTransactionRef.current = {
                transactionTimestamp: firstTransaction.transactionTimestamp,
              };

              // New transaction detected, play sound
              const audio = new Audio('/audio/notification.mp3');
              audio.play();

              if (filters.pageOptions.pageNo !== 1) {
                isLatestTransactionFetchedRef.current = true;
              } else {
                // if page is 1 then fetch latest data
                invalidateTransactionsQuery();
              }
            }
          }
        }
      },
    },
  });

  const viewLatestTransactions = async () => {
    resetPaginationOptions();
    invalidateTransactionsQuery();
    isLatestTransactionFetchedRef.current = false;
  };

  return {
    filteredData,
    PaginationComponent,
    isLoading,
    hasNewTransactions: isLatestTransactionFetchedRef.current,
    viewLatestTransactions,
    setFilters,
    filters,
    resetPaginationOptions,
  };
};
