import { useAuth } from "@/app/AuthProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { AlertTriangle, Github, Globe, Linkedin, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  coverLetter: string;
  yearsOfExperience: string;
  currentCompany?: string;
  currentRole?: string;
  noticePeriod: string;
  expectedSalary: string;
  willingToRelocate: boolean;
  remotePreferred: boolean;
  additionalInfo?: string;
  resume?: string;
  portfolio_file?: string;
}

const PersonalInfoSection = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();

  const { user } = useAuth();
  const { data: profile, isLoading, error } = useJobSeekerProfile(user!.id);

  useEffect(() => {
    if (profile) {
      if (user) setValue("fullName", user.firstName + " " + user.lastName);
      if (user?.email) setValue("email", user.email);
      if (profile.phone) setValue("phone", profile.phone);
      if (profile.personalWebsiteUrl)
        setValue("portfolio", profile.personalWebsiteUrl);
      if (profile.linkedInUrl) setValue("linkedin", profile.linkedInUrl);
      if (profile.gitHubUrl) setValue("github", profile.gitHubUrl);
    }
  }, [profile, setValue, user]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
        <Loader2 className="animate-spin w-5 h-5" />
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 py-8 justify-center text-destructive">
        <AlertTriangle className="w-5 h-5" />
        Failed to load profile information.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">
            Full Name *
            {errors.fullName && (
              <span className="text-destructive text-xs ml-1">
                ({errors.fullName.message})
              </span>
            )}
          </Label>
          <Input
            id="fullName"
            {...register("fullName", {
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="John Doe"
            className={`mt-1 ${errors.fullName ? "border-destructive" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="email">
            Email *
            {errors.email && (
              <span className="text-destructive text-xs ml-1">
                ({errors.email.message})
              </span>
            )}
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="john@example.com"
            className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="phone">
            Phone *
            {errors.phone && (
              <span className="text-destructive text-xs ml-1">
                ({errors.phone.message})
              </span>
            )}
          </Label>
          <Input
            id="phone"
            {...register("phone", { required: "Phone is required" })}
            placeholder="+1 (555) 123-4567"
            className={`mt-1 ${errors.phone ? "border-destructive" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="location">
            Current Location *
            {errors.location && (
              <span className="text-destructive text-xs ml-1">
                ({errors.location.message})
              </span>
            )}
          </Label>
          <Input
            id="location"
            {...register("location", { required: "Location is required" })}
            placeholder="San Francisco, CA"
            className={`mt-1 ${errors.location ? "border-destructive" : ""}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div>
          <Label htmlFor="portfolio">
            <Globe className="h-4 w-4 inline mr-1" />
            Portfolio Website
          </Label>
          <Input
            id="portfolio"
            {...register("portfolio")}
            placeholder="yoursite.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">
            <Linkedin className="h-4 w-4 inline mr-1" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            {...register("linkedin")}
            placeholder="linkedin.com/in/johndoe"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="github">
            <Github className="h-4 w-4 inline mr-1" />
            GitHub
          </Label>
          <Input
            id="github"
            {...register("github")}
            placeholder="github.com/johndoe"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
