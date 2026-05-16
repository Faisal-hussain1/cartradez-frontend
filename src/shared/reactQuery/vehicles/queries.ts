import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {QueryCallbacks, MutationCallbacks} from '@/shared/interfaces/hooks';
import {VEHICLES} from '@/shared/constants/reactQueryConstants';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {getQueryClient} from '@/shared/utils/queryClient';
import {showToast} from '@/shared/utils/toasts';

const buildVehicleListQueryKey = (baseKey: string, params?: Record<string, any>) => [
  baseKey,
  params?.pageNo ?? 1,
  params?.pageLimit ?? 10,
  params?.activeOnly ?? null,
  params?.prioritizeListingType ?? null,
  params?.creatorId ?? null,
  params?.listingType ?? null,
  params?.startDate ?? null,
  params?.endDate ?? null,
  params?.search ?? null,
];

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const useFetchAllVehicleList = ({
  callBackFuncs,
  params,
}: {
  callBackFuncs?: QueryCallbacks;
  params?: any;
} = {}) =>
  useQueryHandler({
    queryKey: buildVehicleListQueryKey(
      VEHICLES.fetchAllVehiclesList.queryKey,
      params,
    ),
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
  });

export const useFetchVehiclesByUserId = ({
  callBackFuncs,
  params,
}: {
  callBackFuncs?: QueryCallbacks;
  params?: {userId: string; page?: number; limit?: number};
} = {}) =>
  useQueryHandler({
    queryKey: params?.userId
      ? [...VEHICLES.fetchVehiclesByUserId.queryKey, params.userId]
      : VEHICLES.fetchVehiclesByUserId.queryKey,
    endpoint: VEHICLES.fetchVehiclesByUserId.endpoint(params || {userId: ''}),
    params,
    customQueryOptions: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      gcTime: 0,
      enabled: !!params?.userId,
    },
    callbacks: {
      ...callBackFuncs,
    },
  });

export const useFetchAllCartradezVehicleList = ({
  callBackFuncs,
  params,
}: {
  callBackFuncs?: QueryCallbacks;
  params?: any;
} = {}) =>
  useQueryHandler({
    queryKey: buildVehicleListQueryKey(
      VEHICLES.fetchAllCartradezVehiclesList.queryKey,
      params,
    ),
    endpoint: VEHICLES.fetchAllCartradezVehiclesList.endpoint(params),
    params,
    customQueryOptions: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      gcTime: 0,
    },
    callbacks: {
      ...callBackFuncs,
    },
  });

export const useFetchActiveListingsCount = ({
  callBackFuncs,
}: {
  callBackFuncs?: QueryCallbacks;
} = {}) =>
  useQueryHandler({
    queryKey: VEHICLES.fetchActiveListingsCount.queryKey,
    endpoint: VEHICLES.fetchActiveListingsCount.endpoint,
    customQueryOptions: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      gcTime: 0,
    },
    callbacks: {
      ...callBackFuncs,
    },
  });

export const useFetchVehicleById = ({
  callBackFuncs,
  params,
}: {
  callBackFuncs?: QueryCallbacks;
  params?: any;
} = {}) =>
  useQueryHandler({
    queryKey: VEHICLES.fetchVehicleById.queryKey(params?.vehicleId),
    endpoint: VEHICLES.fetchVehicleById.endpoint(params),
    params,
    customQueryOptions: {
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: true,
      enabled: !!params?.vehicleId,
    },
    callbacks: {
      ...callBackFuncs,
    },
  });

// ---------------------------------------------------------------------------
// Mutations
//
// ROOT CAUSE of delete not working:
//   useMutationHandler expects a static `endpoint` string + `callBackFuncs`.
//   The previous version passed a factory function as `endpoint` and used
//   `callbacks` (wrong key) instead of `callBackFuncs`. Compare with the
//   working useAddNewVehicleMutation — it passes a plain string endpoint and
//   uses `callBackFuncs`. We match that pattern exactly here.
//
//   Because the endpoint must be a static string (not a function), vehicleId
//   is accepted as a hook argument and baked into the URL at call time.
// ---------------------------------------------------------------------------

export const useUpdateVehicle = ({
  callBackFuncs,
  vehicleId,
}: {
  callBackFuncs?: MutationCallbacks;
  vehicleId: string;
} = {vehicleId: ''}) => {
  const queryClient = getQueryClient();

  return useMutationHandler({
    // Static string — vehicleId is known when the hook is called
    endpoint: API_ENDPOINTS.VEHICLES.UPDATE_VEHICLE({id: vehicleId}),
    method: 'PATCH',
    callBackFuncs: {
      onSuccessAlways: ({message}: {message: string}) => {
        queryClient.invalidateQueries({
          queryKey: VEHICLES.fetchVehiclesByUserId.queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: VEHICLES.fetchVehicleById.queryKey(vehicleId),
        });
        showToast({
          type: 'success',
          message: message ?? 'Vehicle updated successfully',
        });
        callBackFuncs?.onSuccessAlways?.({message});
      },
      onErrorAlways: (error: any) => {
        showToast({
          type: 'error',
          message: error?.message ?? 'Failed to update vehicle. Please try again.',
        });
        callBackFuncs?.onErrorAlways?.(error);
      },
    },
  });
};

export const useDeleteVehicle = ({
  callBackFuncs,
  vehicleId,
}: {
  callBackFuncs?: MutationCallbacks;
  vehicleId: string;
} = {vehicleId: ''}) => {
  const queryClient = getQueryClient();

  return useMutationHandler({
    // Static string — vehicleId is known when the hook is called
    endpoint: API_ENDPOINTS.VEHICLES.DELETE_VEHICLE({id: vehicleId}),
    method: 'DELETE',
    callBackFuncs: {
      onSuccessAlways: ({message}: {message: string}) => {
        queryClient.invalidateQueries({
          queryKey: VEHICLES.fetchVehiclesByUserId.queryKey,
        });
        queryClient.invalidateQueries({
          queryKey: [VEHICLES.fetchAllVehiclesList.queryKey],
        });
        showToast({
          type: 'success',
          message: message ?? 'Vehicle deleted successfully',
        });
        callBackFuncs?.onSuccessAlways?.({message});
      },
      onErrorAlways: (error: any) => {
        showToast({
          type: 'error',
          message: error?.message ?? 'Failed to delete vehicle. Please try again.',
        });
        callBackFuncs?.onErrorAlways?.(error);
      },
    },
  });
};

// ---------------------------------------------------------------------------
// Factory wrappers (backward compat)
// ---------------------------------------------------------------------------
export const useQueries = () => ({
  useFetchAllVehicleList,
  useFetchVehiclesByUserId,
  useFetchAllCartradezVehicleList,
  useFetchActiveListingsCount,
  useFetchVehicleById,
});

export const useMutations = () => ({
  useUpdateVehicle,
  useDeleteVehicle,
});
