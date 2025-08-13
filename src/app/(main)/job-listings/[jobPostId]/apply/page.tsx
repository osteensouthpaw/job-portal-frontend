"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findApplicationByUser } from "@/services/application-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { redirect, useParams } from "next/navigation";
import JobApplicationForm from "../components/JobApplicationForm";
import { useAuth } from "@/app/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const JobApplicationPage = () => {
  const params = useParams();
  const jobPostId = parseInt(params.jobPostId as string);
  const { user } = useAuth();

  if (!user) return redirect("/auth/login");

  const { data: jobSeekerProfile } = useQuery({
    queryKey: ["job-seeker-profile", user.id],
    queryFn: () => findJobSeekerProfile(user.id).then((res) => res.data),
  });

  const { data: jobApplication } = useQuery({
    queryKey: ["job-application", jobPostId],
    queryFn: () =>
      findApplicationByUser(jobPostId, user.id).then((res) => res.data),
  });

  if (!jobSeekerProfile) {
    return redirect("/onboarding");
  }

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
