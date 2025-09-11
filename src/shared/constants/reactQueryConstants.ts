import {buildDynamicURL} from '@/shared/utils/buildDynamicURL';
import {API_ENDPOINTS} from './apiEndpoints';

export const FILTERS_CONFIG = {
  pageNo: 1,
  pageLimit: 10,
  search: '',
  sortBy: '',
  sortDir: '',
  startDate: '',
  endDate: '',
};

export const USERS = {
  fetchLoginUserInfo: {
    queryKey: 'getLoginUser',
    endpoint: API_ENDPOINTS.USERS.GET_LOGIN_USER,
  },
  fetchAllUsersList: {
    queryKey: 'getUsersList',
    endpoint: (params: any) =>
      buildDynamicURL(API_ENDPOINTS.USERS.GET_USERS_LIST, params),
    activeServerSidePagination: true,
  },
};

export const PRODUCTS = {
  fetchAllProductsList: {
    queryKey: 'getAllProducts',
    endpoint: (params: any) =>
      buildDynamicURL(API_ENDPOINTS.PRODUCTS.GET_PRODUCTS_LIST, params),
  },
};
