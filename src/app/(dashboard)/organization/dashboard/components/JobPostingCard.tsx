import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Calendar, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface JobPostingCardProps {
  jobId: number;
  title: string;
  department: string;
  postedDate: string;
  applicants: number;
  likes: number;
  deadline: string;
  onViewApplications?: () => void;
}

export function JobPostingCard({
  jobId,
  title,
  department,
  postedDate,
  applicants,
  likes,
  deadline,
  onViewApplications,
}: JobPostingCardProps) {
  const isExpired = new Date(deadline) < new Date();
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
                Posted: {new Date(postedDate).toLocaleDateString()}
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
              <Heart className="h-4 w-4" />
              <span className="text-sm">Likes</span>
            </div>
            <p className="text-foreground text-xl">{likes}</p>
          </div>
        </div>

        {/* Status & Deadline */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <Badge
            className={
              isExpired
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }
          >
            {isExpired ? "Expired" : "Active"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Deadline: {new Date(deadline).toDateString()}
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
          <Link href={`/job-listings/${jobId}/edit`}>
            <Button variant="outline" size="sm" className="flex-1">
              Edit Posting
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
