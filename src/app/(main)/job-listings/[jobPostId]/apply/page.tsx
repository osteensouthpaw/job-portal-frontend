"use client";
import { useAuth } from "@/app/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobApplication } from "@/hooks/useApplications";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { redirect, useParams } from "next/navigation";
import JobApplicationForm from "../components/JobApplicationForm";

const JobApplicationPage = () => {
  const params = useParams();
  const jobPostId = parseInt(params.jobPostId as string);
  const { user } = useAuth();

  if (!user) return redirect("/auth/login");
  const { data: jobSeekerProfile } = useJobSeekerProfile(user.id);
  const { data: jobApplication } = useJobApplication(jobPostId, user.id);

  if (!jobSeekerProfile) return redirect("/onboarding");

  if (jobApplication)
    return redirect(`/job-listings/${jobPostId}/job-application`);

  return (
    <Card>
      <CardHeader className="md:text-center">
        <CardTitle>Job Application Form</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for the job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobApplicationForm jobSeekerProfile={jobSeekerProfile} />
      </CardContent>
    </Card>
  );
};

export default JobApplicationPage;
