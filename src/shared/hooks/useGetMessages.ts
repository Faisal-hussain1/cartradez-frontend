import { userQueries } from "@/shared/reactQuery";

export function useGetMessages(userId?: any,currentUserId?:any) {
  const { useFetchMessagesByUser } = userQueries();

  const { data, isLoading, error } = useFetchMessagesByUser({
    userId: userId,
    currentUserId
  });
  return {
    isLoading,
    messages: data?.messages || data || [],
    error,
  };
}