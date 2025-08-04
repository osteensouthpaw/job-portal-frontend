import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findApplicationByUser } from "@/services/application-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { redirect } from "next/navigation";
import JobApplicationForm from "../components/JobApplicationForm";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const JobApplicationPage = async ({ params }: Props) => {
  const { jobPostId } = await params;
  const jobSeekerProfile = await findJobSeekerProfile(user.id)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const jobApplication = await findApplicationByUser(
    parseInt(jobPostId),
    user.id
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));

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
        <JobApplicationForm jobSeekerProfile={jobSeekerProfile!} />
      </CardContent>
    </Card>
  );
};

export default JobApplicationPage;
