export const API_ENDPOINTS = {
  USERS: {
    LOGIN: '/users/login',
    SIGNUP: '/users/signup',
    RESEND_VERIFICATION: '/users/verify/refresh',
    VERIFY: ({token}: {token: string}) => `/users/verify/new/${token}`,
    SEND_RESET_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: ({token}: {token: string}) => `/users/reset/${token}`,
    LOGOUT: '/users/logout',
    GET_USERS_LIST: '/users/',
    GET_LOGIN_USER: '/users/me',
    ADD_SELLER: '/users/sellers',
    UPDATE_SELLER: ({id}: {id: string}) => `/users/sellers/${id}`,
    GET_SELLERS_LIST: '/users/sellers',
    GET_SELLER: ({username}: {username: string}) =>
      `/users/sellers/${username}`,
    REFRESH_ONBOARDING_LINK: ({sellerId}: {sellerId: string}) =>
      `/users/refresh-onboarding-link/${sellerId}`,
    UPDATE_PROFILE: '/users/profile',
    GET_SELLER_BANK_ACCOUNT: '/users/sellers/bank-account',
  },
  PAYMENTS: {
    CREATE_PAYMENT: ({id}: {id: string}) => `/payments/${id}`,
    CREATE_PAYMENT_INTENT: () => `/payments/intent`,
    UPDATE_PAYMENT_INTENT_CUSTOMER: ({id}: {id: string}) =>
      `/payments/customer/${id}`,
    UPDATE_PAYMENT_INTENT_AMOUNT: ({id}: {id: string}) =>
      `/payments/amount/${id}`,
    GET_PAYMENT_INTENT_STATUS: ({
      id,
      sellerConnectedAccountId,
    }: {
      id: string;
      sellerConnectedAccountId: string;
    }) => `/payments/status/${id}/${sellerConnectedAccountId}`,
  },
  TRANSACTIONS: {
    GET_TRANSACTIONS_LIST: ({query}: {query: string}) =>
      `/transactions${query}`,
    MARK_ORDER_FULFILLED: ({id}: {id: string}) =>
      `/transactions/fulfilled/${id}`,
    REFUND_TRANSACTION: ({id}: {id: string}) => `/transactions/refund/${id}`,
  },
  BALANCES: {
    GET_TOTAL_BALANCES: '/balances',
    GET_TOTAL_EARNINGS_LIST: ({query}: {query: string}) =>
      `/balances/earnings${query}`,
  },
  PAYOUTS: {
    GET_PAYOUTS_LIST: ({query}: {query: string}) => `/payouts${query}`,
  },

  EMPLOYEES: {
    GET_EMPLOYEES_LIST: ({query}: {query: string}) =>
      `/users/employees${query}`,
    ADD_EMPLOYEE: '/users/employees',
    UPDATE_EMPLOYEE: ({id}: {id: string}) => `/users/employees/${id}`,
    DELETE_EMPLOYEE: ({id}: {id: string}) => `/users/employees/${id}`,
  },
  BUSINESSES: {
    CREATE_BUSINESS: '/businesses',
    GET_BUSINESSES_LIST: '/businesses',
    GET_SINGLE_BUSINESS: ({id}: {id: string}) => `/businesses/${id}`,
    DELETE_BUSINESS: ({id}: {id: string}) => `/businesses/${id}`,
    UPDATE_BUSINESS: ({id}: {id: string}) => `/businesses/${id}`,
    UPDATE_BUSINESS_STATUS: ({id}: {id: string}) =>
      `/businesses/toggle-active/${id}`,
    GET_BUSINESS_BY_SELLER_USERNAME_AND_SLUG: ({
      username,
      businessSlug,
    }: {
      username: string;
      businessSlug: string;
    }) => {
      return businessSlug
        ? `/businesses/slug/${username}/${businessSlug}`
        : `/businesses/slug/${username}/`;
    },
  },
  EMAIL_TEMPLATE: {
    UPDATE_EMAIL_TEMPLATE: ({id}: {id: string}) => `/email/template/${id}`,
    PREVIEW_EMAIL_TEMPLATE: '/email/template/preview',
  },
  CHECKBOOK: {
    GET_CHECKBOOK_CONTACTS_LIST: '/checkbooks/contacts',
    MAKE_NEW_CHECKBOOK_CONTACT: '/checkbooks/contacts',
    GET_CHECKBOOK_BALANCES: '/checkbooks/balances',
    MAKE_NEW_PAYMENT_REQUEST: '/checkbooks/requests',
    GET_CHECKBOOK_REQUESTS_LIST: `/checkbooks/requests`,
    CREATE_CHECKBOOK_ACCOUNT: '/checkbooks/account',
    CREATE_CHECKBOOK_WALLET: '/checkbooks/wallet',
    GET_CHECKBOOK_TRANSFERS_LIST: `/checkbooks/transfers`,
    APPROVE_AND_REJECT_CHECKBOOK_REQUEST: ({id}: {id: string}) =>
      `/checkbooks/requests/${id}/decision`,
    GET_CHECKBOOK_PAYMENT_INFO: '/checkbooks/deposit/token',
  },

  PRODUCTS: {
    GET_PRODUCTS_LIST: '/products',
    ADD_PRODUCT: '/products/add',
  },
};
