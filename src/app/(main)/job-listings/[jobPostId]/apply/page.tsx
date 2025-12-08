"use client";
import { Button } from "@/components/ui/button";
import { useJobPost } from "@/hooks/useJobPosts";
import { ArrowLeft } from "lucide-react";
import { notFound, useParams, useRouter } from "next/navigation";
import JobApplicationForm from "./JobApplicationForm";
import JobOverviewCard from "./JobOverviewCard";

const JobApplicationPage = () => {
  const params = useParams();
  const jobPostId = parseInt(params.jobPostId as string);
  const { data: jobPost } = useJobPost(jobPostId);
  const router = useRouter();

  if (!jobPost) return notFound();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex-1">
            <h1 className="text-foreground">Apply for Position</h1>
            <p className="text-muted-foreground">
              Complete the application form below
            </p>
          </div>
        </div>
        <JobOverviewCard job={jobPost} />
        <JobApplicationForm jobPost={jobPost} />
      </div>
    </div>
  );
};

export default JobApplicationPage;
