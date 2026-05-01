"use client";
import { useAuth } from "@/app/AuthProvider";
import { UserType } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import RecruiterForm from "./RecruiterForm";
import JobSeekerOnboarding from "./JobSeekerOnboarding";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { useEffect } from "react";

const UserOnboading = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { data: profile } = useJobSeekerProfile();

  useEffect(() => {
    if (profile) {
      router.push("/job-listings");
    } else if (user === null) {
      router.push("/auth/login");
    }
  }, [profile, user, router]);

  if (profile || user === null) {
    return null;
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
