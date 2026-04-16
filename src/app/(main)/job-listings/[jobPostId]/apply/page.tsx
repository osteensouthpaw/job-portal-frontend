"use client";
import AdditionalInfoSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/AdditionalInfoSection";
import CoverLetterSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/CoverLetterSection";
import DocumentsSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/DocumentsSection";
import PersonalInfoSection, {
  ApplicationFormData,
} from "@/app/(main)/job-listings/[jobPostId]/apply/sections/PersonalInfoSection";
import ProfessionalDetailsSection from "@/app/(main)/job-listings/[jobPostId]/apply/sections/ProfessionalDetailsSection";
import { useAuth } from "@/app/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  useCreateJobApplication,
  useJobApplication,
} from "@/hooks/useApplications";
import { useJobPost } from "@/hooks/useJobPosts";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { notFound, redirect, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import ApplicationSuccessCard from "./ApplicationSuccessCard";
import JobPostDisplayCard from "./JobPostDisplayCard";

export default function JobApplicationPage() {
  const params = useParams();
  const jobPostId = params.jobPostId as string;
  const router = useRouter();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;

  const { data: jobApplication, isPending } = useJobApplication(
    Number(jobPostId),
    user.id
  );

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

  const { data: jobPost, isLoading } = useJobPost(Number(jobPostId));

  if (isLoading || isPending) {
    return "Loading...";
  }

  if (!jobPost) return notFound();

  if (jobApplication)
    return redirect(`/job-listings/${jobPostId}/job-application`);

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

        <JobPostDisplayCard jobPost={jobPost} />

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
                disabled={isSubmitting || !methods.formState.isValid}
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
