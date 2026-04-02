import jobPostService, { JobPostRequest } from "@/services/jobPost-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useJobPosts = (params?: Record<string, any>) =>
  useQuery({
    queryKey: ["jobPosts", params],
    queryFn: () => jobPostService.jobPosts(params),
  });

export const useJobPost = (jobPostId: number) =>
  useQuery({
    queryKey: ["jobPost", jobPostId],
    queryFn: () =>
      jobPostService.getJobPostById(jobPostId).then((res) => res.data),
    staleTime: 60 * 60 * 10, //10mins
  });

//return all jobosts liked by this user
export const useLikedJobPosts = () =>
  useQuery({
    queryKey: ["jobPosts", { isLiked: true }],
    queryFn: jobPostService.getLikedJobPosts,
  });

//has user liked this jobposts
export const useIsLikedJobPost = (jobPostId: number, userId?: number) =>
  useQuery({
    queryKey: ["jobPosts", { isLiked: true }, jobPostId],
    queryFn: () => jobPostService.isLiked(jobPostId).then((res) => res.data),
    enabled: !!userId,
  });

export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobPostId: number) =>
      jobPostService.toggleLike(jobPostId).then((res) => res.data),
    onSuccess: (data, jobPostId) => {
      queryClient.invalidateQueries({
        queryKey: ["jobPosts", { isLiked: true }, jobPostId],
      }),
        queryClient.invalidateQueries({
          queryKey: ["jobPosts", { isLiked: true }],
        });
    },
  });
};

export const useCreateJobPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (jobPost: JobPostRequest) =>
      jobPostService.createJobPost(jobPost).then((res) => res.data),
    onSuccess: (data) => {
      toast.success("Jobpost created successfully");
      router.push(`${data.id}`);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(`an error occured, please try again: ${error.message}`);
    },
  });
};

export const useEditJobPost = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { jobPost: JobPostRequest; jobPostId: number }) =>
      jobPostService
        .editJobPost(data.jobPost, data.jobPostId)
        .then((res) => res.data),
    onSuccess: (data) => {
      toast.success("Jobpost edited successfully");
      router.push(`/job-listings/${data.id}`);
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(`an error occured, please try again: ${error.message}`);
    },
  });
};

export const useDeleteJobPost = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (jobPostId: number) =>
      jobPostService.deleteJobPost(jobPostId).then((res) => res.data),
    onSuccess: () => {
      toast.success("Successfully deleted");
      router.back();
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(`an error occured: ${error.message}`);
    },
  });
};
