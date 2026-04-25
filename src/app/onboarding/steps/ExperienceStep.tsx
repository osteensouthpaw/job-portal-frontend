"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useAddExperience, useRemoveExperience } from "@/hooks/useExperiences";
import { JobType } from "@/services/jobPost-service";
import {
  ExperienceRequest,
  ExperienceResponse,
} from "@/services/profile-service";
import { AlertCircle, ChevronRight, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ExperienceStepProps {
  onNext: () => void;
  onSkip: () => void;
  jobSeekerId: number;
}

export default function ExperienceStep({
  onNext,
  onSkip,
  jobSeekerId,
}: ExperienceStepProps) {
  const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ExperienceRequest>({
    mode: "onBlur",
    defaultValues: {
      jobTitle: "",
      companyName: "",
      jobLocation: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      jobType: JobType.FULL_TIME,
    },
  });

  const isCurrentJob = watch("isCurrentJob");
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const { mutate: addExperience, isPending: isAdding } = useAddExperience(
    jobSeekerId,
    (newExp) => {
      setExperiences([...experiences, newExp]);
      reset();
    }
  );

  const onRemove = (expId: number) =>
    setExperiences((prevExp) =>
      prevExp.filter((experience) => experience.id !== expId)
    );

  const { mutate: removeExp, isPending: isRemoving } = useRemoveExperience(
    jobSeekerId,
    onRemove
  );

  const onSubmit = (data: ExperienceRequest) => {
    // Date validation
    if (data.startDate && data.endDate && !isCurrentJob) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (start > end) {
        toast.error("End date must be after start date");
        return;
      }
    }

    // Future date validation
    if (data.startDate && new Date(data.startDate) > new Date()) {
      toast.error("Start date cannot be in the future");
      return;
    }

    addExperience(data);
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

  return (
    <div className="space-y-6">
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <p className="text-green-900 dark:text-green-300 text-sm mb-1">
              Add your work experience to stand out
            </p>
            <p className="text-green-700 dark:text-green-400 text-xs">
              You can add multiple positions. This helps employers understand
              your background.
            </p>
          </div>
        </div>
      </div>

      {/* Added Experience List */}
      {experiences.length > 0 && (
        <div className="space-y-3">
          <Label>Added Experience ({experiences.length})</Label>
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="text-foreground font-medium">{exp.jobTitle}</h4>
                <p className="text-muted-foreground text-sm">
                  {exp.companyName}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeExp(exp.id)}
                disabled={isRemoving}
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Experience Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-4 space-y-4"
      >
        <h4 className="text-foreground font-medium">Add Work Experience</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="job-title">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="job-title"
              {...register("jobTitle", {
                required: "Job title is required",
                minLength: {
                  value: 2,
                  message: "Job title must be at least 2 characters",
                },
              })}
              placeholder="Product Designer"
              className={`mt-1 ${errors.jobTitle ? "border-destructive" : ""}`}
            />
            {renderError(errors.jobTitle)}
          </div>
          <div>
            <Label htmlFor="company">
              Company <span className="text-destructive">*</span>
            </Label>
            <Input
              id="company"
              {...register("companyName", {
                required: "Company name is required",
                minLength: {
                  value: 2,
                  message: "Company name must be at least 2 characters",
                },
              })}
              placeholder="TechCorp Inc."
              className={`mt-1 ${
                errors.companyName ? "border-destructive" : ""
              }`}
            />
            {renderError(errors.companyName)}
          </div>
        </div>

        <div>
          <Label htmlFor="job-location">Location</Label>
          <Input
            id="job-location"
            {...register("jobLocation", {
              maxLength: {
                value: 100,
                message: "Location must be less than 100 characters",
              },
            })}
            placeholder="San Francisco, CA"
            className={`mt-1 ${errors.jobLocation ? "border-destructive" : ""}`}
          />
          {renderError(errors.jobLocation)}
        </div>

        <div>
          <Label htmlFor="job-type">
            Job Type <span className="text-destructive">*</span>
          </Label>
          <Select
            {...register("jobType", { required: "Job type is required" })}
            onValueChange={(value) => setValue("jobType", value as JobType)}
          >
            <SelectTrigger id="job-type" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FULL_TIME">Full-time</SelectItem>
              <SelectItem value="PART_TIME">Part-time</SelectItem>
              <SelectItem value="CONTRACT">Contract</SelectItem>
              <SelectItem value="FREELANCE">Freelance</SelectItem>
            </SelectContent>
          </Select>
          {renderError(errors.jobType)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
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
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              {...register("endDate", {
                validate: (value) => {
                  if (isCurrentJob) return true;
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
              disabled={isCurrentJob}
              className={`mt-1 ${errors.endDate ? "border-destructive" : ""}`}
            />
            {renderError(errors.endDate)}
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
          <Switch
            id="current-job"
            {...register("isCurrentJob")}
            onCheckedChange={(checked) => {
              setValue("isCurrentJob", checked);
              if (checked) setValue("endDate", "");
            }}
          />
          <Label htmlFor="current-job" className="mb-0 cursor-pointer">
            I currently work here
          </Label>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "description is required",
              maxLength: {
                value: 1000,
                message: "Description must be less than 1000 characters",
              },
            })}
            placeholder="Describe your responsibilities and achievements..."
            className={`mt-1 min-h-[80px] ${
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
          {isAdding || isSubmitting ? "Adding..." : "Add Experience"}
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
