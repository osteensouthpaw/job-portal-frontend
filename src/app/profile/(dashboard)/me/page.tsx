"use client";
import { useAuth } from "@/app/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import Link from "next/link";
import { redirect } from "next/navigation";
import UserProfile from "../../../profile/_components/UserProfile";

const UserProfilePage = () => {
  const { user } = useAuth();

  if (!user) return redirect("/auth/login");
  const { data: jobSeekerProfile } = useJobSeekerProfile(user.id);

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
