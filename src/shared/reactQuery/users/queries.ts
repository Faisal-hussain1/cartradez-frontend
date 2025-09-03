import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {USERS} from '@/shared/constants/reactQueryConstants';

export const useQueries = () => {
  return {
    // Function to fetch the logged-in user info
    useFetchLoginUserInfo: ({
      callBackFuncs,
    }: {callBackFuncs?: QueryCallbacks} = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchLoginUserInfo.queryKey,
        endpoint: USERS.fetchLoginUserInfo.endpoint,
        customQueryOptions: {
          gcTime: 0, // Disable cache time to always fetch fresh data
          refetchOnWindowFocus: true,
          refetchOnMount: true,
          staleTime: 0, // Disable stale time to always fetch fresh data
        },
        callbacks: {
          ...callBackFuncs,
          onSuccessAlways: ({
            // data,
            // statusCode,
            // message
          } = {}) => {},
          onErrorAlways: (
            {
              // error : {type},
              // message,
              // statusCode
            }
          ) => {},
        },
      }),

    // Function to fetch the list of users
    useFetchAllUsersList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchAllUsersList.queryKey,
        endpoint: USERS.fetchAllUsersList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useFetchAllSellersList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchAllSellersList.queryKey,
        endpoint: USERS.fetchAllSellersList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetSellerByUsername: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.getSellerByUsername.queryKey,
        endpoint: USERS.getSellerByUsername.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetSellerBusinessBySlug: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.getSellerByBusinessSlug.queryKey,
        endpoint: USERS.getSellerByBusinessSlug.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: false,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetRefreshOnboardingLink: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.getRefreshOnboardingLink.queryKey,
        endpoint: USERS.getRefreshOnboardingLink.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),

    useGetSellerBankAccountDetails: ({
      callBackFuncs,
    }: {
      callBackFuncs?: QueryCallbacks;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.getSellerBankAccountDetails.queryKey,
        endpoint: USERS.getSellerBankAccountDetails.endpoint,
        customQueryOptions: {
          gcTime: 0, // Disable cache time to always fetch fresh data
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
  };
};
