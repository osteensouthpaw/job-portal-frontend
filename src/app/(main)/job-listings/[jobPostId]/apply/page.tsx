"use client";
import AdditionalInfoSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/AdditionalInfoSection";
import CoverLetterSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/CoverLetterSection";
import DocumentsSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/DocumentsSection";
import PersonalInfoSection, {
  ApplicationFormData,
} from "@/app/(main)/job-listings/[jobPostId]/apply/sections/PersonalInfoSection";
import ProfessionalDetailsSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/ProfessionalDetailsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateJobApplication } from "@/hooks/useApplications";
import { useJobPost } from "@/hooks/useJobPosts";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ApplicationSuccessCard from "./ApplicationSuccessCard";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function getErrorMessages(errors: any) {
  return Object.entries(errors).map(([field, error]) => {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return `${field}: ${error.message}`;
    }
    return `${field}: Invalid value`;
  });
}

export default function JobApplicationPage() {
  const params = useParams();
  const jobPostId = params.jobPostId as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<ApplicationFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      portfolio: "",
      linkedin: "",
      github: "",
      coverLetter: "",
      yearsOfExperience: "3-5",
      currentCompany: "",
      currentRole: "",
      noticePeriod: "2 weeks",
      expectedSalary: "",
      willingToRelocate: false,
      remotePreferred: false,
      additionalInfo: "",
      resume: undefined,
      portfolio_file: undefined,
    },
    mode: "onChange",
  });

  const { data: jobPost, isLoading } = useJobPost(Number(jobPostId));

  if (isLoading) {
    return "Loading...";
  }

  if (!jobPost) return notFound();

  const {
    mutate: createJobApplication,
    isSuccess: isSubmitted,
    isPending: isSubmitting,
  } = useCreateJobApplication(() => {
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    toast.success("Application submitted successfully");
  });

  const onFormSubmit = async (data: ApplicationFormData) => {
    createJobApplication({
      jobPostId: Number(jobPost.id),
      resumeUrl: data.resume || "",
      coverLetter: data.coverLetter,
    });
  };

  if (isSubmitted) {
    return <ApplicationSuccessCard jobPost={jobPost} />;
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-foreground">Apply for Position</h1>
            <p className="text-muted-foreground">
              Complete the application form below
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-foreground mb-1">{jobPost.jobTitle}</h3>
                <p className="text-muted-foreground mb-3">
                  {jobPost.organization.companyName}
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {jobPost.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {jobPost.jobType}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {jobPost.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {jobPost.experienceLevel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Posted {jobPost.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <PersonalInfoSection />
            <CoverLetterSection />
            <ProfessionalDetailsSection />
            <DocumentsSection />
            <AdditionalInfoSection />
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {Object.keys(methods.formState.errors).length > 0 && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="text-sm text-destructive mb-1">
                    Please fix the following errors:
                  </p>
                  <ul className="text-xs text-destructive space-y-1 list-disc list-inside">
                    {getErrorMessages(methods.formState.errors).map(
                      (msg, idx) => (
                        <li key={idx}>{msg}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
