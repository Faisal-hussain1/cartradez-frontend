import {useMutationHandler} from '@/shared/hooks/reactQuery/useMutationHandler';
import {showToast} from '@/shared/utils/toasts';
import {API_ENDPOINTS} from '@/shared/constants/apiEndpoints';
import {BUSINESSES} from '@/shared/constants/reactQueryConstants';
import {getQueryClient} from '@/shared/utils/queryClient';
import {MutationCallbacks} from '@/shared/interfaces/hooks';
import {HTTP_METHODS} from '@/shared/constants/httpMethods';

export const useMutations = () => {
  const {PATCH} = HTTP_METHODS;
  const queryClient = getQueryClient();

  return {
    useUpdateEmailTemplateMutation: ({
      callBackFuncs,
    }: {callBackFuncs?: MutationCallbacks} = {}) =>
      useMutationHandler({
        endpoint: API_ENDPOINTS.EMAIL_TEMPLATE.UPDATE_EMAIL_TEMPLATE,
        method: PATCH,
        callBackFuncs: {
          ...callBackFuncs,
          onSuccessAlways: ({data, message}) => {
            queryClient.invalidateQueries({
              queryKey: [BUSINESSES.getBusinessesList.queryKey],
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
