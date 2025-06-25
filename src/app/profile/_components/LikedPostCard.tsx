"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import jobPostService, { JobPostResponse } from "@/services/jobPost-service";
import { formatCurrency } from "@/utils/formatCurrency";
import { Heart } from "lucide-react";
import Link from "next/link";

const LikedPostCard = ({ jobPost }: { jobPost: JobPostResponse }) => {
  const toggleLike = (id: number) => {
    jobPostService.toggleLike(id);
  };

  return (
    <Link href={`/job-listings/${jobPost.id}`}>
      <Card className="shadow-none transition-all duration-300 hover:border-primary relative">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-grow">
              <h1 className="text-xl md:text-xl font-semibold">
                {jobPost.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {jobPost.organization.companyName}
                </p>
                <span className="hidden md:inline text-muted-foreground">
                  •
                </span>
                <Badge className="rounded-full" variant="secondary">
                  {jobPost.jobType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  •
                </span>
                <Badge className="rounded-full">{jobPost.workMode}</Badge>
                <span className="hidden md:inline text-muted-foreground">
                  •
                </span>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(jobPost.salary)}
                </p>
              </div>
            </div>

            <div className="md:ml-auto">
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => toggleLike(jobPost.id)}>
                  <Heart className="cursor-pointer fill-red-600 text-red-500" />
                </Button>
              </div>
              <div className="text-muted-foreground text-sm">
                {new Date(jobPost.applicationDeadline).toDateString()}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default LikedPostCard;
