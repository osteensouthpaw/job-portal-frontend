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
import { useJobApplication } from "@/hooks/useApplications";
import {
  useDeleteJobPost,
  useIsLikedJobPost,
  useToggleLike,
} from "@/hooks/useJobPosts";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { JobPostResponse } from "@/services/jobPost-service";
import { differenceInDays } from "date-fns";
import {
  Calendar,
  Clock,
  Edit,
  Heart,
  House,
  Share,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DefinitionItem from "./DefinitionItem";
import { UserType } from "@/services/auth-service";
import { toast } from "sonner";

interface Props {
  jobPost: JobPostResponse;
}

const UserReactionCard = ({ jobPost }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { mutate } = useToggleLike();

  const isJobSeeker = user?.userType.includes(UserType.JOB_SEEKER);
  const { data: jobSeekerProfile } = useJobSeekerProfile(user?.id, isJobSeeker);
  const { data: jobApplication } = useJobApplication(jobPost.id, user?.id);
  const { data: isLiked } = useIsLikedJobPost(jobPost.id, user?.id);

  const difference = Math.abs(
    differenceInDays(new Date(), jobPost.applicationDeadline)
  ).toString();

  const isElligible =
    jobSeekerProfile?.experienceLevel === jobPost.experienceLevel;

  const { mutate: deleteJobPost, isSuccess, isPending } = useDeleteJobPost();

  const deletePost = (jobPostId: number) => {
    deleteJobPost(jobPostId);
    if (isSuccess) {
      setDeleteOpen(false);
    }
  };

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
                  <Button variant="ghost" onClick={() => mutate(jobPost.id)}>
                    <Heart
                      className={`${
                        isLiked && "cursor-pointer fill-red-600 text-red-500"
                      }`}
                    />
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
            <div className="flex gap-2">
              <Button
                className="w-full md:w-max ml-auto lg:w-full"
                onClick={() => router.push(`${jobPost.id}/edit`)}
              >
                Edit <Edit />
              </Button>
              <Button
                variant="destructive"
                className={`w-full md:w-max ml-auto lg:w-full`}
                disabled={isPending}
                onClick={() => setDeleteOpen(true)}
              >
                Delete <Trash />
              </Button>
            </div>
          ) : (
            <Button
              variant={jobPost.isOpen ? "default" : "destructive"}
              disabled={!jobPost.isOpen}
              className={`w-full md:w-max ml-auto lg:w-full ${
                user?.userType.includes(UserType.RECRUITER) && "hidden"
              }`}
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

          {/* //if is already applied, show application status */}
          {jobApplication && (
            <Button
              className="bg-orange-600/90"
              onClick={() => router.push(`${jobPost.id}/job-application`)}
            >
              <p className="capitalize text-base flex items-center gap-2">
                {jobApplication.applicationStatus.toLocaleLowerCase()}
                <Edit />
              </p>
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
      <Dialog open={isDeleteOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              This action is irreversable. Continue anyway?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setDeleteOpen(false)} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={() => deletePost(jobPost.id)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserReactionCard;
