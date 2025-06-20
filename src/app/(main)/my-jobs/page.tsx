import jobPostService from "@/services/jobPost-service";
import { columns } from "./_components/Columns";
import Table from "@/components/general/Table";

const MyJobsPage = async () => {
  const jobPosts = await jobPostService.jobPosts();

  <Table
    columns={columns}
    content={jobPosts.content}
    description="Manage your job listings here. You can view, edit, or delete your jobs."
    title="My Job Listings"
  />;
};

export default MyJobsPage;
