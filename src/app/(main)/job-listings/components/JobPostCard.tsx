import {
  experienceLevels,
  jobTypes,
  workModes,
} from "@/app/(main)/job-listings/components/JobFilter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToggleLike } from "@/hooks/useJobPosts";
import { JobPostResponse } from "@/services/jobPost-service";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import {
  Bookmark,
  BookmarkCheck,
  Briefcase,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  jobPost: JobPostResponse;
}

const JobPostCard = ({ jobPost }: Props) => {
  const { mutate, data: isSaved } = useToggleLike();
  const router = useRouter();
  const jobType = jobTypes.find((job) =>
    job.key.includes(jobPost.jobType)
  )?.label;
  const workMode = workModes.find((job) =>
    job.key.includes(jobPost.workMode)
  )?.label;
  const experienceLevel = experienceLevels.find((job) =>
    job.key.includes(jobPost.experienceLevel)
  )?.label;

  return (
    <Card key={jobPost.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Company Logo */}
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarFallback className="rounded-lg bg-muted">
              {jobPost.organization.companyName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-foreground mb-1 truncate">
                  {jobPost.jobTitle}
                </h3>
                <p className="text-muted-foreground truncate">
                  {jobPost.organization.companyName}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 dark:text-green-400 self-start"
                onClick={() => mutate(jobPost.id)}
              >
                {!!isSaved ? (
                  <BookmarkCheck className="h-5 w-5 fill-current" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </Button>
            </div>

            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {jobPost.description}
            </p>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-3 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {jobPost.location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {formatCurrency(jobPost.salary)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Posted {formatRelativeTime(new Date(jobPost.createdAt))}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {jobPost.totalApplications} applicants
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
              >
                {jobType}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
              >
                {workMode}
              </Badge>
              <Badge variant="outline">{experienceLevel}</Badge>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => router.push(`/job-listings/${jobPost.id}/apply`)}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              >
                Apply Now
              </Button>
              <Button
                onClick={() => router.push(`/job-listings/${jobPost.id}`)}
                variant="outline"
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostCard;
