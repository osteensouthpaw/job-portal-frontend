import authService from "@/services/auth-service";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";
import UserProfile from "../../../profile/_components/UserProfile";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const UserProfilePage = async () => {
  const cookieHeader = (await cookies()).toString();
  const user = await authService.getSession(cookieHeader);
  if (!user) return redirect("/auth/login");

  const jobSeekerProfile = await findJobSeekerProfile(user.id, cookieHeader)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return jobSeekerProfile ? (
    <UserProfile jobSeekerProfile={jobSeekerProfile} />
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
