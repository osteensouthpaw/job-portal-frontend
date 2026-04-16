import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { formatDate } from "date-fns";
import { Building2, Calendar } from "lucide-react";

interface ApplicationCardProps {
  application: JobApplicationResponse;
}

const statusMap: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  },
  APPLIED: {
    label: "Pending",
    className: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
  },
  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  },
};

export function ApplicationCard({
  application: { appliedPost, appliedDate, applicationStatus },
}: ApplicationCardProps) {
  const config = statusMap[applicationStatus];
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 rounded-lg">
            {/* <AvatarImage src={logo} /> */}
            <AvatarFallback className="rounded-lg bg-muted">
              {appliedPost.jobTitle.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
              <h4 className="text-foreground truncate">
                {appliedPost.jobTitle}
              </h4>
              <Badge className={config.className}>{config.label}</Badge>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {appliedPost.organization.companyName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Applied {formatRelativeTime(new Date(appliedDate))}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
