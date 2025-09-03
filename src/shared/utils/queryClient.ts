import {QueryClient} from '@tanstack/react-query';
import {USERS} from '@/shared/constants/reactQueryConstants';

// Helper function to create a new QueryClient
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

let browserQueryClient = undefined;

export function getQueryClient() {
  return typeof window === 'undefined'
    ? createQueryClient() // Always create a new instance for the server
    : (browserQueryClient ??= createQueryClient()); // Reuse the instance on the client
}

export const invalidateQueries = () => {
  const queryClient = getQueryClient();

  const queriesToInvalidate = [
    USERS.fetchLoginUserInfo.queryKey,
    USERS.fetchAllUsersList.queryKey,

    // add queries that want to invalidate when user logged out
  ];

  queriesToInvalidate.forEach((queryKey) => {
    queryClient.resetQueries({queryKey});
  });
};
