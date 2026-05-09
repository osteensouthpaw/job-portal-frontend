import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, Calendar, MoreVertical } from "lucide-react";

interface JobPostingCardProps {
  title: string;
  department: string;
  postedDate: string;
  applicants: number;
  views: number;
  status: "active" | "paused" | "closed";
  deadline: string;
  onViewApplications?: () => void;
}

export function JobPostingCard({
  title,
  department,
  postedDate,
  applicants,
  views,
  status,
  deadline,
  onViewApplications,
}: JobPostingCardProps) {
  const statusConfig = {
    active: {
      label: "Active",
      className:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    },
    paused: {
      label: "Paused",
      className:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    },
    closed: {
      label: "Closed",
      className:
        "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-foreground truncate pr-2">{title}</h3>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
              <span>{department}</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Posted {postedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">Applicants</span>
            </div>
            <p className="text-foreground text-xl">{applicants}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Views</span>
            </div>
            <p className="text-foreground text-xl">{views}</p>
          </div>
        </div>

        {/* Status & Deadline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <Badge className={config.className}>{config.label}</Badge>
          <span className="text-sm text-muted-foreground">
            Deadline: {deadline}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewApplications}
          >
            View Applicants
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit Posting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
