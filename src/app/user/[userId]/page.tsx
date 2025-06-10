import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import UserBio from "../_components/UserBio";
import UserSkills from "../_components/UserSkills";
import { Separator } from "@/components/ui/separator";
import WorkExperience from "../_components/WorkExperience";
import Education from "../_components/Education";
import SocialLinks from "../_components/SocialLinks";
import Resume from "../_components/Resume";
import ProfileHeader from "../_components/ProfileHeader";
import { findJobSeekerProfile } from "@/services/profile-service";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ userId: string }>;
}

const UserProfilePage = async ({ params }: Props) => {
  const { userId } = await params;
  const cookieHeader = (await cookies()).toString();
  const jobSeekerProfile = await findJobSeekerProfile(
    parseInt(userId),
    cookieHeader
  );

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <ProfileHeader jobSeekerProfile={jobSeekerProfile} />
        </CardHeader>
      </Card>
      <Card className="border-0 shadow-none dark:border dark:shadow-md">
        <CardHeader>
          <CardDescription>profile description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <UserBio about={jobSeekerProfile.bio || " "} /> {/* user about */}
          <Separator />
          <Resume />
          <Separator />
          <UserSkills skillSet={jobSeekerProfile.skills} />
          <Separator />
          <WorkExperience experiences={jobSeekerProfile.experiences} />
          <Separator />
          <Education educationList={jobSeekerProfile.educations} />
          <Separator />
          <SocialLinks
            linkedin={jobSeekerProfile.linkedInUrl}
            github={jobSeekerProfile.gitHubUrl}
            twitter={jobSeekerProfile.twitterUrl}
            personalWebsite={jobSeekerProfile.personalWebsiteUrl}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfilePage;
