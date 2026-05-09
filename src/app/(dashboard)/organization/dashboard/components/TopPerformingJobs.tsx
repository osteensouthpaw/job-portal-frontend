import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface JobPerformance {
  title: string;
  applicants: number;
  maxApplicants: number;
  conversionRate: number;
}

const jobs: JobPerformance[] = [
  {
    title: "Senior Frontend Developer",
    applicants: 142,
    maxApplicants: 200,
    conversionRate: 18,
  },
  {
    title: "Product Designer",
    applicants: 98,
    maxApplicants: 200,
    conversionRate: 22,
  },
  {
    title: "Backend Engineer",
    applicants: 87,
    maxApplicants: 200,
    conversionRate: 15,
  },
  {
    title: "DevOps Engineer",
    applicants: 76,
    maxApplicants: 200,
    conversionRate: 20,
  },
  {
    title: "Data Scientist",
    applicants: 65,
    maxApplicants: 200,
    conversionRate: 25,
  },
];

export function TopPerformingJobs() {
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
          {jobs.map((job, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-foreground text-sm sm:text-base truncate pr-2">
                  {job.title}
                </p>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {job.applicants} applicants
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={(job.applicants / job.maxApplicants) * 100}
                  className="h-2 flex-1"
                />
                <span className="text-sm text-green-600 dark:text-green-400 whitespace-nowrap">
                  {job.conversionRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
