"use client";
import { useAuth } from "@/app/AuthProvider";
import { UserType } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import JobSeekerOnboarding from "./JobSeekerOnboarding";
import RecruiterForm from "./RecruiterForm";
import { useJobSeekerProfile } from "@/hooks/useProfiles";

const UserOnboading = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("auth/login");
  }, [user, router]);

  const { data: profile } = useJobSeekerProfile(user?.id);

  useEffect(() => {
    if (profile) router.push("/job-listings");
  }, [profile, router]);

  if (!user) return null;

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
