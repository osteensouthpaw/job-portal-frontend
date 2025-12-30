"use client";
import { useAuth } from "@/app/AuthProvider";
import { useRouter } from "next/navigation";
import { ProfilePage } from "../../components/JobSeekerProfile";

const UserProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/auth/login");
    return;
  }

  return <ProfilePage user={user} />;
};

export default UserProfilePage;
