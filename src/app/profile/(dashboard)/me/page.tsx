"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findJobSeekerProfile } from "@/services/profile-service";
import Link from "next/link";
import UserProfile from "../../../profile/_components/UserProfile";
import { useAuth } from "@/app/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) return redirect("/auth/login");

  const { data: jobSeekerProfile } = useQuery({
    queryKey: ["job-seeker-profile", user.id],
    queryFn: () => findJobSeekerProfile(user.id).then((res) => res.data),
  });

  return jobSeekerProfile ? (
    <UserProfile userId={user.id} />
  ) : (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile</CardTitle>
        <CardDescription>
          Your profile is not yet complete. Click this link below to complete
          your profile for it to be visible to employers and hiring managers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-secondary-foreground">
          Continue with this{" "}
          <Link href="/onboarding" className="text-primary">
            link
          </Link>{" "}
          to complete your profile
        </p>
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
