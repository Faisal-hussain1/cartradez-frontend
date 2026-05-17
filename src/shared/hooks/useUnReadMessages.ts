import { userQueries } from "@/shared/reactQuery";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";

export function useUnRead() {
  const user = useSelector(getCurrentUser);

  const { useFetchUnReadMessages } = userQueries();

  const { data, isLoading, refetch } = useFetchUnReadMessages({
    userId: user?._id,
  });

  return {
    isLoading,
    len: Number(data) || 0,
    refetch,
  };
}
