import {
  createJobApplication,
  deleteApplication,
  findApplicationByUser,
  JobApplicationRequest,
  userJobApplications,
} from "@/services/application-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useJobApplication = (jobPostId: number, userId: number) =>
  useQuery({
    queryKey: ["applications", jobPostId],
    queryFn: () =>
      findApplicationByUser(jobPostId, userId).then((res) => res.data),
  });

export const useJobApplications = () =>
  useQuery({
    queryKey: ["applications"],
    queryFn: userJobApplications,
  });

export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobApplication: JobApplicationRequest) =>
      createJobApplication(jobApplication).then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
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
