import {useDispatch} from 'react-redux';
import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {HTTP_METHODS} from '@/shared/constants/httpMethods';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {actions} from '@/shared/redux/slices/users';
import {resetAllSlices} from '@/shared/utils/resetAllSlices';
import {getQueryClient} from '@/shared/utils/queryClient';
import {MutationCallbacks} from '@/shared/interfaces/hooks';
import {AppDispatch} from '@/shared/redux/store';
import {USERS as USERS_API} from '@/shared/constants/reactQueryConstants';
import {showToast} from '@/shared/utils/toasts';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {getRedirectUrl} from '@/shared/utils/auth';
import {AUTH_ROUTES} from '@/shared/constants/PATHS';

const {USERS} = API_ENDPOINTS;
const {POST, PATCH} = HTTP_METHODS;

export const useMutations = () => {
  const queryClient = getQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const router = useLocaleRouter();

  return {
    useLoginMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.LOGIN,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data: {user}, message} = {}) => {
            if (user) {
              dispatch(actions.setCurrentUser(user));

              const url = getRedirectUrl({
                role: user.currentActiveOrganization.role,
              });

              router.push(url);
            }
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useSignupMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.SIGNUP,
        method: POST,
        callBackFuncs,
      }),

    useResetPasswordMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.RESET_PASSWORD,
        method: PATCH,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message} = {}) => {
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useResendVerificationMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.RESEND_VERIFICATION,
        method: POST,
        callBackFuncs,
      }),

    useVerifyUserMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.VERIFY,
        method: POST,
        callBackFuncs,
      }),

    useSendResetPasswordMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.SEND_RESET_PASSWORD,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useSignOutMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.LOGOUT,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message}) => {
            queryClient.removeQueries();
            dispatch(resetAllSlices());
            router.push(AUTH_ROUTES.login);
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useAddSellerMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.ADD_SELLER,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message}) => {
            queryClient.invalidateQueries({
              queryKey: [USERS_API.fetchAllSellersList.queryKey],
            });
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useUpdateSellerMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.UPDATE_SELLER,
        method: PATCH,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message}) => {
            queryClient.invalidateQueries({
              queryKey: [USERS_API.fetchAllSellersList.queryKey],
            });
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => {
            showToast({type: 'error', message});
          },
        },
      }),

    useUpdateProfileMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: USERS.UPDATE_PROFILE,
        method: PATCH,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data: {updatedUser}, message} = {}) => {
            if (updatedUser) dispatch(actions.setCurrentUser(updatedUser));
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) => showToast({type: 'error', message}),
        },
      }),
  };
};
