import { ApiError } from "@/app/AuthProvider";
import {
  createJobSeeerProfile,
  findJobSeekerProfile,
  JobSeekerProfileRequest,
  JobSeekerProfileResponse,
} from "@/services/profile-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useJobSeekerProfile = (userId?: number, isJobSeeker?: boolean) =>
  useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => findJobSeekerProfile(userId!),
    enabled: isJobSeeker,
  });

export const useCreateJobSeekerProfile = (
  onNext?: (savedProfile: JobSeekerProfileResponse) => void
) =>
  useMutation({
    mutationFn: (data: JobSeekerProfileRequest) =>
      createJobSeeerProfile(data).then((res) => res.data),
    onSuccess: (savedProfile) => {
      toast.success("Profile saved! ✓");
      onNext?.(savedProfile);
    },
    onError: (error: AxiosError<ApiError>) => {
      toast.error(error?.response?.data?.message || "Failed to save profile");
    },
  });
