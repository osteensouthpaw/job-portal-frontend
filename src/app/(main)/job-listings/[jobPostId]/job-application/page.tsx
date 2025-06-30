import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ApplicationStatus,
  findApplicationByUser,
} from "@/services/application-service";
import authService from "@/services/auth-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import CancelApplicationButton from "./CancelApplicationButton";
import Experience from "./Experience";
import PersonalInfo from "./PersonalInfo";
import ViewResume from "./ViewResume";
import { Badge } from "@/components/ui/badge";

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

  if (!jobApplication) return notFound();

  const profile = await findJobSeekerProfile(
    jobApplication.appliedUser.id,
    cookieHeader
  )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
  if (!profile) return notFound();

  return (
    <Card className="max-w-3xl mx-auto mt-10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            View Job Application
            <Badge
              variant={
                jobApplication.applicationStatus === ApplicationStatus.APPLIED
                  ? "default"
                  : jobApplication.applicationStatus ===
                    ApplicationStatus.ACCEPTED
                  ? "destructive"
                  : "secondary"
              }
            >
              {jobApplication.applicationStatus}
            </Badge>
          </CardTitle>
        </div>

        <CardDescription>
          Here is a summary of your job application details. You can cancel your
          application by clicking the "Cancel Application" button below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PersonalInfo
          email={jobApplication.appliedUser.email}
          firstName={jobApplication.appliedUser.firstName}
          lastName={jobApplication.appliedUser.lastName}
          phone={profile.phone}
        />
        <Separator />
        <Experience
          experience={2}
          location={jobApplication.appliedPost.location}
        />
        <Separator />
        <div>
          <h3 className="text-lg font-semibold mb-2">Cover Letter</h3>
          <div className="bg-muted p-4 rounded-md text-sm whitespace-pre-line">
            {jobApplication.coverLetter}
          </div>
        </div>
        <Separator />
        <ViewResume resumeUrl={jobApplication.resumeUrl} />
      </CardContent>
      <CardFooter>
        {jobApplication.applicationStatus === ApplicationStatus.APPLIED && (
          <CancelApplicationButton jobPostId={parseInt(jobPostId)} />
        )}
      </CardFooter>
    </Card>
  );
};

export default JobApplicationDetailPage;
