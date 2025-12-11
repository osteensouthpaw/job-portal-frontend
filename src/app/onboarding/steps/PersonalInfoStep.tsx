"use client";
import { ApiError, useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateJobSeeerProfile } from "@/hooks/useProfiles";
import { ExperienceLevel } from "@/services/jobPost-service";
import {
  JobSeekerProfileRequest,
  createJobSeeerProfile,
} from "@/services/profile-service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  AlertCircle,
  ChevronRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface PersonalInfoStepProps {
  onNext: () => void;
}

export default function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const { user } = useAuth();
  const { mutate: saveProfile, isPending } = useCreateJobSeeerProfile(onNext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JobSeekerProfileRequest>({
    mode: "onBlur",
    defaultValues: {
      profession: "",
      bio: "",
      phone: "",
      personalWebsiteUrl: "",
      linkedInUrl: "",
      gitHubUrl: "",
      twitterUrl: "",
      experienceLevel: ExperienceLevel.PROFESSIONAL,
      currentAnnualSalary: 0,
      dateOfBirth: "",
    },
  });

  const fullName = watch("profession");

  const onSubmit = (data: JobSeekerProfileRequest) => {
    if (!user?.email) {
      toast.error("Email not found");
      return;
    }
    saveProfile(data);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col items-center gap-4 mb-6">
        <Avatar className="h-24 w-24">
          <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-2xl">
            {fullName
              ? fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : "U"}
          </AvatarFallback>
        </Avatar>
        <p className="text-muted-foreground text-sm text-center">
          You can upload a photo later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profession">
            Professional Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="profession"
            {...register("profession", {
              required: "Professional title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Title must be less than 100 characters",
              },
            })}
            placeholder="Product Designer"
            className={`mt-1 ${errors.profession ? "border-destructive" : ""}`}
          />
          {renderError(errors.profession)}
        </div>
        <div>
          <Label htmlFor="experience-level">
            Experience Level <span className="text-destructive">*</span>
          </Label>
          <Select
            {...register("experienceLevel", {
              required: "Experience level is required",
            })}
            onValueChange={(value) =>
              setValue("experienceLevel", value as ExperienceLevel)
            }
          >
            <SelectTrigger id="experience-level" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ExperienceLevel).map(([label, level]) => (
                <SelectItem value={level} key={level}>
                  {label.toLocaleLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {renderError(errors.experienceLevel)}
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Professional Summary</Label>
        <Textarea
          id="bio"
          {...register("bio", {
            maxLength: {
              value: 1000,
              message: "Bio must be less than 1000 characters",
            },
          })}
          placeholder="Brief description of your professional background..."
          className={`mt-1 min-h-[100px] ${
            errors.bio ? "border-destructive" : ""
          }`}
        />
        {renderError(errors.bio)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">
            <Mail className="h-4 w-4 inline mr-1" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">
            <Phone className="h-4 w-4 inline mr-1" />
            Phone
          </Label>
          <Input
            id="phone"
            {...register("phone", {
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im,
                message: "Please enter a valid phone number",
              },
            })}
            placeholder="+1 (555) 123-4567"
            className={`mt-1 ${errors.phone ? "border-destructive" : ""}`}
          />
          {renderError(errors.phone)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="website">
            <Globe className="h-4 w-4 inline mr-1" />
            Website
          </Label>
          <Input
            id="website"
            {...register("personalWebsiteUrl", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            placeholder="yoursite.com"
            className={`mt-1 ${
              errors.personalWebsiteUrl ? "border-destructive" : ""
            }`}
          />
          {renderError(errors.personalWebsiteUrl)}
        </div>
        <div>
          <Label htmlFor="linkedin">
            <Linkedin className="h-4 w-4 inline mr-1" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            {...register("linkedInUrl", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            placeholder="linkedin.com/in/johndoe"
            className={`mt-1 ${errors.linkedInUrl ? "border-destructive" : ""}`}
          />
          {renderError(errors.linkedInUrl)}
        </div>
        <div>
          <Label htmlFor="github">
            <Github className="h-4 w-4 inline mr-1" />
            GitHub
          </Label>
          <Input
            id="github"
            {...register("gitHubUrl", {
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            placeholder="github.com/johndoe"
            className={`mt-1 ${errors.gitHubUrl ? "border-destructive" : ""}`}
          />
          {renderError(errors.gitHubUrl)}
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="submit"
          disabled={isPending || isSubmitting}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          {isPending || isSubmitting ? "Saving..." : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
