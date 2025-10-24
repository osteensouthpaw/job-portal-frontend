import { useAuth } from "@/app/AuthProvider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobApplication } from "@/hooks/useApplications";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { ApplicationStatus } from "@/services/application-service";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { notFound, redirect } from "next/navigation";
import CancelApplicationButton from "./CancelApplicationButton";
import Experience from "./Experience";
import PersonalInfo from "./PersonalInfo";
import ViewResume from "./ViewResume";

const JobApplicationCard = ({ jobPostId }: { jobPostId: string }) => {
  const { user } = useAuth();

  if (!user) redirect("/login");

  const { data: jobApplication } = useJobApplication(
    parseInt(jobPostId),
    user.id
  );

  const { data: profile } = useJobSeekerProfile(user.id);

  if (!jobApplication || !profile) return notFound();

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

export default JobApplicationCard;
