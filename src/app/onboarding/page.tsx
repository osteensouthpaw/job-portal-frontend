"use client";
import { useAuth } from "@/app/AuthProvider";
import { UserType } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import RecruiterForm from "./RecruiterForm";
import JobSeekerOnboarding from "./JobSeekerOnboarding";
import { useJobSeekerProfile } from "@/hooks/useProfiles";

const UserOnboading = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: profile } = useJobSeekerProfile();

  if (profile) {
    router.push("/job-listings");
    return;
  }

  if (user === null) {
    router.push("/auth/login");
    return;
  }

  return (
    <div className="w-full">
      {user.userType === UserType.RECRUITER ? (
        <RecruiterForm />
      ) : (
        <JobSeekerOnboarding
          jobSeekerId={user.id}
          onComplete={() => router.push("/job-listings")}
        />
      )}
    </div>
  );
};

export default UserOnboading;
