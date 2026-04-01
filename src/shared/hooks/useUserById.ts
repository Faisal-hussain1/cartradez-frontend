import { userQueries } from "@/shared/reactQuery";

export function useGetUserById(id: any) {
  const { useFetchUserById } = userQueries();

  const { data, isLoading, error } = useFetchUserById({id});

  return {
    isLoading,
    user: data,
    error,
  };
}