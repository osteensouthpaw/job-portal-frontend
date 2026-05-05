"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useJobApplications } from "@/hooks/useApplications";
import { ApplicationStatus } from "@/services/application-service";

// Define the statuses and their colors/names
const STATUS_CONFIG: Record<
  ApplicationStatus,
  { name: string; color: string }
> = {
  APPLIED: { name: "Pending", color: "#6b7280" },
  ACCEPTED: { name: "Accepted", color: "#22c55e" },
  REJECTED: { name: "Rejected", color: "#ef4444" },
};

export function ApplicationStatusChart() {
  const { data, isLoading, isError } = useJobApplications();

  // Count applications by status
  const statusCounts: Record<string, number> = {};
  if (data?.totalElements) {
    for (const app of data.content) {
      const status = app.applicationStatus?.toUpperCase?.() || "PENDING";
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    }
  }

  // Prepare chart data
  const chartData = Object.entries(STATUS_CONFIG).map(([status, config]) => ({
    name: config.name,
    value: statusCounts[status] || 0,
    color: config.color,
  }));

  if (isLoading) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent>Error loading application statistics.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Legend wrapperStyle={{ color: "hsl(var(--foreground))" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {chartData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{item.name}</p>
              <p className="text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
