import {
  fetchEducations,
  EducationRequest,
  createEducation,
  deleteEducation,
  EducationResponse,
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
  onAdd?: (education: EducationResponse) => void
) =>
  useMutation({
    mutationFn: (data: EducationRequest) => createEducation(data),
    onSuccess: (newEducation) => {
      toast.success("Education added!");
      onAdd?.(newEducation);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add education");
    },
  });

export const useRemoveEducation = (onRemove?: (educationId: number) => void) =>
  useMutation({
    mutationFn: (id: number) => deleteEducation(id),
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
