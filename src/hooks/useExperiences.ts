import {
  createExperience,
  deleteExperience,
  ExperienceRequest,
  ExperienceResponse,
  fetchExperiences,
} from "@/services/profile-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useExperiences = (id?: number) =>
  useQuery({
    queryKey: ["experiences", id],
    queryFn: () => (id ? fetchExperiences(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddExperience = (onAdd?: (data: ExperienceResponse) => void) =>
  useMutation({
    mutationFn: (data: ExperienceRequest) => createExperience(data),
    onSuccess: (data) => {
      toast.success("Experience added!");
      onAdd?.(data);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add experience");
    },
  });

export const useRemoveExperience = (onRemove?: (expId: number) => void) =>
  useMutation({
    mutationFn: (id: number) => deleteExperience(id),
    onSuccess: (data, expId) => {
      toast.success("Experience removed");
      onRemove?.(expId);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove experience"
      );
    },
  });
