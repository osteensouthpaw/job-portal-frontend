import { UserResponse } from "@/services/auth-service";
import {
  fetchExperiences,
  ExperienceRequest,
  createExperience,
  deleteExperience,
} from "@/services/profile-service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useExperiences = (id?: number) =>
  useQuery({
    queryKey: ["experiences", id],
    queryFn: () => (id ? fetchExperiences(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddExperience = () =>
  useMutation({
    mutationFn: (data: ExperienceRequest) => createExperience(data),
    onSuccess: () => {
      toast.success("Experience added!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add experience");
    },
  });

export const useRemoveExperience = () =>
  useMutation({
    mutationFn: (id: number) => deleteExperience(id),
    onSuccess: () => {
      toast.success("Experience removed");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove experience"
      );
    },
  });
