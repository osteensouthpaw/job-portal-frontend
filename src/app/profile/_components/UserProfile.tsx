"use client";
import { useAuth } from "@/app/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import Education from "./Education";
import ProfileHeader from "./ProfileHeader";
import Resume from "./Resume";
import SocialLinks from "./SocialLinks";
import UserBio from "./UserBio";
import UserSkills from "./UserSkills";
import WorkExperience from "./WorkExperience";

const UserProfile = ({ userId }: { userId: number }) => {
  const { user } = useAuth();
  const { data: jobSeekerProfile, error } = useJobSeekerProfile(userId);
  const isProfileOwner = !!(user && user.id === userId);

  if (!jobSeekerProfile) return notFound();

  if (error) {
    console.error("Error fetching job seeker profile:", error.message);
    toast.error(`${error.message || "Failed to load profile"}`);
    return (
      <Card>
        <CardContent>
          <p>Error loading profile. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

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
