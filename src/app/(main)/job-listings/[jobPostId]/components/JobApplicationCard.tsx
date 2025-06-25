import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { JobApplicationResponse } from "@/services/application-service";

const JobApplicationDetailCard = ({
  jobApplication,
}: {
  jobApplication: JobApplicationResponse;
}) => {
  return (
    <Card className="p-4">
      <CardContent className="space-y-6">
        <div>
          <p className="text-lg font-semibold">Job Title</p>
          <p className="text-sm text-muted-foreground">
            {jobApplication.appliedPost.jobTitle}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">Company</p>
          <p className="text-sm text-muted-foreground">
            {jobApplication.appliedPost.organization.companyName}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">Application Status</p>
          <p className="text-sm text-muted-foreground">
            {new Date(jobApplication.applicationStatus).toDateString()}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">Application Date</p>
          <p className="text-sm text-muted-foreground">
            {new Date(jobApplication.appliedDate).toDateString()}
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">Application Deadline</p>
          <p className="text-sm text-muted-foreground">
            {new Date(
              jobApplication.appliedPost.applicationDeadline
            ).toDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobApplicationDetailCard;
