import {RootState} from '@/shared/redux/store';

export interface UseFilterListProps<T> {
  reduxSelector: (state: RootState) => T[]; // Replace 'any' with your actual state type
  listType?: {
    searchKey: string[];
    path: string;
  };
}

export interface UseFilterListResult<T> {
  filteredList: T[];
  setSearchValue: (value: string) => void;
}

export interface UpdateUrlParamsOptions {
  shallow?: boolean;
}

export interface UseManageURLStateResult {
  updateUrlParams: (
    newParams?: Record<string, string | number | boolean | undefined | null>,
    options?: UpdateUrlParamsOptions
  ) => void;
  getParamValue: (param: string) => string | null;
}

export interface PageOptions {
  pageNo: number;
  pageLimit: number;
  totalPages?: number;
  pageToken?: string;
}

export interface PaginationComponentProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  currentPage: number;
  totalPages: number;
  paginationType: string;
  hasNextPage?: boolean;
}

export interface UsePaginationProps {
  data: any[];
  listType: {
    page: PageOptions;
  };
  serverSideComputedTotalPage?: number;
  paginationType?: string;
}

export interface UsePromiseResult<T> {
  isLoading: boolean;
  data: T | null;
  error: any;
  executePromise: (params: {
    fn: () => Promise<T>;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
  }) => Promise<void>;
}

export interface UsePromiseCallbackProps<T> {
  fn: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export interface RequestParams {
  endpoint: string | ((params?: any) => string);
  method: string;
  isThirdParty?: boolean;
  callBackFuncs?: {
    onSuccessAlways?: (data: any) => void;
    onErrorAlways?: (error: any) => void;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  };
}

export interface MutationVariables {
  payload?: any;
  params?: any;
}

export interface ListType {
  search?: {
    keys: string[];
  };
  page: PageOptions;
}

export interface UseSearchListProps<T> {
  data?: T[];
  listType: ListType | null;
}

export interface SortOptions {
  sortBy: string | null;
  sortDir: string | null;
}

export interface UseSortListProps<T> {
  data?: T[];
}

export interface VerifyUserProps {
  token: string;
}

export interface VerifyUserResponse {
  isRequestPending: boolean;
  isTokenExpired: boolean;
  isUserVerified: boolean;
  tokenError: string | null;
  unVerifiedEmail: string;
}

export interface FilterUpdates {
  search?: string;
  sort?: Partial<SortOptions>;
  page?: Partial<PageOptions>;
}

export interface UseClientSideFilteredListsProps<T> {
  list: T[];
  listType: ListType;
}

export interface MutationCallbacks<T = any> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  onSuccessAlways?: (data?: T) => void;
  onErrorAlways?: (error?: any) => void;
}

export interface QueryRequestParams {
  queryKey: string;
  endpoint: string;
  isThirdParty?: boolean;
  params?: Record<string, any>;
  customQueryOptions?: any;
  callbacks?: {
    onSuccessAlways?: (data: any) => void;
    onErrorAlways?: (error: any) => void;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  };
}

export interface QueryCallbacks<T = any> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
  onSuccessAlways?: (data?: T) => void;
  onErrorAlways?: (error?: any) => void;
}

export interface DefaultQueryOptions<TData> {
  staleTime: number;
  gcTime: number;
  refetchOnWindowFocus: boolean;
  refetchOnReconnect: boolean;
  refetchOnMount: boolean;
  retry: number;
  retryDelay: (attemptIndex: number) => number;
  refetchInterval?: number | false;
  keepPreviousData: boolean;
  placeholderData: TData | undefined;
}

interface QueryToPrefetch {
  queryKey: string;
  endpoint: string | ((params: any) => string);
  activeServerSidePagination?: boolean;
}

export interface PrefetchQueriesParams {
  queriesToFetch?: QueryToPrefetch[];
}

export interface PaginationOptions {
  totalPages?: number;
  pageToken?: string;
  nextPageStartAfter?: string | null;
  hasMore?: boolean;
}

export interface QueryResponse<T> {
  data: {
    pagination?: PaginationOptions;
  } & Record<string, T[]>;
  isLoading?: boolean;
  error?: any;
  message?: string;
  statusCode?: number;
  invalidateQuery: () => void;
}

export interface ServerSideListFiltersProps<T> {
  listType: ListType;
  queryToCall: (params: {
    params?: {
      search?: string;
      sortDir?: string | null;
      sortBy?: string | null;
      pageNo?: number;
      pageLimit?: number;
      query?: string;
      nextPageStartAfter?: string | null;
    };
  }) => QueryResponse<T>;
  dataKey?: string;
}

export interface RequestFunctionParams {
  endpoint: string;
  payload?: any;
}

export interface RequestFunctionResponse {
  data: any;
  [key: string]: any;
}

export interface RefundConfirmationHookProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  toBeClosedByParent?: boolean;
}
