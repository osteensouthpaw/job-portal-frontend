import { Card, CardContent } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Clock,
} from "lucide-react";
import React from "react";

const JobPostDisplayCard = ({ jobPost }: { jobPost: JobPostResponse }) => {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Building2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-1">{jobPost.jobTitle}</h3>
            <p className="text-muted-foreground mb-3">
              {jobPost.organization.companyName}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {jobPost.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {jobPost.jobType}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {jobPost.salary}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {jobPost.experienceLevel}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Posted {jobPost.createdAt}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostDisplayCard;
