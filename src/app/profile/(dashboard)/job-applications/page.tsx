import { columns } from "@/app/(main)/my-jobs/_components/Columns";
import Table from "@/components/general/Table";
import { userJobApplications } from "@/services/application-service";
import { cookies } from "next/headers";

const UserJobRegistrationPage = async () => {
  const cookieHeader = (await cookies()).toString();
  const jobPosts = await userJobApplications(cookieHeader);

  return (
    <Table
      columns={columns}
      content={jobPosts.content}
      description="Manage your job applications here. You can view, edit, or delete your applications."
      title="My Job Applications"
    />
  );
};

export default UserJobRegistrationPage;
