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
  PRODUCTS,
  USERS as USERS_API,
} from '@/shared/constants/reactQueryConstants';
import {showToast} from '@/shared/utils/toasts';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getRedirectUrl} from '@/shared/utils/auth';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';

const {POST} = HTTP_METHODS;

export const useMutations = () => {
  const queryClient = getQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const router = useLocaleRouter();

  return {
    useAddNewProductMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.PRODUCTS.ADD_PRODUCT,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data, message}) => {
            queryClient.invalidateQueries({
              queryKey: [PRODUCTS.fetchAllProductsList.queryKey],
            });
            if (data) showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) =>
            showToast({
              type: 'error',
              message,
            }),
        },
      }),
  };
};
