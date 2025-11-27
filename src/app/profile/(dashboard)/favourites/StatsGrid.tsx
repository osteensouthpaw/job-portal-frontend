import { Card, CardContent } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import {
  AlertCircle,
  BookmarkCheck,
  Briefcase,
  TrendingUp,
} from "lucide-react";

interface Props {
  savedJobs?: JobPostResponse[];
}

const StatsGrid = ({ savedJobs }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* total saved jobs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <BookmarkCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total Saved</p>
              <p className="text-foreground">{savedJobs?.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* average Match score */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Avg. Match Score</p>
              <p className="text-foreground">
                {savedJobs && savedJobs.length > 0
                  ? Math.round(
                      savedJobs.reduce(
                        (sum, job) => sum + (job.totalApplications || 0),
                        0
                      ) / savedJobs.length
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Remote Jobs</p>
              <p className="text-foreground">
                {savedJobs?.filter((job) => job.jobType).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expired */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Closed</p>
              <p className="text-foreground">
                {savedJobs?.filter((job) => !job.isOpen).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsGrid;
