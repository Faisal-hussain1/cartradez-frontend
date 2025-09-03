import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {CHECKBOOK} from '@/shared/constants/reactQueryConstants';

export const useQueries = () => {
  return {
    useGetCheckbookContacts: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: CHECKBOOK.getCheckbookContactsList.queryKey,
        endpoint: CHECKBOOK.getCheckbookContactsList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
          gcTime: 0,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetCheckbookBalances: ({
      callBackFuncs,
    }: {
      callBackFuncs?: QueryCallbacks;
    } = {}) =>
      useQueryHandler({
        queryKey: CHECKBOOK.getCheckbookBalances.queryKey,
        endpoint: CHECKBOOK.getCheckbookBalances.endpoint,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
    useGetCheckbookRequests: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: CHECKBOOK.getCheckbookRequestsList.queryKey,
        endpoint: CHECKBOOK.getCheckbookRequestsList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
          gcTime: 0,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
    useGetCheckbookTransfers: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: CHECKBOOK.getCheckbookTransfersList.queryKey,
        endpoint: CHECKBOOK.getCheckbookTransfersList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetCheckBookPaymentInfo: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: CHECKBOOK.getCheckbookPaymentInfo.queryKey,
        endpoint: CHECKBOOK.getCheckbookPaymentInfo.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
  };
};
