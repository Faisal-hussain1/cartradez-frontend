export const API_ENDPOINTS = {
  USERS: {
    LOGIN: '/users/login',
    SIGNUP: '/users/signup',
    USER_BY_ID:`/users/:id`,
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
    UPDATE_PROFILE: '/users/update-profile',
    GET_SELLER_BANK_ACCOUNT: '/users/sellers/bank-account',
  },
  VEHICLES: {
    GET_VEHICLES_LIST: '/vehicles',
    GET_CARTRADEZ_VEHICLES_LIST: '/vehicles/cartradez',
    ADD_VEHICLE: '/vehicles/add',
    GET_VEHICLE: ({id}: {id: string}) => `/vehicles/${id}`,
  },
};
