import { userQueries } from "@/shared/reactQuery";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";

export function useInbox() {
  const user = useSelector(getCurrentUser); // ✅ get user

  const { useFetchInbox } = userQueries();

  const { data, isLoading, refetch } = useFetchInbox({
    userId: user?._id, // 🔥 pass user
  });

  return {
    isLoading,
    users: data || [],
    refetch,
  };
}