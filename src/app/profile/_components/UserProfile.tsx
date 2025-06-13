"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { JobSeekerProfileResponse } from "@/services/profile-service";
import Education from "./Education";
import ProfileHeader from "./ProfileHeader";
import Resume from "./Resume";
import SocialLinks from "./SocialLinks";
import UserBio from "./UserBio";
import UserSkills from "./UserSkills";
import WorkExperience from "./WorkExperience";
import { useAuth } from "@/app/AuthProvider";
import { Separator } from "@/components/ui/separator";

const UserProfile = ({
  jobSeekerProfile,
}: {
  jobSeekerProfile: JobSeekerProfileResponse;
}) => {
  const { user } = useAuth();
  const isProfileOwner = !!(user && user.id === jobSeekerProfile.jobSeeker.id);

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <ProfileHeader
            jobSeekerProfile={jobSeekerProfile}
            isProfileOwner={isProfileOwner}
          />
        </CardHeader>
      </Card>
      <Card className="border-0 shadow-none dark:border dark:shadow-md">
        <CardHeader>
          <CardDescription>{jobSeekerProfile.profession}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <UserBio
            about={jobSeekerProfile.bio || " "}
            isProfileOwner={isProfileOwner}
          />{" "}
          {/* user about */}
          <Separator />
          <Resume isProfileOwner={isProfileOwner} />
          <Separator />
          <UserSkills
            skillSet={jobSeekerProfile.skills}
            isProfileOwner={isProfileOwner}
          />
          <Separator />
          <WorkExperience
            experiences={jobSeekerProfile.experiences}
            isProfileOwner={isProfileOwner}
          />
          <Separator />
          <Education
            educationList={jobSeekerProfile.educations}
            isProfileOwner={isProfileOwner}
          />
          <Separator />
          <SocialLinks
            linkedin={jobSeekerProfile.linkedInUrl}
            github={jobSeekerProfile.gitHubUrl}
            twitter={jobSeekerProfile.twitterUrl}
            personalWebsite={jobSeekerProfile.personalWebsiteUrl}
            isProfileOwner={isProfileOwner}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserProfile;
