import {userQueries} from '@/shared/reactQuery';
import {getRoleFlags} from '../utils/auth';

export function useGetLoginUserData() {
  const {useFetchLoginUserInfo} = userQueries();
  const {data, isLoading} = useFetchLoginUserInfo();

  const user = data?.user;

  return {
    isLoading,
    ...getRoleFlags({
      role: user?.currentActiveOrganization?.role,
    }),
    user,
  };
}
