import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import { JobPostResponse } from "@/services/jobPost-service";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

interface PerformanceSummaryCardProps {
  applications: JobApplicationResponse[];
  jobs: JobPostResponse[];
  totalApplications?: number;
  isLoading?: boolean;
  isError?: boolean;
}

const getPercent = (value: number, total: number) => {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
};

const getDate = (date: string) => {
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? parsedDate : null;
};

const getAverageDaysToHire = (applications: JobApplicationResponse[]) => {
  const acceptedApplications = applications.filter(
    (application) =>
      application.applicationStatus === ApplicationStatus.ACCEPTED,
  );

  const daysToHire = acceptedApplications
    .map((application) => {
      const postedDate = getDate(application.appliedPost.createdAt);
      const appliedDate = getDate(application.appliedDate);

      if (!postedDate || !appliedDate) return null;

      return Math.max(differenceInCalendarDays(appliedDate, postedDate), 0);
    })
    .filter((days): days is number => days !== null);

  if (daysToHire.length === 0) return null;

  return Math.round(
    daysToHire.reduce((total, days) => total + days, 0) / daysToHire.length,
  );
};

const getCapacityUsed = (jobs: JobPostResponse[]) => {
  const capacity = jobs.reduce(
    (summary, job) => ({
      applications: summary.applications + job.totalApplications,
      maxApplications: summary.maxApplications + (job.maxApplications || 0),
    }),
    { applications: 0, maxApplications: 0 },
  );

  return getPercent(capacity.applications, capacity.maxApplications);
};

const PerformanceSummaryCard = ({
  applications,
  jobs,
  totalApplications = applications.length,
  isLoading = false,
  isError = false,
}: PerformanceSummaryCardProps) => {
  const acceptedApplications = applications.filter(
    (application) =>
      application.applicationStatus === ApplicationStatus.ACCEPTED,
  ).length;
  const reviewedApplications = applications.filter(
    (application) =>
      application.applicationStatus === ApplicationStatus.ACCEPTED ||
      application.applicationStatus === ApplicationStatus.REJECTED,
  ).length;
  const averageDaysToHire = getAverageDaysToHire(applications);
  const summaryItems = [
    {
      label: "Acceptance Rate",
      value: `${getPercent(acceptedApplications, totalApplications)}%`,
      className: "bg-green-50 dark:bg-green-900/20",
      valueClassName: "text-green-600 dark:text-green-400",
    },
    {
      label: "Response Rate",
      value: `${getPercent(reviewedApplications, totalApplications)}%`,
      className: "bg-emerald-50 dark:bg-emerald-900/20",
      valueClassName: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Days Avg. Hiring",
      value: averageDaysToHire === null ? "-" : averageDaysToHire,
      className: "bg-teal-50 dark:bg-teal-900/20",
      valueClassName: "text-teal-600 dark:text-teal-400",
    },
    {
      label: "Job Capacity Used",
      value: `${getCapacityUsed(jobs)}%`,
      className: "bg-lime-50 dark:bg-lime-900/20",
      valueClassName: "text-lime-600 dark:text-lime-400",
    },
  ];

  return (
    <Card className="mt-6 sm:mt-8">
      <CardHeader>
        <CardTitle>Performance Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {summaryItems.map((item) => (
              <Skeleton key={item.label} className="h-24 w-full" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Unable to load performance summary.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {summaryItems.map((item) => (
              <div
                key={item.label}
                className={`rounded-lg p-4 text-center ${item.className}`}
              >
                <p
                  className={`mb-1 text-2xl sm:text-3xl ${item.valueClassName}`}
                >
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceSummaryCard;
