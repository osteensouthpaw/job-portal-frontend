"use client";
import { useAuth } from "@/app/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { JobPostResponse } from "@/services/jobPost-service";
import {
  findJobSeekerProfile,
  JobSeekerProfileResponse,
} from "@/services/profile-service";
import { differenceInDays } from "date-fns";
import { Calendar, Clock, Heart, House, Share } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DefinitionItem from "./DefinitionItem";

interface Props {
  jobPost: JobPostResponse;
}

const UserReactionCard = ({ jobPost }: Props) => {
  const [jobSeekerProfile, setJobSeekerProfile] =
    useState<JobSeekerProfileResponse>();
  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const difference = Math.abs(
    differenceInDays(new Date(), jobPost.applicationDeadline)
  ).toString();

  useEffect(() => {
    findJobSeekerProfile(user?.id || 0)
      .then((res) => setJobSeekerProfile(res.data))
      .catch((err) => {
        console.log(err);
      });
  });

  const isElligible =
    jobSeekerProfile?.experienceLevel === jobPost.experienceLevel;
  return (
    <>
      <Card className="shadow-none p-3 border-0 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center lg:flex-col lg:justify-normal lg:items-stretch">
          {jobPost.isOpen && user && (
            <>
              {isElligible && (
                <div className="flex justify-between md:gap-6">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                    <small>{user.email}</small>
                  </div>
                  <Badge>Eligible</Badge>
                </div>
              )}
              <div className="flex justify-between">
                <div className="flex">
                  <Button variant="ghost">
                    <Heart />
                  </Button>
                  <Button variant="ghost">
                    <Calendar />
                  </Button>
                </div>
                <Button variant="outline">
                  <Share />
                </Button>
              </div>
            </>
          )}

          {jobPost.recruiter.id === user?.id ? (
            <Button className="w-full md:w-max ml-auto lg:w-full">
              <Link href={`${jobPost.id}/edit`}>Edit</Link>
            </Button>
          ) : (
            <Button
              variant={jobPost.isOpen ? "default" : "destructive"}
              disabled={!jobPost.isOpen}
              className="w-full md:w-max ml-auto lg:w-full"
              onClick={() =>
                !user
                  ? router.push("/auth/login")
                  : !isElligible
                  ? setOpen(true)
                  : router.push(`${jobPost.id}/apply`)
              }
            >
              {jobPost.isOpen ? "Apply" : "Closed"}
            </Button>
          )}
        </div>
        <hr />
        <div className="flex flex-col gap-4 md:flex-row md:justify-between lg:flex-col lg:justify-normal flex-wrap">
          <DefinitionItem
            term="Applied"
            description={jobPost.totalApplications.toString()}
          >
            <House />
          </DefinitionItem>
          <DefinitionItem
            term="Impressions"
            description={jobPost.totalLikes.toString()}
          >
            <House />
          </DefinitionItem>
          <DefinitionItem
            term="Application Deadline"
            description={`${difference} days ${
              jobPost.isOpen ? "remaining" : "passed"
            }`}
          >
            <Clock />
          </DefinitionItem>
        </div>
      </Card>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle>Job Application</DialogTitle>
            <DialogDescription>
              You are not elligible for this job. Your application may not be
              considered. Continue anyway?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => router.push(`${jobPost.id}/apply`)}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserReactionCard;
