import {useQueryHandler} from '@/shared/hooks/reactQuery/useQueryHandler';
import {QueryCallbacks} from '@/shared/interfaces/hooks';
import {USERS,CHATS} from '@/shared/constants/reactQueryConstants';

export const useQueries = () => {
  return {
    // Function to fetch the logged-in user info
    useFetchLoginUserInfo: ({
      callBackFuncs,
    }: {callBackFuncs?: QueryCallbacks} = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchLoginUserInfo.queryKey,
        endpoint: USERS.fetchLoginUserInfo.endpoint,
        customQueryOptions: {
          gcTime: 0, // Disable cache time to always fetch fresh data
          refetchOnWindowFocus: true,
          refetchOnMount: true,
          staleTime: 0, // Disable stale time to always fetch fresh data
        },
        callbacks: {
          ...callBackFuncs,
          onSuccessAlways: ({
            // data,
            // statusCode,
            // message
          } = {}) => {},
          onErrorAlways: (
            {
              // error : {type},
              // message,
              // statusCode
            }
          ) => {},
        },
      }),

    // Function to fetch the list of users
    useFetchAllUsersList: ({
      callBackFuncs,
      params,
    }: {
      callBackFuncs?: QueryCallbacks;
      params?: any;
    } = {}) =>
      useQueryHandler({
        queryKey: USERS.fetchAllUsersList.queryKey,
        endpoint: USERS.fetchAllUsersList.endpoint(params),
        params,
        customQueryOptions: {
          staleTime: 10 * 60 * 1000,
          refetchOnWindowFocus: true,
        },
        callbacks: {
          ...callBackFuncs,
        },
      }),
     useFetchUserById: ({
  id,
  callBackFuncs,
}: {
  id: string;
  callBackFuncs?: QueryCallbacks;
}) =>
  useQueryHandler({
    queryKey: `${USERS.fetchUserById.queryKey}-${id}`, // ✅ string dynamic
    endpoint: USERS.fetchUserById.endpoint(id),
    customQueryOptions: {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    },
    callbacks: {
      ...callBackFuncs,
    },
  }),
  useFetchMessagesByUser: ({
  userId,
  currentUserId,
  callBackFuncs,
}: {
  userId: string;
  currentUserId:string;
  callBackFuncs?: QueryCallbacks;
}) =>
  useQueryHandler({
    queryKey: `${CHATS.fetchMessagesByUser.queryKey}-${userId}-${currentUserId}`, // ✅ string dynamic
    endpoint: CHATS.fetchMessagesByUser.endpoint(userId),
    customQueryOptions: {
      enabled: !!userId && !!currentUserId,
      staleTime: 0, // always fresh chat
      refetchOnWindowFocus: false,
    },
    callbacks: {
      ...callBackFuncs,
    },
  }),
  useFetchInbox: ({
  callBackFuncs,
  userId,
}: {
  callBackFuncs?: QueryCallbacks;
  userId?:any;
} = {}) =>
  useQueryHandler({
   queryKey: CHATS.fetchInbox.queryKey(userId),
    endpoint: CHATS.fetchInbox.endpoint,
    customQueryOptions: {
      enabled: !!userId,
      staleTime: 0,
    },
    callbacks: {
      ...callBackFuncs,
    },
  }),
   useFetchUnReadMessages: ({
  callBackFuncs,
  userId,
}: {
  callBackFuncs?: QueryCallbacks;
  userId?:any;
} = {}) =>
  useQueryHandler({
   queryKey: CHATS.fetchUnRead.queryKey,
    endpoint: CHATS.fetchUnRead.endpoint(userId),
    customQueryOptions: {
      enabled: !!userId,
      staleTime: 0,
    },
    callbacks: {
      ...callBackFuncs,
    },
  }),
  };
};
