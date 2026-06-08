import {useDispatch} from 'react-redux';
import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {HTTP_METHODS} from '@/shared/constants/httpMethods';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {actions} from '@/shared/redux/slices/users';
import {resetAllSlices} from '@/shared/utils/resetAllSlices';
import {getQueryClient} from '@/shared/utils/queryClient';
import {MutationCallbacks} from '@/shared/interfaces/hooks';
import {AppDispatch} from '@/shared/redux/store';
import {
  VEHICLES,
  USERS as USERS_API,
} from '@/shared/constants/reactQueryConstants';
import {showToast} from '@/shared/utils/toasts';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getRedirectUrl} from '@/shared/utils/auth';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';

const {POST, PATCH, DELETE} = HTTP_METHODS;

const getVehicleUploadErrorMessage = (error: any): string => {
  const status = error?.response?.status;
  const message = String(error?.message || '').toLowerCase();
  const rawServerMessage = String(error?.response?.data?.message || '').toLowerCase();
  const MAX_PER_IMAGE_MB = 5;
  const MAX_TOTAL_MB = 8;
  const MAX_IMAGE_COUNT = 9;

  if (status === 413 || message.includes('payload too large')) {
    return `Upload payload is too large. Max ${MAX_PER_IMAGE_MB} MB per image, max ${MAX_IMAGE_COUNT} images, and recommended total up to ${MAX_TOTAL_MB} MB.`;
  }

  if (
    message.includes('limit_file_size') ||
    message.includes('file too large') ||
    rawServerMessage.includes('file too large')
  ) {
    return `One or more images are too large. Max allowed per image is ${MAX_PER_IMAGE_MB} MB.`;
  }

  if (rawServerMessage.includes('maximum of 9 images')) {
    return 'You can upload a maximum of 9 images.';
  }

  if (rawServerMessage.includes('at least 3 images')) {
    return 'Please upload at least 3 images.';
  }

  if (error?.code === 'ERR_NETWORK' || message === 'network error') {
    return `Upload failed. This often happens when images are too large. Allowed: ${MAX_PER_IMAGE_MB} MB per image, up to ${MAX_IMAGE_COUNT} images, recommended total up to ${MAX_TOTAL_MB} MB.`;
  }

  return error?.message || 'Failed to upload vehicle. Please try again.';
};

export const useMutations = () => {
  const queryClient = getQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const router = useLocaleRouter();

  return {
    useAddNewVehicleMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.VEHICLES.ADD_VEHICLE,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message}) => {
            queryClient.invalidateQueries({
              queryKey: VEHICLES.fetchAllVehiclesList.queryKey,
            });
            console.log('Vehicle added successfully:', message);
            showToast({type: 'success', message});
          },
          onErrorAlways: (error: any) =>
            showToast({
              type: 'error',
              message: getVehicleUploadErrorMessage(error),
            }),
        },
      }),
      useUpdateVehicleMutation: ({
  vehicleId,
  callBackFuncs,
}: {
  vehicleId: string;
  callBackFuncs?: MutationCallbacks;
}) =>
  useMutationHandler({
    endpoint: API_ENDPOINTS.VEHICLES.UPDATE_VEHICLE({id: vehicleId}),
    method: PATCH,
    callBackFuncs: {
      ...callBackFuncs,

      onSuccessAlways: async (response: any) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: VEHICLES.fetchAllVehiclesList.queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: VEHICLES.fetchDeletedVehicles.queryKey,
          }),
        ]);

        showToast({
          type: 'success',
          message: response?.message || 'Vehicle updated successfully',
        });

        callBackFuncs?.onSuccessAlways?.(response);
      },

      onErrorAlways: (error: any) => {
        showToast({
          type: 'error',
          message:
            error?.response?.data?.message ||
            error?.message ||
            'Failed to update vehicle',
        });

        callBackFuncs?.onErrorAlways?.(error);
      },
    },
  }),
    useDeleteVehicleMutation: ({
  vehicleId,
  callBackFuncs,
}: {
  vehicleId: string;
  callBackFuncs?: MutationCallbacks;
}) =>
  useMutationHandler({
    endpoint: API_ENDPOINTS.VEHICLES.DELETE_VEHICLE({id: vehicleId}),
    method: DELETE,
    callBackFuncs: {
      ...callBackFuncs,

      onSuccessAlways: async (response: any) => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: VEHICLES.fetchAllVehiclesList.queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: VEHICLES.fetchDeletedVehicles.queryKey,
          }),
        ]);

        showToast({
          type: 'success',
          message: response?.message || 'Vehicle deleted successfully',
        });

        await callBackFuncs?.onSuccessAlways?.(response);
      },

      onErrorAlways: (error: any) => {
        showToast({
          type: 'error',
          message:
            error?.response?.data?.message ||
            error?.message ||
            'Failed to delete vehicle',
        });

        callBackFuncs?.onErrorAlways?.(error);
      },
    },
  }),
    useRestoreVehicleMutation: ({
      vehicleId,
      callBackFuncs,
    }: {
      vehicleId: string;
      callBackFuncs?: MutationCallbacks;
    }) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.VEHICLES.RESTORE_VEHICLE({id: vehicleId}),
        method: PATCH,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: async (response: any) => {
            await Promise.all([
              queryClient.invalidateQueries({
                queryKey: VEHICLES.fetchDeletedVehicles.queryKey,
              }),
              queryClient.invalidateQueries({
                queryKey: VEHICLES.fetchAllVehiclesList.queryKey,
              }),
            ]);
            showToast({
              type: 'success',
              message: response?.message || 'Vehicle restored successfully',
            });
            await callBackFuncs?.onSuccessAlways?.(response);
          },
          onErrorAlways: (error: any) => {
            showToast({
              type: 'error',
              message:
                error?.response?.data?.message ||
                error?.message ||
                'Failed to restore vehicle',
            });
            callBackFuncs?.onErrorAlways?.(error);
          },
        },
      }),
  };
};
