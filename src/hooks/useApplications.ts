import {
  createJobApplication,
  deleteApplication,
  findApplicationByUser,
  JobApplicationRequest,
  userJobApplications,
} from "@/services/application-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();
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

export const useCreateJobApplication = () =>
  useMutation({
    mutationFn: (jobApplication: JobApplicationRequest) =>
      createJobApplication(jobApplication).then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });

export const useDeleteJobApplication = () =>
  useMutation({
    mutationFn: (jobPostId: number) =>
      deleteApplication(jobPostId).then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["applications"] }),
  });
