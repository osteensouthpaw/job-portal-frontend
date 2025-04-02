import jobPostService from "@/services/jobPost-service";
import JobDetailsCard from "./_components/JobDetailsCard";
import JobDescriptionCard from "./_components/JobDescriptionCard";
import JobPostHeader from "./_components/JobPostHeader";
import UserReactionCard from "./_components/UserReactionCard";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const JobPostDetailPage = async ({ params }: Props) => {
  const { jobPostId } = await params;
  const jobPost = await jobPostService.getJobPostById(parseInt(jobPostId));

  return (
    <div className="mt-10">
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
