import jobPostService, { JobPostRequest } from "@/services/jobPost-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateJobPost = () =>
  useMutation({
    mutationFn: (jobPost: JobPostRequest) =>
      jobPostService.createJobPost(jobPost).then((res) => res.data),
  });
