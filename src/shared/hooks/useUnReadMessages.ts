import { userQueries } from "@/shared/reactQuery";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";

export function useUnRead() {
  const user = useSelector(getCurrentUser); // ✅ get user

  const { useFetchUnReadMessages } = userQueries();

  const { data, isLoading, refetch } = useFetchUnReadMessages({
    userId: user?._id, // 🔥 pass user
  });

  return {
    isLoading,
    len: data || [],
    refetch,
  };
}