"use client";
import { jobApplicationColumns } from "@/app/(main)/job-listings/[jobPostId]/components/Columns";
import Table from "@/components/general/Table";
import { useJobApplications } from "@/hooks/useApplications";

const UserJobApplicationsPage = () => {
  const { data: jobApplications, isLoading, error } = useJobApplications();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading job applications.</p>;

  return (
    <Table
      searchField={"jobTitle"}
      columns={jobApplicationColumns}
      content={jobApplications!.content}
      description="Manage your job applications here. You can view, edit, or delete your applications."
      title="My Job Applications"
    />
  );
};

export default UserJobApplicationsPage;
