import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { JobPostResponse } from "@/services/jobPost-service";
import { TrendingUp } from "lucide-react";

interface TopPerformingJobsProps {
  jobs: JobPostResponse[];
  isLoading?: boolean;
}

const getApplicationRate = (applicants: number, maxApplicants?: number) => {
  if (!maxApplicants || maxApplicants <= 0) return 0;
  return Math.min(Math.round((applicants / maxApplicants) * 100), 100);
};

export function TopPerformingJobs({
  jobs,
  isLoading = false,
}: TopPerformingJobsProps) {
  const topJobs = [...jobs]
    .sort((a, b) => b.totalApplications - a.totalApplications)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Top Performing Jobs</CardTitle>
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <Skeleton className="h-5 w-2/5" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-2 flex-1" />
                  <Skeleton className="h-4 w-10" />
                </div>
              </div>
            ))
          ) : topJobs.length > 0 ? (
            topJobs.map((job) => {
              const applicationRate = getApplicationRate(
                job.totalApplications,
                job.maxApplications,
              );

              return (
                <div key={job.id}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="truncate pr-2 text-sm text-foreground sm:text-base">
                      {job.jobTitle}
                    </p>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      {job.totalApplications}{" "}
                      {job.totalApplications === 1 ? "applicant" : "applicants"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={applicationRate} className="h-2 flex-1" />
                    <span className="whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                      {applicationRate}%
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No job performance data available yet.
            </div>
          )}
        </div>
        {!isLoading && topJobs.length > 0 && (
          <div className="mt-4 text-xs text-muted-foreground">
            Percentage shows applications received against each job&apos;s
            maximum application limit.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
