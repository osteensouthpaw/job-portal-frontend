import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findApplicationByUser } from "@/services/application-service";
import authService from "@/services/auth-service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import JobApplicationDetailCard from "../components/JobApplicationCard";
import CancelApplicationButton from "./CancelApplicationButton";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const JobApplicationDetailPage = async ({ params }: Props) => {
  const { jobPostId } = await params;
  const cookieHeader = (await cookies()).toString();
  const user = await authService.getSession(cookieHeader);
  if (!user) return notFound();
  const jobApplication = await findApplicationByUser(
    parseInt(jobPostId),
    user.id,
    cookieHeader
  )
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Application Details</CardTitle>
        <CardDescription>
          Here you can view the details of your job application, including the
          job title, company, and your application status.
        </CardDescription>
        <CancelApplicationButton jobPostId={parseInt(jobPostId)} />
      </CardHeader>
      <CardContent className="p-6">
        <JobApplicationDetailCard jobApplication={jobApplication!} />
      </CardContent>
    </Card>
  );
};

export default JobApplicationDetailPage;
