import {
  createOrganization,
  getBusinessStreams,
  OrganizationCreateRequest,
} from "@/services/recruiter-organization-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBusinessStreams = () =>
  useQuery({
    queryKey: ["businessStreams"],
    queryFn: getBusinessStreams,
  });

export const useCreateOrganization = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: OrganizationCreateRequest) =>
      createOrganization(request),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["businessStreams"] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create organization profile",
      );
    },
  });
};
