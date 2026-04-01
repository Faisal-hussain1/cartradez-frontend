import {buildDynamicURL} from '@/shared/utils/buildDynamicURL';
import {API_ENDPOINTS} from './apiEndpoints';

export const FILTERS_CONFIG = {
  pageNo: 1,
  pageLimit: 12,
  homePageLimit: 30,
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
    queryKey: 'getUserById', // 👈 keep string
   endpoint: (userId: string) => `/users/${userId}`
  },
};

export const CHATS = {
  fetchMessagesByUser: {
    queryKey: ["getMessagesByUser"],
    endpoint: (userId: string) => `/chat/${userId}`, // 👈 matches your backend
  },
  fetchInbox: {
  queryKey: (userId:string)=>["getInbox",userId],
  endpoint: "/chat/inbox",
},
fetchUnRead:{
  queryKey:["getUnreadMessages"],
  endpoint:(userId:string)=>`/chat/unread/${userId}`
}
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
        params
      ),
  },
  fetchVehicleById: {
    queryKey: 'getVehicleByUId',
    endpoint: (params: any) =>
      buildDynamicURL(
        API_ENDPOINTS.VEHICLES.GET_VEHICLE({
          id: params.vehicleId,
        }),
        params
      ),
    activeServerSidePagination: false,
  },
};
