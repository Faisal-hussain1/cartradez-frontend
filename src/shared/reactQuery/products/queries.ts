import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {PRODUCTS} from '@/shared/constants/reactQueryConstants';

export const useQueries = () => {
  return {
    // Function to fetch the logged-in user info

    useFetchAllProductList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: PRODUCTS.fetchAllProductsList.queryKey,
        endpoint: PRODUCTS.fetchAllProductsList.endpoint(params),
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

    // useFetchAllProductList: ({
    //   callBackFuncs,
    // }: {callBackFuncs?: QueryCallbacks} = {}) =>
    //   useQueryHandler({
    //     queryKey: PRODUCTS.fetchAllProductsList.queryKey,
    //     endpoint: PRODUCTS.fetchAllProductsList.endpoint,
    //     customQueryOptions: {
    //       gcTime: 0, // Disable cache time to always fetch fresh data
    //       refetchOnWindowFocus: true,
    //       refetchOnMount: true,
    //       staleTime: 0, // Disable stale time to always fetch fresh data
    //     },
    //     callbacks: {
    //       ...callBackFuncs,
    //       onSuccessAlways: ({
    //         // data,
    //         // statusCode,
    //         // message
    //       } = {}) => {},
    //       onErrorAlways: (
    //         {
    //           // error : {type},
    //           // message,
    //           // statusCode
    //         }
    //       ) => {},
    //     },
    //   }),
  };
};
