import React from "react";
import JobApplicationForm from "../_components/JobApplicationForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import authService from "@/services/auth-service";
import { redirect } from "next/navigation";

const JobApplicationPage = async () => {
  const cookieHeader = (await cookies()).toString();
  const user = await authService.getSession(cookieHeader);
  if (!user) return redirect("/auth/login");
  const jobSeekerProfile = await findJobSeekerProfile(user.id, cookieHeader)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return (
    <Card>
      <CardHeader className="md:text-center">
        <CardTitle>Job Application Form</CardTitle>
        <CardDescription>
          Please fill out the form below to apply for the job.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <JobApplicationForm jobSeekerProfile={jobSeekerProfile!} />
      </CardContent>
    </Card>
  );
};

export default JobApplicationPage;
