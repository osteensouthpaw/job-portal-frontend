"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X, Sparkles, ChevronRight, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  createEducation,
  fetchEducations,
  deleteEducation,
  EducationRequest,
  EducationLevel,
} from "@/services/profile-service";
import { useState } from "react";
import { useAuth } from "@/app/AuthProvider";

interface EducationStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export default function EducationStep({ onNext, onSkip }: EducationStepProps) {
  const { user } = useAuth();
  const [educations, setEducations] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EducationRequest>({
    mode: "onBlur",
    defaultValues: {
      fieldOfStudy: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      educationLevel: EducationLevel.BACHELORS,
    },
  });

  const startDate = watch("startDate");

  const { data: fetchedEducations = [] } = useQuery({
    queryKey: ["educations", user?.id],
    queryFn: () => (user?.id ? fetchEducations(user.id) : Promise.resolve([])),
    enabled: !!user?.id,
  });

  const { mutate: addEducation, isPending: isAdding } = useMutation({
    mutationFn: (data: EducationRequest) => createEducation(data),
    onSuccess: (newEdu) => {
      toast.success("Education added!");
      setEducations([...educations, newEdu]);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add education");
    },
  });

  const { mutate: removeEdu, isPending: isRemoving } = useMutation({
    mutationFn: (id: number) => deleteEducation(id),
    onSuccess: () => {
      toast.success("Education removed");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove education"
      );
    },
  });

  const onSubmit = (data: EducationRequest) => {
    // Date validation
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (start > end) {
        toast.error("End date must be after start date");
        return;
      }
    }

    // GPA validation
    if (data.gpa) {
      const gpaNum = parseFloat(data.gpa);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
        toast.error("GPA must be between 0 and 4.0");
        return;
      }
    }

    addEducation(data);
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

  const allEducations = [...fetchedEducations, ...educations];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <p className="text-blue-900 dark:text-blue-300 text-sm mb-1">
              Add your educational background
            </p>
            <p className="text-blue-700 dark:text-blue-400 text-xs">
              Include degrees, certifications, and relevant courses.
            </p>
          </div>
        </div>
      </div>

      {/* Added Education List */}
      {allEducations.length > 0 && (
        <div className="space-y-3">
          <Label>Added Education ({allEducations.length})</Label>
          {allEducations.map((edu) => (
            <div
              key={edu.id}
              className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="text-foreground font-medium">
                  {edu.fieldOfStudy}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {edu.institution}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeEdu(edu.id)}
                disabled={isRemoving}
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Education Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-4 space-y-4"
      >
        <h4 className="text-foreground font-medium">Add Education</h4>

        <div>
          <Label htmlFor="education-level">
            Education Level <span className="text-destructive">*</span>
          </Label>
          <Select
            {...register("educationLevel", {
              required: "Education level is required",
            })}
            onValueChange={(value) =>
              setValue("educationLevel", value as EducationLevel)
            }
          >
            <SelectTrigger id="education-level" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
              <SelectItem value="BACHELORS">Bachelor's</SelectItem>
              <SelectItem value="MASTERS">Master's</SelectItem>
              <SelectItem value="DOCTORATE">Doctorate</SelectItem>
            </SelectContent>
          </Select>
          {renderError(errors.educationLevel)}
        </div>

        <div>
          <Label htmlFor="field-of-study">
            Field of Study <span className="text-destructive">*</span>
          </Label>
          <Input
            id="field-of-study"
            {...register("fieldOfStudy", {
              required: "Field of study is required",
              minLength: {
                value: 2,
                message: "Field of study must be at least 2 characters",
              },
            })}
            placeholder="Computer Science"
            className={`mt-1 ${
              errors.fieldOfStudy ? "border-destructive" : ""
            }`}
          />
          {renderError(errors.fieldOfStudy)}
        </div>

        <div>
          <Label htmlFor="institution">
            Institution <span className="text-destructive">*</span>
          </Label>
          <Input
            id="institution"
            {...register("institution", {
              required: "Institution name is required",
              minLength: {
                value: 2,
                message: "Institution name must be at least 2 characters",
              },
            })}
            placeholder="University of California"
            className={`mt-1 ${errors.institution ? "border-destructive" : ""}`}
          />
          {renderError(errors.institution)}
        </div>

        <div>
          <Label htmlFor="edu-location">Location</Label>
          <Input
            id="edu-location"
            {...register("location", {
              maxLength: {
                value: 100,
                message: "Location must be less than 100 characters",
              },
            })}
            placeholder="Berkeley, CA"
            className={`mt-1 ${errors.location ? "border-destructive" : ""}`}
          />
          {renderError(errors.location)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edu-start">Start Date</Label>
            <Input
              id="edu-start"
              type="date"
              {...register("startDate", {
                validate: (value) => {
                  if (value && new Date(value) > new Date()) {
                    return "Start date cannot be in the future";
                  }
                  return true;
                },
              })}
              className={`mt-1 ${errors.startDate ? "border-destructive" : ""}`}
            />
            {renderError(errors.startDate)}
          </div>
          <div>
            <Label htmlFor="edu-end">End Date</Label>
            <Input
              id="edu-end"
              type="date"
              {...register("endDate", {
                validate: (value) => {
                  if (
                    value &&
                    startDate &&
                    new Date(value) < new Date(startDate)
                  ) {
                    return "End date must be after start date";
                  }
                  return true;
                },
              })}
              className={`mt-1 ${errors.endDate ? "border-destructive" : ""}`}
            />
            {renderError(errors.endDate)}
          </div>
        </div>

        <div>
          <Label htmlFor="gpa">GPA (Optional - Max 4.0)</Label>
          <Input
            id="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            {...register("gpa", {
              pattern: {
                value: /^[0-4](\.\d{1,2})?$/,
                message: "GPA must be between 0 and 4.0",
              },
            })}
            placeholder="3.8"
            className={`mt-1 ${errors.gpa ? "border-destructive" : ""}`}
          />
          {renderError(errors.gpa)}
        </div>

        <Button
          type="submit"
          disabled={isAdding || isSubmitting}
          variant="outline"
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          {isAdding || isSubmitting ? "Adding..." : "Add Education"}
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
