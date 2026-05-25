import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ApplicationFunnelChartProps {
  applications: JobApplicationResponse[];
  totalApplications?: number;
  isLoading?: boolean;
  isError?: boolean;
}

const FUNNEL_STAGES: Array<{
  status: ApplicationStatus | "TOTAL";
  name: string;
  color: string;
}> = [
  { status: "TOTAL", name: "Applications", color: "#16a34a" },
  { status: ApplicationStatus.APPLIED, name: "Applied", color: "#22c55e" },
  { status: ApplicationStatus.ACCEPTED, name: "Accepted", color: "#4ade80" },
  { status: ApplicationStatus.REJECTED, name: "Rejected", color: "#ef4444" },
];

export function ApplicationFunnelChart({
  applications,
  totalApplications = applications.length,
  isLoading = false,
  isError = false,
}: ApplicationFunnelChartProps) {
  const statusCounts = applications.reduce<Record<ApplicationStatus, number>>(
    (counts, application) => {
      counts[application.applicationStatus] =
        (counts[application.applicationStatus] || 0) + 1;
      return counts;
    },
    {
      [ApplicationStatus.APPLIED]: 0,
      [ApplicationStatus.ACCEPTED]: 0,
      [ApplicationStatus.REJECTED]: 0,
    },
  );

  const data = FUNNEL_STAGES.map((stage) => ({
    name: stage.name,
    value:
      stage.status === "TOTAL"
        ? totalApplications
        : statusCounts[stage.status] || 0,
    color: stage.color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FUNNEL_STAGES.map((stage) => (
                <Skeleton key={stage.name} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ) : isError ? (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            Unable to load application funnel data.
          </div>
        ) : totalApplications === 0 ? (
          <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No applications available yet.
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  className="text-border"
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <YAxis
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value).toString()}
                  stroke="currentColor"
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--foreground))",
                  }}
                  formatter={(value) => [
                    Math.round(Number(value)).toLocaleString(),
                    "Applications",
                  ]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {data.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.name}
                  </p>
                  <p className="text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
