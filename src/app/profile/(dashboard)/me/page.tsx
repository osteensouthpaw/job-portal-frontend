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

const UserProfilePage = async () => {
  const jobSeekerProfile = await findJobSeekerProfile(user.id)
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
