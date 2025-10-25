import { UserResponse } from "@/services/auth-service";
import { getUserConnectedAccounts, updateUser } from "@/services/user-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      firstName: string;
      lastName: string;
      imageUrl: string;
    }) => updateUser(data).then((res) => res.data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });
};

export const useUserConnectedAccounts = (user: UserResponse | null) =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: () => getUserConnectedAccounts().then((res) => res.data),
    enabled: !!user,
  });
