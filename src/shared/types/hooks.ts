import {UseQueryResult} from '@tanstack/react-query';
import {
  RequestFunctionParams,
  RequestFunctionResponse,
} from '../interfaces/hooks';

export type UseQueryHandlerResultType<TData> = UseQueryResult<
  TData,
  unknown
> & {
  data?: TData;
  error?: {type: string; [key: string]: any};
  message?: any;
  invalidateQuery: () => void;
};

export type RequestFunction = (
  params: RequestFunctionParams
) => Promise<RequestFunctionResponse>;
