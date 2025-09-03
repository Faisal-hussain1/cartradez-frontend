import {useQuery} from '@tanstack/react-query';
import {getRequest} from '@/shared/utils/requests';
import {
  DefaultQueryOptions,
  QueryRequestParams,
} from '@/shared/interfaces/hooks';
import {AxiosResponse} from 'axios';
import {UseQueryHandlerResultType} from '@/shared/types/hooks';
import {getQueryClient} from '@/shared/utils/queryClient';

const DEFAULT_QUERY_OPTIONS: DefaultQueryOptions<any> = {
  // **staleTime** - How long (in milliseconds) the data is considered "fresh."
  // During this time, React Query will NOT fetch new data, even if the component re-renders.
  // Setting this to `5 * 60 * 1000` (5 minutes) means queries won't refetch for 5 minutes unless manually triggered.
  staleTime: 5 * 60 * 1000, // **gcTime (previously cacheTime)** - How long (in milliseconds) unused/inactive queries stay in memory before being removed. // When a query becomes inactive (i.e., no components are using it), React Query will keep it in the cache for this duration. // After this time, if no component reuses the query, it will be deleted from memory.

  gcTime: 30 * 60 * 1000, // 30 minutes // **refetchOnWindowFocus** - Controls whether the query should automatically refetch when the user returns to the page (e.g., switching tabs). // `false` means the query won’t refetch on window focus. // This can be useful if you want data to remain unchanged when users switch between applications.

  refetchOnWindowFocus: false, // **refetchOnReconnect** - Determines if the query should refetch when the network is reconnected after being offline. // Setting it to `true` ensures that stale data is updated when the network connection is restored.

  refetchOnReconnect: true, // **refetchOnMount** - Determines if the query should refetch when the component using it is mounted. // `false` means React Query will not refetch when a component mounts if the data is still fresh. // If set to `true`, it will always fetch again when the component is mounted.

  refetchOnMount: false, // **retry** - Number of times React Query should retry a failed request before giving up. // Setting it to `2` means it will retry the request twice before throwing an error. // Useful for handling temporary network issues.

  retry: 2, // **retryDelay** - The delay (in milliseconds) before each retry attempt. // A function can be used to implement exponential backoff (delaying retries longer each time).

  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 30000), // Example: 1st retry after 1 sec, 2nd after 2 sec, 3rd after 4 sec, etc., up to 30 sec max. // **refetchInterval** - If set, React Query will automatically refetch data at this interval (in milliseconds). // If `false`, automatic polling is disabled. // Uncomment the next line if you want auto-refresh every 10 seconds: // refetchInterval: 10000, // **keepPreviousData** - If `true`, the old data remains visible while new data is being fetched. // This prevents flickering/loading spinners when pagination or filters change.

  keepPreviousData: true, // **placeholderData** - Temporary data shown while fetching. // It can be a function returning default placeholder values.

  placeholderData: undefined, // Can be set to a skeleton object or previous data if needed.
};

export const useQueryHandler = <TData = any>({
  queryKey,
  endpoint,
  isThirdParty = false,
  params,
  customQueryOptions = {},
  callbacks = {},
}: QueryRequestParams): UseQueryHandlerResultType<TData> => {
  const {onSuccessAlways, onErrorAlways, onSuccess, onError} = callbacks;
  const queryClient = getQueryClient();

  const query = useQuery<TData, unknown>({
    queryKey: params ? [queryKey, params] : [queryKey],
    queryFn: async () => {
      try {
        const response: AxiosResponse<any> = await getRequest({endpoint});

        if (isThirdParty) {
          onSuccessAlways?.(response.data);
          onSuccess?.(response.data);

          return response.data as TData;
        }

        const {body, ...rest} = response.data;
        const res = {data: body, ...rest};
        onSuccessAlways?.(res);
        onSuccess?.(res);

        return res as TData;
      } catch (error) {
        onErrorAlways?.(error);
        onError?.(error);
        throw error;
      }
    },
    ...DEFAULT_QUERY_OPTIONS,
    ...customQueryOptions,
  });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  const {data, error, ...rest} = query;

  return {
    ...data,
    ...(error ?? {}),
    ...rest,
    invalidateQuery,
  } as unknown as UseQueryHandlerResultType<TData>;
};
