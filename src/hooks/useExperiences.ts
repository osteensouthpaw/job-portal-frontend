import {
  createExperience,
  deleteExperience,
  ExperienceRequest,
  ExperienceResponse,
  fetchExperiences,
  updateExperience,
} from "@/services/profile-service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useExperiences = (id?: number) =>
  useQuery({
    queryKey: ["experiences", id],
    queryFn: () => (id ? fetchExperiences(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddExperience = (
  jobSeekerId?: number,
  onAdd?: (data: ExperienceResponse) => void
) =>
  useMutation({
    mutationFn: (data: ExperienceRequest) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return createExperience(data, jobSeekerId);
    },
    onSuccess: (data) => {
      toast.success("Experience added!");
      onAdd?.(data);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add experience"
      );
    },
  });

export const useRemoveExperience = (
  jobSeekerId?: number,
  onRemove?: (expId: number) => void
) =>
  useMutation({
    mutationFn: (id: number) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return deleteExperience(id, jobSeekerId);
    },
    onSuccess: (data, expId) => {
      toast.success("Experience removed");
      onRemove?.(expId);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to remove experience"
      );
    },
  });

export const useUpdateExperience = (
  jobSeekerId?: number,
  experienceId?: number,
  onUpdate?: () => void
) =>
  useMutation({
    mutationFn: (request: ExperienceRequest) => {
      if (!jobSeekerId || !experienceId) {
        return Promise.reject(new Error("Missing job seeker or experience ID"));
      }
      return updateExperience(experienceId, jobSeekerId, request);
    },
    onSuccess: () => {
      toast.success("Experience updated successfully");
      onUpdate?.();
    },
    onError: (error: any) =>
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update experience"
      ),
  });
