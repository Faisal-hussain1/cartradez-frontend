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
  fetchAllSellersList: {
    queryKey: 'getSellersList',
    endpoint: (params: any) =>
      buildDynamicURL(API_ENDPOINTS.USERS.GET_SELLERS_LIST, params),
    activeServerSidePagination: true,
  },
  getSellerByUsername: {
    queryKey: 'getSellerByUsername',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.USERS.GET_SELLER({username: params.username}),
        params
      ),
    activeServerSidePagination: false,
  },
  getSellerByBusinessSlug: {
    queryKey: 'getSellerByBusinessSlug',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.BUSINESSES.GET_BUSINESS_BY_SELLER_USERNAME_AND_SLUG({
          username: params.username,
          businessSlug: params.businessSlug,
        }),
        params
      ),
    activeServerSidePagination: false,
  },
  getRefreshOnboardingLink: {
    queryKey: 'getRefreshOnboardingLink',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.USERS.REFRESH_ONBOARDING_LINK({
          sellerId: params.sellerId,
        }),
        params
      ),
    activeServerSidePagination: false,
  },

  getSellerBankAccountDetails: {
    queryKey: 'getSellerBankAccountDetails',
    endpoint: API_ENDPOINTS.USERS.GET_SELLER_BANK_ACCOUNT,
    activeServerSidePagination: false,
  },
};

export const PAYMENTS = {
  getPaymentIntentStatus: {
    queryKey: 'getPaymentIntentStatus',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.PAYMENTS.GET_PAYMENT_INTENT_STATUS({
          id: params.id,
          sellerConnectedAccountId: params.sellerConnectedAccountId,
        }),
        params
      ),
    activeServerSidePagination: false,
  },
};

export const TRANSACTIONS = {
  getTransactionsList: {
    queryKey: 'getTransactionsList',
    endpoint: (params: any) =>
      API_ENDPOINTS.TRANSACTIONS.GET_TRANSACTIONS_LIST({
        query: buildDynamicURL('', params),
      }),
    activeServerSidePagination: true,
  },
  getTransactionsListAfter30Seconds: {
    queryKey: 'getTransactionsListAfter30Seconds',
    endpoint: (params: any) =>
      API_ENDPOINTS.TRANSACTIONS.GET_TRANSACTIONS_LIST({
        query: buildDynamicURL('', params),
      }),
  },
};

export const BALANCES = {
  getTotalBalances: {
    queryKey: 'getTotalBalances',
    endpoint: API_ENDPOINTS.BALANCES.GET_TOTAL_BALANCES,
  },
  getTotalEarningsList: {
    queryKey: 'getTotalEarningsList',
    endpoint: (params: any) =>
      API_ENDPOINTS.BALANCES.GET_TOTAL_EARNINGS_LIST({
        query: buildDynamicURL('', params),
      }),
    activeServerSidePagination: false,
  },
};

export const PAYOUTS = {
  getPayoutsList: {
    queryKey: 'getPayoutsList',
    endpoint: (params: any) =>
      API_ENDPOINTS.PAYOUTS.GET_PAYOUTS_LIST({
        query: buildDynamicURL('', params),
      }),

    activeServerSidePagination: true,
  },
};

export const EMPLOYEES = {
  getEmployeesList: {
    queryKey: 'getEmployeesList',
    endpoint: (params: any) =>
      API_ENDPOINTS.EMPLOYEES.GET_EMPLOYEES_LIST({
        query: buildDynamicURL('', params),
      }),
    activeServerSidePagination: true,
  },
};

export const BUSINESSES = {
  getBusinessesList: {
    queryKey: 'businessesList',
    endpoint: (params: any) =>
      buildDynamicURL(API_ENDPOINTS.BUSINESSES.GET_BUSINESSES_LIST, params),
    activeServerSidePagination: true,
  },
  getSingleBusiness: {
    queryKey: 'business',
    endpoint: ({id}: {id: string}) =>
      API_ENDPOINTS.BUSINESSES.GET_SINGLE_BUSINESS({id}),
  },
};

export const CHECKBOOK = {
  getCheckbookContactsList: {
    queryKey: 'getCheckbookContactsList',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.CHECKBOOK.GET_CHECKBOOK_CONTACTS_LIST,
        params
      ),
    activeServerSidePagination: true,
  },

  getCheckbookBalances: {
    queryKey: 'getCheckbookBalances',
    endpoint: API_ENDPOINTS.CHECKBOOK.GET_CHECKBOOK_BALANCES,
    activeServerSidePagination: false,
  },

  getCheckbookRequestsList: {
    queryKey: 'getCheckbookRequestsList',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.CHECKBOOK.GET_CHECKBOOK_REQUESTS_LIST,
        params
      ),
    activeServerSidePagination: true,
  },
  getCheckbookTransfersList: {
    queryKey: 'getCheckbookTransfersList',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.CHECKBOOK.GET_CHECKBOOK_TRANSFERS_LIST,
        params
      ),
    activeServerSidePagination: true,
  },
  getCheckbookPaymentInfo: {
    queryKey: 'getCheckbookPaymentInfo',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.CHECKBOOK.GET_CHECKBOOK_PAYMENT_INFO,
        params
      ),
    activeServerSidePagination: false,
  },
};
