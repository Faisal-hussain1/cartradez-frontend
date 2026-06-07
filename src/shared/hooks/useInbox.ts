import {userQueries} from '@/shared/reactQuery';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';

export function useInbox() {
  const user = useSelector(getCurrentUser);
  const {useFetchInbox} = userQueries();

  const {data, isLoading, refetch} = useFetchInbox({
    userId: user?.isBlocked ? undefined : user?._id,
  });

  return {
    isLoading,
    users: data || [],
    refetch,
  };
}
