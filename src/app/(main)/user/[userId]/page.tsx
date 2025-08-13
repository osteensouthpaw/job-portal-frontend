import { findJobSeekerProfile } from "@/services/profile-service";
import UserProfile from "../../../profile/_components/UserProfile";

interface Props {
  params: Promise<{ userId: string }>;
}

const UserProfilePage = async ({ params }: Props) => {
  const userId = (await params).userId;
  return <UserProfile userId={parseInt(userId)} />;
};

export default UserProfilePage;
