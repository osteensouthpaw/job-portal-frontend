import Deadline from "./_components/Deadline";
import EligibilityCard from "./_components/EligibilityCard";
import JobDescriptionCard from "./_components/JobDescriptionCard";
import JobPostHeader from "./_components/JobPostHeader";
import UserReactionCard from "./_components/UserReactionCard";

const JobPostDetailPage = () => {
  return (
    <div className="mt-10">
      <div className="space-y-4 lg:hidden">
        <JobPostHeader />
        <div className="space-y-4">
          <UserReactionCard />
          <EligibilityCard />
        </div>
        <JobDescriptionCard />
      </div>

      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="space-y-16 col-span-2">
          <JobPostHeader />
          <JobDescriptionCard />
        </div>
        <div className="space-y-4 md:sticky top-28 self-start overflow-auto h-auto">
          <UserReactionCard />
          <EligibilityCard />
        </div>
      </div>
    </div>
  );
};

export default JobPostDetailPage;
