import jobPostService from "@/services/jobPost-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLikedJobPosts = () =>
  useQuery({
    queryKey: ["jobPosts", { isLiked: true }],
    queryFn: jobPostService.getLikedJobPosts,
  });

export const useIsLikedJobPost = (jobPostId: number) =>
  useQuery({
    queryKey: ["jobPosts", { isLiked: true }, jobPostId],
    queryFn: () => jobPostService.isLiked(jobPostId).then((res) => res.data),
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
