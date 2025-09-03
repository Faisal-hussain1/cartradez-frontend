import {userQueries} from '@/shared/reactQuery';
import {getRoleFlags} from '../utils/auth';

export function useGetLoginUserData() {
  const {useFetchLoginUserInfo} = userQueries();
  const {data, isLoading} = useFetchLoginUserInfo();

  const user = data?.user;
  const isCheckbookAccountCreated = user?.features?.checkbook?.account?.id;
  const isCheckbookEnabled = user?.features?.checkbook?.enabled;
  const isWalletCreated = user?.features?.checkbook?.wallets?.length;

  const isFirstTimeDisabled = !isCheckbookEnabled && !isCheckbookAccountCreated;

  const isCheckbookAccountDisabledAfterCreating =
    !isCheckbookAccountCreated || !isCheckbookEnabled;

  return {
    isLoading,
    isCheckbookAccountCreated,
    isCheckbookEnabled,
    isWalletCreated,
    ...getRoleFlags({
      role: user?.currentActiveOrganization?.role,
    }),
    user,
    isFirstTimeDisabled,
    isCheckbookAccountDisabledAfterCreating,
  };
}
