import authService from "@/services/auth-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import UserProfile from "../../../profile/_components/UserProfile";
import { redirect } from "next/navigation";

const UserProfilePage = async () => {
  const cookieHeader = (await cookies()).toString();
  const user = await authService.getSession(cookieHeader);
  if (!user) return redirect("/auth/login");

  const jobSeekerProfile = await findJobSeekerProfile(user.id, cookieHeader);
  console.log(jobSeekerProfile);

  return <UserProfile jobSeekerProfile={jobSeekerProfile} />;
};

export default UserProfilePage;
