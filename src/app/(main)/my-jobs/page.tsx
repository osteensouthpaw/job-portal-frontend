import jobPostService from "@/services/jobPost-service";
import { jobPostColumns } from "../job-listings/[jobPostId]/components/Columns";
import Table from "@/components/general/Table";

const MyJobsPage = async () => {
  const jobPosts = await jobPostService.jobPosts();

  return (
    <Table
      searchField="jobTitle"
      columns={jobPostColumns}
      content={jobPosts.content}
      description="Manage your job listings here. You can view, edit, or delete your jobs."
      title="My Job Listings"
    />
  );
};

export default MyJobsPage;
