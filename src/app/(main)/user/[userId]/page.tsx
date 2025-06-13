import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import UserProfile from "../../../profile/_components/UserProfile";

interface Props {
  params: Promise<{ userId: string }>;
}

const UserProfilePage = async ({ params }: Props) => {
  const { userId } = await params;
  const cookieHeader = (await cookies()).toString();
  const jobSeekerProfile = await findJobSeekerProfile(
    parseInt(userId),
    cookieHeader
  );

  return <UserProfile jobSeekerProfile={jobSeekerProfile} />;
};

export default UserProfilePage;
