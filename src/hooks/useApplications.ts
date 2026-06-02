import {
  createJobApplication,
  deleteApplication,
  findApplicationByUser,
  getApplicationsForJobPost,
  JobApplicationRequest,
  userJobApplications,
  getRecentApplicationsForRecruiter,
  acceptApplication,
  rejectApplication,
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

export const useApplicationsForJobPost = (jobPostId?: number) =>
  useQuery({
    queryKey: ["applications", jobPostId],
    queryFn: () =>
      getApplicationsForJobPost(jobPostId!).then((res) => res.data),
    enabled: !!jobPostId,
  });

export const useRecentApplications = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["applications", "recent", params],
    queryFn: () =>
      getRecentApplicationsForRecruiter(params).then((res) => res.data),
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

//accept or reject application
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: (variables: { applicantId: number; jobPostId: number }) =>
      acceptApplication(variables).then((res) => res.data),
    onSuccess: () => {
      // Invalidate all applications-related queries
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => toast.error(error.message),
  });

  const rejectMutation = useMutation({
    mutationFn: (variables: { applicantId: number; jobPostId: number }) =>
      rejectApplication(variables).then((res) => res.data),
    onSuccess: () => {
      // Invalidate all applications-related queries
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { acceptMutation, rejectMutation };
};
