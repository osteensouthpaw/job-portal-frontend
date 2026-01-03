import {
  createJobApplication,
  deleteApplication,
  findApplicationByUser,
  JobApplicationRequest,
  userJobApplications,
} from "@/services/application-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJobApplication = (jobPostId: number, userId?: number) =>
  useQuery({
    queryKey: ["applications", jobPostId],
    queryFn: () =>
      findApplicationByUser(jobPostId, userId!).then((res) => res.data),
    enabled: !!userId,
  });

export const useJobApplications = () =>
  useQuery({
    queryKey: ["applications"],
    queryFn: userJobApplications,
  });

export const useCreateJobApplication = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (jobApplication: JobApplicationRequest) =>
      createJobApplication(jobApplication).then((res) => res.data),
    onSuccess: () => onSuccess,
    onError: (error) => toast.error(error.message),
  });
};

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (jobPostId: number) =>
      deleteApplication(jobPostId).then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
};
