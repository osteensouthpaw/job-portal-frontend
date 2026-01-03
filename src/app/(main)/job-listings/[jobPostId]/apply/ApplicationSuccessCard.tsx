import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ApplicationSuccessCard = ({ jobPost }: { jobPost: JobPostResponse }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-foreground mb-3">Application Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Your application for{" "}
            <span className="text-foreground">{jobPost.jobTitle}</span> at{" "}
            <span className="text-foreground">
              {jobPost.organization.companyName}
            </span>{" "}
            has been successfully submitted.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
            <p className="text-green-900 dark:text-green-300 text-sm">
              You will receive a confirmation email shortly. The hiring team
              typically responds within 3-5 business days.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
            <Button
              onClick={() => router.push("/job-listings")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Apply to Another Job
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationSuccessCard;
