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
  jobSeekerId: number,
  onAdd?: (newSkill: SkillSetResponse) => void
) =>
  useMutation({
    mutationFn: (data: SkillRequest) => createSkill(data, jobSeekerId),
    onSuccess: (newSkill) => {
      toast.success("Skill added!");
      onAdd?.(newSkill);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add skill");
    },
  });

export const useRemoveSkill = (
  jobSeekerId: number,
  onRemove?: (skillId: number) => void
) =>
  useMutation({
    mutationFn: (id: number) => deleteSkill(id, jobSeekerId),
    onSuccess: (data, skillId) => {
      toast.success("Skill removed");
      onRemove?.(skillId);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove skill");
    },
  });

export const useUpdateSkill = (
  skillId: number,
  jobSeekerId: number,
  onUpdate?: () => void
) =>
  useMutation({
    mutationFn: (request: SkillRequest) =>
      updateSkill(skillId, jobSeekerId, request),
    onSuccess: () => onUpdate?.(),
    onError: (error) => toast.error(error.message || "Failed to save skill"),
  });
