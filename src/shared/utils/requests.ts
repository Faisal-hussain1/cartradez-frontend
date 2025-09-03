import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import translationUtilsValues from './translationsUtils';
import {store} from '@/shared/redux/store';
import {resetAllSlices} from './resetAllSlices';
import {invalidateQueries} from './queryClient';
import {RequestParams, ServerRequestParams} from '@/shared/interfaces/utils';
import {GENERAL_ERRORS_TYPES} from '@/shared/constants/responses/errors/general';

export const API_SERVER_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

// Create axios instance
const request = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.data?.error?.type ===
      GENERAL_ERRORS_TYPES.invalidToken.value
    ) {
      store.dispatch(resetAllSlices());
      invalidateQueries();
    }
    const {t} = await translationUtilsValues();
    const errorMessage = error?.response?.data || t('errorResponse.message');

    return Promise.reject(errorMessage);
  }
);

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
}: RequestParams): Promise<R> => {
  const response: R = await request.get(endpoint);

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
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('Failed to fetch');
    }
  }
}
