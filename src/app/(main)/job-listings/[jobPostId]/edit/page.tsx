"use client";
import JobPostForm from "@/app/(main)/post-job/_components/JobPostForm";
import Testimonials from "@/app/(main)/post-job/_components/Testimonials";
import { Card } from "@/components/ui/card";
import { useJobPost } from "@/hooks/useJobPosts";
import { useParams } from "next/navigation";

const EditJobPostPage = () => {
  const params = useParams();
  const id = params.jobPostId as string;
  const { data: jobPost, error } = useJobPost(parseInt(id));

  if (error) console.log(error);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
