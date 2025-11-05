"use client";
import { useJobPost } from "@/hooks/useJobPosts";
import JobDescriptionCard from "./components/JobDescriptionCard";
import JobDetailsCard from "./components/JobDetailsCard";
import JobPostHeader from "./components/JobPostHeader";
import UserReactionCard from "./components/UserReactionCard";
import { notFound, useParams } from "next/navigation";

const JobPostDetailPage = () => {
  const params = useParams();
  const id = params.jobPostId as string;
  const { data: jobPost, error, isLoading } = useJobPost(parseInt(id));

  if (isLoading) return <div>Loading</div>;
  if (error) console.log(error);
  if (!jobPost) return notFound();

  return (
    <div>
      <div className="space-y-4 lg:hidden">
        <JobPostHeader jobPost={jobPost} />
        <div className="space-y-4">
          <UserReactionCard jobPost={jobPost} />
          <JobDetailsCard jobPost={jobPost} />
        </div>
        <JobDescriptionCard jobPost={jobPost} />
      </div>

      {/* large screen display */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="space-y-16 col-span-2">
          <JobPostHeader jobPost={jobPost} />
          <JobDescriptionCard jobPost={jobPost} />
        </div>
        <div className="space-y-4 md:sticky top-28 self-start overflow-auto h-auto">
          <UserReactionCard jobPost={jobPost} />
          <JobDetailsCard jobPost={jobPost} />
        </div>
      </div>
    </div>
  );
};

export default JobPostDetailPage;
