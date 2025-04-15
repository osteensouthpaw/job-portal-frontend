import { Card, CardContent } from "@/components/ui/card";
import UserBio from "../_components/UserBio";
import UserSkills from "../_components/UserSkills";
import { Separator } from "@/components/ui/separator";
import WorkExperience from "../_components/WorkExperience";
import Education from "../_components/Education";
import SocialLinks from "../_components/SocialLinks";
import Resume from "../_components/Resume";

const UserProfilePage = () => {
  return (
    <Card className="border-0 shadow-none dark:border dark:shadow-md">
      <CardContent className="space-y-6">
        <UserBio /> {/* user about */}
        <Separator />
        <Resume />
        <Separator />
        <UserSkills />
        <Separator />
        <WorkExperience />
        <Separator />
        <Education />
        <Separator />
        <SocialLinks />
        <Separator />
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
