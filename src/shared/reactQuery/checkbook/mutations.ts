import {useDispatch} from 'react-redux';
import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {HTTP_METHODS} from '@/shared/constants/httpMethods';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {MutationCallbacks} from '@/shared/interfaces/hooks';
import {showToast} from '@/shared/utils/toasts';
import {getQueryClient} from '@/shared/utils/queryClient';
import {CHECKBOOK, USERS} from '@/shared/constants/reactQueryConstants';
import {AppDispatch} from '@/shared/redux/store';
import {actions} from '@/shared/redux/slices/users';

const {POST} = HTTP_METHODS;

export const useMutations = () => {
  const queryClient = getQueryClient();

  const dispatch = useDispatch<AppDispatch>();

  return {
    useAddNewPaymentMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.CHECKBOOK.MAKE_NEW_PAYMENT_REQUEST,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data, message}) => {
            queryClient.invalidateQueries({
              queryKey: [CHECKBOOK.getCheckbookContactsList.queryKey],
            });
            queryClient.invalidateQueries({
              queryKey: [CHECKBOOK.getCheckbookRequestsList.queryKey],
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

    useCreateCheckbookAccountMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.CHECKBOOK.CREATE_CHECKBOOK_ACCOUNT,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data}) => {
            if (data) {
              dispatch(actions.updateCheckbookAccount(data.account));
            }
          },
          onErrorAlways: ({message}) =>
            showToast({
              type: 'error',
              message,
            }),
        },
      }),

    useCreateCheckbookWalletMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.CHECKBOOK.CREATE_CHECKBOOK_WALLET,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message, data}) => {
            if (data) {
              dispatch(actions.addUserWallet(data.wallet));
              queryClient.invalidateQueries({
                queryKey: [USERS.fetchLoginUserInfo.queryKey],
              });
            }
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) =>
            showToast({
              type: 'error',
              message,
            }),
        },
      }),

    useApproveAndRejectCheckbookRequestMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.CHECKBOOK.APPROVE_AND_REJECT_CHECKBOOK_REQUEST,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({message}) => {
            queryClient.invalidateQueries({
              queryKey: [CHECKBOOK.getCheckbookRequestsList.queryKey],
            });
            queryClient.invalidateQueries({
              queryKey: [CHECKBOOK.getCheckbookBalances.queryKey],
              refetchType: 'all',
            });
            showToast({type: 'success', message});
          },
          onErrorAlways: ({message}) =>
            showToast({
              type: 'error',
              message,
            }),
        },
      }),

    useAddNewContactMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.CHECKBOOK.MAKE_NEW_CHECKBOOK_CONTACT,
        method: POST,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data, message}) => {
            queryClient.invalidateQueries({
              queryKey: [CHECKBOOK.getCheckbookContactsList.queryKey],
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
