"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Sparkles, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  createSkill,
  fetchSkills,
  deleteSkill,
  SkillRequest,
} from "@/services/profile-service";
import { useState } from "react";
import { useAuth } from "@/app/AuthProvider";

interface SkillsStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function SkillsStep({ onNext, onSkip }: SkillsStepProps) {
  const { user } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillRequest>({
    mode: "onBlur",
    defaultValues: {
      skill: "",
      description: "",
    },
  });

  const { data: fetchedSkills = [] } = useQuery({
    queryKey: ["skills", user?.id],
    queryFn: () => (user?.id ? fetchSkills(user.id) : Promise.resolve([])),
    enabled: !!user?.id,
  });

  const { mutate: addSkill, isPending: isAdding } = useMutation({
    mutationFn: (data: SkillRequest) => createSkill(data),
    onSuccess: (newSkill) => {
      toast.success("Skill added!");
      setSkills([...skills, newSkill]);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add skill");
    },
  });

  const { mutate: removeSkillMutate, isPending: isRemoving } = useMutation({
    mutationFn: (id: number) => deleteSkill(id),
    onSuccess: () => {
      toast.success("Skill removed");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove skill");
    },
  });

  const onSubmit = (data: SkillRequest) => {
    addSkill(data);
  };

  const renderError = (error?: any) => {
    if (!error) return null;
    return (
      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {error.message}
      </p>
    );
  };

  const allSkills = [...fetchedSkills, ...skills];

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div>
            <p className="text-purple-900 dark:text-purple-300 text-sm mb-1">
              Showcase your skills and expertise
            </p>
            <p className="text-purple-700 dark:text-purple-400 text-xs">
              Add the skills that make you stand out to employers.
            </p>
          </div>
        </div>
      </div>

      {/* Added Skills List */}
      {allSkills.length > 0 && (
        <div className="space-y-3">
          <Label>Added Skills ({allSkills.length})</Label>
          <div className="flex flex-wrap gap-2">
            {allSkills.map((skill) => (
              <Badge
                key={skill.id}
                className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 pr-1"
              >
                {skill.skill}
                <button
                  type="button"
                  onClick={() => removeSkillMutate(skill.id)}
                  disabled={isRemoving}
                  className="ml-2 hover:text-green-700 dark:hover:text-green-300"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Add New Skill Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-4 space-y-4"
      >
        <h4 className="text-foreground font-medium">Add Skill</h4>

        <div>
          <Label htmlFor="skill-name">
            Skill Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="skill-name"
            {...register("skill", {
              required: "Skill name is required",
              minLength: {
                value: 2,
                message: "Skill name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Skill name must be less than 50 characters",
              },
            })}
            placeholder="UI/UX Design"
            className={`mt-1 ${errors.skill ? "border-destructive" : ""}`}
          />
          {renderError(errors.skill)}
        </div>

        <div>
          <Label htmlFor="skill-description">Description</Label>
          <Textarea
            id="skill-description"
            {...register("description", {
              maxLength: {
                value: 500,
                message: "Description must be less than 500 characters",
              },
            })}
            placeholder="Describe your proficiency..."
            className={`mt-1 min-h-[60px] ${
              errors.description ? "border-destructive" : ""
            }`}
          />
          {renderError(errors.description)}
        </div>

        <Button
          type="submit"
          disabled={isAdding || isSubmitting}
          variant="outline"
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          {isAdding || isSubmitting ? "Adding..." : "Add Skill"}
        </Button>
      </form>

      <div className="flex gap-2 justify-end pt-4">
        <Button variant="ghost" onClick={onSkip}>
          Skip
        </Button>
        <Button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
