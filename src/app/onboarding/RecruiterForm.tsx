"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export interface RecruiterOnboardingFormData {
  companyName: string;
  industry: string;
  companySize: string;
  companyType: string;
  website: string;
  description: string;
  headquarters: string;
  foundedYear: string;
  contactEmail: string;
  contactPhone: string;
  companyLogo?: FileList;
}
export default function RecruiterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecruiterOnboardingFormData>({
    defaultValues: {
      companyName: "",
      industry: "",
      companySize: "",
      companyType: "",
      website: "",
      description: "",
      headquarters: "",
      foundedYear: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const onSubmit = async (data: RecruiterOnboardingFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Organization profile created successfully!", {
        description: "Welcome to the recruiter dashboard.",
      });

      // onComplete(data);
    } catch (error) {
      toast.error("Failed to create organization profile", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <Building2 className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-green-600 dark:text-green-400 mb-2">
            Welcome to Recruiter Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tell us about your organization to get started
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="border-green-100 dark:border-green-900/30 shadow-xl">
          <CardHeader className="border-b border-green-100 dark:border-green-900/30 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-900 dark:text-green-100">
                Organization Information
              </CardTitle>
            </div>
            <CardDescription>
              Complete your organization profile to start posting jobs and
              finding candidates
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Company Basics */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-green-100 dark:border-green-900/30">
                  <Building2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-900 dark:text-green-100">
                    Company Basics
                  </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="companyName"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      {...register("companyName", {
                        required: "Company name is required",
                      })}
                      placeholder="e.g., Tech Innovations Inc."
                      className={errors.companyName ? "border-red-500" : ""}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="industry"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Industry <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="industry"
                      control={control}
                      rules={{ required: "Industry is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={errors.industry ? "border-red-500" : ""}
                          >
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">
                              Manufacturing
                            </SelectItem>
                            <SelectItem value="consulting">
                              Consulting
                            </SelectItem>
                            <SelectItem value="marketing">
                              Marketing & Advertising
                            </SelectItem>
                            <SelectItem value="real-estate">
                              Real Estate
                            </SelectItem>
                            <SelectItem value="hospitality">
                              Hospitality
                            </SelectItem>
                            <SelectItem value="transportation">
                              Transportation & Logistics
                            </SelectItem>
                            <SelectItem value="energy">
                              Energy & Utilities
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.industry && (
                      <p className="text-red-500 text-sm">
                        {errors.industry.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="companySize"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Size <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="companySize"
                      control={control}
                      rules={{ required: "Company size is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              errors.companySize ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">
                              11-50 employees
                            </SelectItem>
                            <SelectItem value="51-200">
                              51-200 employees
                            </SelectItem>
                            <SelectItem value="201-500">
                              201-500 employees
                            </SelectItem>
                            <SelectItem value="501-1000">
                              501-1000 employees
                            </SelectItem>
                            <SelectItem value="1001-5000">
                              1001-5000 employees
                            </SelectItem>
                            <SelectItem value="5001+">
                              5001+ employees
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.companySize && (
                      <p className="text-red-500 text-sm">
                        {errors.companySize.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="companyType"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Type <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="companyType"
                      control={control}
                      rules={{ required: "Company type is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger
                            className={
                              errors.companyType ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="startup">Startup</SelectItem>
                            <SelectItem value="scaleup">Scaleup</SelectItem>
                            <SelectItem value="sme">SME</SelectItem>
                            <SelectItem value="enterprise">
                              Enterprise
                            </SelectItem>
                            <SelectItem value="agency">Agency</SelectItem>
                            <SelectItem value="non-profit">
                              Non-Profit
                            </SelectItem>
                            <SelectItem value="government">
                              Government
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.companyType && (
                      <p className="text-red-500 text-sm">
                        {errors.companyType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="foundedYear"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Founded Year
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="foundedYear"
                        {...register("foundedYear", {
                          pattern: {
                            value: /^\d{4}$/,
                            message: "Please enter a valid year",
                          },
                        })}
                        placeholder="e.g., 2020"
                        className={`pl-10 ${
                          errors.foundedYear ? "border-red-500" : ""
                        }`}
                        maxLength={4}
                      />
                    </div>
                    {errors.foundedYear && (
                      <p className="text-red-500 text-sm">
                        {errors.foundedYear.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Company Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    {...register("description", {
                      required: "Company description is required",
                      minLength: {
                        value: 50,
                        message: "Description must be at least 50 characters",
                      },
                    })}
                    placeholder="Tell us about your company, mission, and culture..."
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Location & Contact */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-green-100 dark:border-green-900/30">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-900 dark:text-green-100">
                    Location & Contact
                  </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="headquarters"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Headquarters Location{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="headquarters"
                        {...register("headquarters", {
                          required: "Headquarters location is required",
                        })}
                        placeholder="e.g., San Francisco, CA, USA"
                        className={`pl-10 ${
                          errors.headquarters ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.headquarters && (
                      <p className="text-red-500 text-sm">
                        {errors.headquarters.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="website"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="website"
                        type="url"
                        {...register("website", {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Please enter a valid URL",
                          },
                        })}
                        placeholder="https://example.com"
                        className={`pl-10 ${
                          errors.website ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.website && (
                      <p className="text-red-500 text-sm">
                        {errors.website.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contactEmail"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Contact Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="contactEmail"
                        type="email"
                        {...register("contactEmail", {
                          required: "Contact email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="contact@example.com"
                        className={`pl-10 ${
                          errors.contactEmail ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.contactEmail && (
                      <p className="text-red-500 text-sm">
                        {errors.contactEmail.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="contactPhone"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Contact Phone
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="contactPhone"
                        type="tel"
                        {...register("contactPhone")}
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Logo */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-green-100 dark:border-green-900/30">
                  <Upload className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-900 dark:text-green-100">
                    Branding (Optional)
                  </h3>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="companyLogo"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Company Logo
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        id="companyLogo"
                        type="file"
                        accept="image/*"
                        {...register("companyLogo")}
                        className="cursor-pointer"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Recommended: Square image, at least 200x200px, PNG or
                        JPG format
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-green-100 dark:border-green-900/30">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Setup
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@jobboard.com"
              className="text-green-600 dark:text-green-400 hover:underline"
            >
              support@jobboard.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
