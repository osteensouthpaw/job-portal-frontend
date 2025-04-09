"use client";
import { Card } from "@/components/ui/card";
import { Calendar, Share, House, Clock, Heart } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DefinitionItem from "./DefinitionItem";
import { JobPostResponse } from "@/services/jobPost-service";
import { differenceInDays } from "date-fns";
import { useAuth } from "@/app/AuthProvider";
import Link from "next/link";

interface Props {
  jobPost: JobPostResponse;
}

const UserReactionCard = ({ jobPost }: Props) => {
  const { user } = useAuth();
  const difference = Math.abs(
    differenceInDays(new Date(), jobPost.applicationDeadline)
  ).toString();

  return (
    <Card className="shadow-none p-3 border-0 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center lg:flex-col lg:justify-normal lg:items-stretch">
        {jobPost.isOpen && user && (
          <>
            <div className="flex justify-between md:gap-6">
              <div className="flex flex-col">
                <p className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                <small>{user.email}</small>
              </div>
              <Badge>Eligible</Badge>
            </div>
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
        <Button
          variant={jobPost.isOpen ? "default" : "destructive"}
          disabled={!jobPost.isOpen}
          className="w-full md:w-max ml-auto lg:w-full"
        >
          {jobPost.isOpen ? "Apply" : "Closed"}
        </Button>
        {jobPost.recruiter.id == user?.id && (
          <Link href={`${jobPost.id}/edit`}>
            <Button className="w-full md:w-max ml-auto lg:w-full">Edit</Button>
          </Link>
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
  );
};

export default UserReactionCard;
