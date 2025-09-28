import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {VEHICLES} from '@/shared/constants/reactQueryConstants';

export const useQueries = () => {
  return {
    useFetchAllVehicleList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: VEHICLES.fetchAllVehiclesList.queryKey,
        endpoint: VEHICLES.fetchAllVehiclesList.endpoint(params),
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

    useFetchVehicleById: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: VEHICLES.fetchVehicleById.queryKey,
        endpoint: VEHICLES.fetchVehicleById.endpoint(params),
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
