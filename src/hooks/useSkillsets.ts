import {
  fetchSkills,
  SkillRequest,
  createSkill,
  deleteSkill,
  SkillSetResponse,
} from "@/services/profile-service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchSkills = (id?: number) =>
  useQuery({
    queryKey: ["skills", id],
    queryFn: () => (id ? fetchSkills(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddSkill = (onAdd: (newSkill: SkillSetResponse) => void) =>
  useMutation({
    mutationFn: (data: SkillRequest) => createSkill(data),
    onSuccess: (newSkill) => {
      toast.success("Skill added!");
      onAdd?.(newSkill);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add skill");
    },
  });

export const useRemoveSkill = (onRemove?: (skillId: number) => void) =>
  useMutation({
    mutationFn: (id: number) => deleteSkill(id),
    onSuccess: (data, skillId) => {
      toast.success("Skill removed");
      onRemove?.(skillId);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove skill");
    },
  });
