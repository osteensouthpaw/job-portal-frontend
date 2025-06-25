import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import authService from "@/services/auth-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import JobApplicationForm from "../components/JobApplicationForm";

const JobApplicationPage = async () => {
  const cookieHeader = (await cookies()).toString();
  const user = await authService.getSession(cookieHeader);
  if (!user) return redirect("/auth/login");
  const jobSeekerProfile = await findJobSeekerProfile(user.id, cookieHeader)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // check if an application exists and redirect to the application

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
