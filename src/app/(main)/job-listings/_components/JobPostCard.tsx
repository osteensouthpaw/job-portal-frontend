import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface Props {
  jobPost: JobPostResponse;
}

const JobPostCard = ({ jobPost }: Props) => {
  return (
    <Link href={`job-listings/${jobPost.id}`}>
      <Card className="shadow-none transition-all duration-300 hover:border-primary relative">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-grow">
              <h1 className="text-xl md:text-2xl font-bold">
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
                <MapPin className="size-4" />
                <h1 className="text-base md:text-lg font-semibold whitespace-nowrap">
                  {jobPost.location}
                </h1>
              </div>
              <p className="text-sm text-muted-foreground md:text-right">
                {formatRelativeTime(new Date(jobPost.createdAt))} ago
              </p>
            </div>
          </div>
          <div className="!mt-5">
            <p className="text-base text-muted-foreground line-clamp-2">
              {jobPost.description}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default JobPostCard;
