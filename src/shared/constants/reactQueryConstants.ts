import {buildDynamicURL} from '@/shared/utils/buildDynamicURL';
import {API_ENDPOINTS} from './apiEndpoints';

export const FILTERS_CONFIG = {
  pageNo: 1,
  pageLimit: 12,
  homePageLimit: 60,
  managedByCartradezPageLimit: 60,
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
  fetchUserById: {
    queryKey: 'getUserById',
    endpoint: (userId: string) => `/users/${userId}`,
  },
};

export const CHATS = {
  fetchMessagesByUser: {
    queryKey: ['getMessagesByUser'],
    endpoint: (userId: string) => `/chat/${userId}`,
  },
  fetchInbox: {
    queryKey: (userId: string) => ['getInbox', userId],
    endpoint: '/chat/inbox',
  },
  fetchUnRead: {
    queryKey: ['getUnreadMessages'],
    endpoint: (userId: string) => `/chat/unread/${userId}`,
  },
};

export const VEHICLES = {
  fetchAllVehiclesList: {
    queryKey: 'getAllVehicles',
    endpoint: (params: any) =>
      buildDynamicURL(API_ENDPOINTS.VEHICLES.GET_VEHICLES_LIST, params),
  },

  fetchAllCartradezVehiclesList: {
    queryKey: 'getAllCartradezVehicles',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.VEHICLES.GET_CARTRADEZ_VEHICLES_LIST,
        params,
      ),
  },

  fetchActiveListingsCount: {
    queryKey: 'getActiveListingsCount',
    endpoint: API_ENDPOINTS.VEHICLES.GET_ACTIVE_LISTINGS_COUNT,
  },

  fetchVehicleById: {
    queryKey: (vehicleId: string) => ['getVehicleById', vehicleId],
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.VEHICLES.GET_VEHICLE({id: params.vehicleId}),
        params,
      ),
  },

  // Fetches all vehicles belonging to a specific user — hits GET /vehicles/user/:userId
  fetchVehiclesByUserId: {
    queryKey: ['getVehiclesByUserId'],
    endpoint: (params: {userId: string; page?: number; limit?: number}) =>
      buildDynamicURL(
        API_ENDPOINTS.VEHICLES.GET_VEHICLES_BY_USER_ID({id: params.userId}),
        // strip userId from query-string params — it lives in the path already
        {pageNo: params?.page, pageLimit: params?.limit},
      ),
  },

  // PATCH /vehicles/:vehicleId
  updateVehicle: {
    endpoint: (params: {vehicleId: string}) =>
      API_ENDPOINTS.VEHICLES.UPDATE_VEHICLE({id: params.vehicleId}),
  },

  // DELETE /vehicles/:vehicleId
  deleteVehicle: {
    endpoint: (params: {vehicleId: string}) =>
      API_ENDPOINTS.VEHICLES.DELETE_VEHICLE({id: params.vehicleId}),
  },
};