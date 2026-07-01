import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import translationUtilsValues from './translationsUtils';
import {store} from '@/shared/redux/store';
import {resetAllSlices} from './resetAllSlices';
import {getQueryClient, invalidateQueries} from './queryClient';
import {RequestParams, ServerRequestParams} from '@/shared/interfaces/utils';
import {GENERAL_ERRORS_TYPES} from '@/shared/constants/responses/errors/general';
import {normalizeError, getErrorMessage} from './errorMessage';
import {actions} from '@/shared/redux/slices/users';
import {clearAuthSession} from './auth';

export const API_SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

// Create axios instance
const request = axios.create({
  baseURL: API_SERVER_URL,

  // withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const responseMessage = String(error?.response?.data?.message || '');

    const isBlockedResponse =
      error?.response?.status === 403 &&
      responseMessage.toLowerCase().includes('account has been blocked');

    if (isBlockedResponse) {
      const currentUser = store.getState()?.users?.currentUser;
      const reasonMarker = 'Reason:';
      const reasonIndex = responseMessage.indexOf(reasonMarker);

      const blockReason =
        reasonIndex >= 0
          ? responseMessage.slice(reasonIndex + reasonMarker.length).trim()
          : null;

      if (currentUser?._id && !currentUser.isBlocked) {
        store.dispatch(
          actions.setCurrentUser({
            ...currentUser,
            isBlocked: true,
            blockReason,
          })
        );
      }
      getQueryClient().cancelQueries();
    }

    if (
      error?.response?.data?.error?.type ===
      GENERAL_ERRORS_TYPES.invalidToken.value
    ) {
      clearAuthSession();
      store.dispatch(resetAllSlices());
      invalidateQueries();
    }

    const {t} = await translationUtilsValues();
    const normalizedError = normalizeError(error, t('errorResponse.message'));

    return Promise.reject(normalizedError);
  }
);
request.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Post request Call
export const postRequest = async <T, R = AxiosResponse<T>>({
  endpoint,
  payload,
}: RequestParams): Promise<R> => {
  const response: R = await request.post(endpoint, payload);

  return response;
};

// Get request Call
export const getRequest = async <T, R = AxiosResponse<T>>({
  endpoint,
  signal,
}: RequestParams): Promise<R> => {
  const response: R = await request.get(endpoint, {signal});

  return response;
};

// Put request Call
export const putRequest = async <T, R = AxiosResponse<T>>({
  endpoint,
  payload,
}: RequestParams): Promise<R> => {
  const response: R = await request.put(endpoint, payload);

  return response;
};

// Patch request Call
export const patchRequest = async <T, R = AxiosResponse<T>>({
  endpoint,
  payload,
}: RequestParams): Promise<R> => {
  const response: R = await request.patch(endpoint, payload);

  return response;
};

// Delete Request Call
export const deleteRequest = async <T, R = AxiosResponse<T>>({
  endpoint,
}: RequestParams): Promise<R> => {
  const response: R = await request.delete(endpoint);

  return response;
};

export async function getServerRequest<T = any>({
  endpoint,
  cookieHeader,
}: ServerRequestParams): Promise<AxiosResponse<T>> {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieHeader, // Always pass the cookie header
      },
    };

    const response: AxiosResponse<T> = await request.get(endpoint, config);

    return response;
  } catch (error: any) {
    throw normalizeError(error, getErrorMessage(error, 'Failed to fetch'));
  }
}
