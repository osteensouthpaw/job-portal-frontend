import {
  fetchSkills,
  SkillRequest,
  createSkill,
  deleteSkill,
  SkillSetResponse,
  updateSkill,
} from "@/services/profile-service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchSkills = (id?: number) =>
  useQuery({
    queryKey: ["skills", id],
    queryFn: () => (id ? fetchSkills(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddSkill = (
  jobSeekerId?: number,
  onAdd?: (newSkill: SkillSetResponse) => void
) =>
  useMutation({
    mutationFn: (data: SkillRequest) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return createSkill(data, jobSeekerId);
    },
    onSuccess: (newSkill) => {
      toast.success("Skill added!");
      onAdd?.(newSkill);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add skill");
    },
  });

export const useRemoveSkill = (
  jobSeekerId?: number,
  onRemove?: (skillId: number) => void
) =>
  useMutation({
    mutationFn: (id: number) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return deleteSkill(id, jobSeekerId);
    },
    onSuccess: (data, skillId) => {
      toast.success("Skill removed");
      onRemove?.(skillId);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove skill");
    },
  });

export const useUpdateSkill = (
  skillId?: number,
  jobSeekerId?: number,
  onUpdate?: () => void
) =>
  useMutation({
    mutationFn: (request: SkillRequest) => {
      if (!skillId || !jobSeekerId) {
        return Promise.reject(new Error("Missing skill or job seeker ID"));
      }
      return updateSkill(skillId, jobSeekerId, request);
    },
    onSuccess: () => onUpdate?.(),
    onError: (error: any) =>
      toast.error(error?.message || "Failed to save skill"),
  });
