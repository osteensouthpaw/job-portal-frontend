import JobPostForm from "@/app/(main)/post-job/_components/JobPostForm";
import Testimonials from "@/app/(main)/post-job/_components/Testimonials";
import { Card } from "@/components/ui/card";
import jobPostService from "@/services/jobPost-service";
import React from "react";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const EditJobPostPage = async ({ params }: Props) => {
  const { jobPostId } = await params;
  const jobPost = await jobPostService.getJobPostById(parseInt(jobPostId));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
      <div className="lg:col-span-2">
        <Card>
          <JobPostForm jobPost={jobPost} />
        </Card>
      </div>
      <div className="col-span-1">
        <Testimonials />
      </div>
    </div>
  );
};

export default EditJobPostPage;
