import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import { format, isValid, parseISO, startOfMonth, subMonths } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ApplicationsOverTimeChartProps {
  applications: JobApplicationResponse[];
  isLoading?: boolean;
  isError?: boolean;
}

const getApplicationDate = (date: string) => {
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? parsedDate : null;
};

const getTrendData = (applications: JobApplicationResponse[]) => {
  const months = Array.from({ length: 6 }, (_, index) =>
    startOfMonth(subMonths(new Date(), 5 - index)),
  );

  const data = months.map((month) => ({
    month: format(month, "MMM"),
    monthKey: format(month, "yyyy-MM"),
    applications: 0,
    hired: 0,
  }));

  const dataByMonth = new Map(data.map((item) => [item.monthKey, item]));

  applications.forEach((application) => {
    const appliedDate = getApplicationDate(application.appliedDate);
    if (!appliedDate) return;

    const monthData = dataByMonth.get(format(appliedDate, "yyyy-MM"));
    if (!monthData) return;

    monthData.applications += 1;

    if (application.applicationStatus === ApplicationStatus.ACCEPTED) {
      monthData.hired += 1;
    }
  });

  return data;
};

export function ApplicationsOverTimeChart({
  applications,
  isLoading = false,
  isError = false,
}: ApplicationsOverTimeChartProps) {
  const data = getTrendData(applications);
  const hasApplications = applications.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications & Hires Trend</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : isError ? (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Unable to load applications trend data.
          </div>
        ) : !hasApplications ? (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No applications available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-border"
              />
              <XAxis
                dataKey="month"
                stroke="currentColor"
                className="text-muted-foreground"
              />
              <YAxis stroke="currentColor" className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{ fill: "#16a34a", r: 4 }}
                name="Applications"
              />
              <Line
                type="monotone"
                dataKey="hired"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: "#22c55e", r: 4 }}
                name="Hired"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
