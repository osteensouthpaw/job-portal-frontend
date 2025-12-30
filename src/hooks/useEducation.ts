import {
  fetchEducations,
  EducationRequest,
  createEducation,
  deleteEducation,
  EducationResponse,
  updateEducation,
} from "@/services/profile-service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useEducation = (id?: number) =>
  useQuery({
    queryKey: ["educations", id],
    queryFn: () => (id ? fetchEducations(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddEducation = (
  jobSeekerId: number,
  onAdd?: (education: EducationResponse) => void
) =>
  useMutation({
    mutationFn: (data: EducationRequest) => createEducation(jobSeekerId, data),
    onSuccess: (newEducation) => {
      toast.success("Education added successfully!");
      onAdd?.(newEducation);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add education");
    },
  });

export const useRemoveEducation = (
  jobSeekerId: number,
  onRemove?: (educationId: number) => void
) =>
  useMutation({
    mutationFn: (id: number) => deleteEducation(jobSeekerId, id),
    onSuccess: (data, educationId) => {
      toast.success("Education removed");
      onRemove?.(educationId);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove education"
      );
    },
  });

export const useUpdateEducation = (
  jobSeekerId: number,
  educationId: number,
  onUpdate: () => void
) =>
  useMutation({
    mutationFn: (request: EducationRequest) =>
      updateEducation(jobSeekerId, educationId, request),
    onSuccess: () => {
      toast.success("Education updated successfully");
      onUpdate();
    },
    onError: (error) => toast.error(error.message || "Failed to update"),
  });
