import jobPostService from "@/services/jobPost-service";
import EligibilityCard from "./_components/EligibilityCard";
import JobDescriptionCard from "./_components/JobDescriptionCard";
import JobPostHeader from "./_components/JobPostHeader";
import UserReactionCard from "./_components/UserReactionCard";

interface Props {
  params: Promise<{ jobPostId: string }>;
}

const JobPostDetailPage = async ({ params }: Props) => {
  const { jobPostId } = await params;
  console.log(jobPostId);
  const jobPost = await jobPostService.getJobPostById(parseInt(jobPostId));

  return (
    <div className="mt-10">
      <div className="space-y-4 lg:hidden">
        <JobPostHeader jobPost={jobPost} />
        <div className="space-y-4">
          <UserReactionCard jobPost={jobPost} />
          <EligibilityCard />
        </div>
        <JobDescriptionCard jobPost={jobPost} />
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="space-y-16 col-span-2">
          <JobPostHeader jobPost={jobPost} />
          <JobDescriptionCard jobPost={jobPost} />
        </div>
        <div className="space-y-4 md:sticky top-28 self-start overflow-auto h-auto">
          <UserReactionCard jobPost={jobPost} />
          <EligibilityCard />
        </div>
      </div>
    </div>
  );
};

export default JobPostDetailPage;
