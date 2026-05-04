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

const {POST} = HTTP_METHODS;

const getVehicleUploadErrorMessage = (error: any): string => {
  const status = error?.response?.status;
  const message = String(error?.message || '').toLowerCase();
  const rawServerMessage = String(error?.response?.data?.message || '').toLowerCase();

  if (status === 413 || message.includes('payload too large')) {
    return 'Upload size is too large. Please upload fewer images or compress them and try again.';
  }

  if (
    message.includes('limit_file_size') ||
    message.includes('file too large') ||
    rawServerMessage.includes('file too large')
  ) {
    return 'One or more images are too large. Each image must be 5 MB or smaller.';
  }

  if (rawServerMessage.includes('maximum of 9 images')) {
    return 'You can upload a maximum of 9 images.';
  }

  if (rawServerMessage.includes('at least 3 images')) {
    return 'Please upload at least 3 images.';
  }

  if (error?.code === 'ERR_NETWORK' || message === 'network error') {
    return 'Upload failed due to network/server connection. Please check internet and try again with fewer or smaller images.';
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
              queryKey: [VEHICLES.fetchAllVehiclesList.queryKey],
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
  };
};
