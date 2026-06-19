"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import BusinessStreamCombobox from "@/app/onboarding/components/BusinessStreamCombobox";

import { Textarea } from "@/components/ui/textarea";
import {
  useBusinessStreams,
  useCreateOrganization,
} from "@/hooks/useRecruiterOrganization";
import { recruiterSchema } from "@/schemas/validationSchemas";
import { OrganizationCreateRequest } from "@/services/recruiter-organization-service";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  CalendarIcon,
  CheckCircle2,
  Globe,
  MapPin,
  Sparkles,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Progress } from "@/components/ui/progress";

type RecruiterFormData = z.infer<typeof recruiterSchema>;
export default function RecruiterForm() {
  const router = useRouter();
  const { data: businessStreams = [], isLoading } = useBusinessStreams();

  const createOrganizationMutation = useCreateOrganization(() => {
    toast.success("Organization profile created successfully!");
    router.push("/organization/dashboard");
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RecruiterFormData>({
    resolver: zodResolver(recruiterSchema),
    defaultValues: {
      companyName: "",
      companyLocation: "",
      businessStreamId: 0,
      websiteUrl: "",
      description: "",
      establishmentDate: new Date(),
    },
  });

  const description = watch("description");
  const descriptionProgress = Math.min(
    ((description?.length || 0) / 1000) * 100,
    100,
  );

  const onSubmit = async (data: RecruiterFormData) => {
    const establishmentDate = format(
      data.establishmentDate.toISOString(),
      "yyyy-MM-dd",
    );
    const payload: OrganizationCreateRequest = { ...data, establishmentDate };
    createOrganizationMutation.mutate(payload);
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
                  <div className="space-y-2 ">
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

                  <div className="space-y-2 ">
                    <Label
                      htmlFor="businessStreamId"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Industry <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="businessStreamId"
                      control={control}
                      rules={{
                        required: "Industry is required",
                      }}
                      render={({ field }) => (
                        <BusinessStreamCombobox
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                          error={Boolean(errors.businessStreamId)}
                          options={businessStreams}
                        />
                      )}
                    />
                    {errors.businessStreamId && (
                      <p className="text-red-500 text-sm">
                        {errors.businessStreamId.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="establishmentDate"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Establishment Date <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="establishmentDate"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${
                              errors.establishmentDate ? "border-red-500" : ""
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-gray-500">Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown"
                            fromYear={1950}
                            toYear={new Date().getFullYear()}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.establishmentDate && (
                    <p className="text-red-500 text-sm">
                      {errors.establishmentDate.message}
                    </p>
                  )}
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
                    {...register("description")}
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
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">
                    {description?.length || 0} / 1000 characters (minimum 50)
                  </span>
                  <Progress value={descriptionProgress} className="w-32 h-1" />
                </div>
              </div>

              {/* Location & Contact */}
              <div className="space-y-6 ">
                <div className="flex items-center gap-2 pb-2 border-b border-green-100 dark:border-green-900/30">
                  <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-900 dark:text-green-100">
                    Location & Contact
                  </h3>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2 ">
                    <Label
                      htmlFor="companyLocation"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Location <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="companyLocation"
                        {...register("companyLocation", {
                          required: "Company location is required",
                        })}
                        placeholder="e.g., San Francisco, CA, USA"
                        className={`pl-10 ${
                          errors.companyLocation ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.companyLocation && (
                      <p className="text-red-500 text-sm">
                        {errors.companyLocation.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="websiteUrl"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Company Website
                    </Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="websiteUrl"
                        type="url"
                        {...register("websiteUrl")}
                        placeholder="https://example.com"
                        className={`pl-10 ${
                          errors.websiteUrl ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="text-red-500 text-sm">
                        {errors.websiteUrl.message}
                      </p>
                    )}
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
