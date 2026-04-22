import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobApplications } from "@/hooks/useApplications";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function JobSearchActivityChart() {
  const { data: applications, isLoading, error } = useJobApplications();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const activityData = days.map((day) => ({
    day,
    applications: 0,
  }));

  if (applications) {
    applications.content.forEach((app) => {
      const appDate = new Date(app.appliedDate);
      const dayName = days[appDate.getDay()];
      const dayData = activityData.find((d) => d.day === dayName);
      if (dayData) {
        dayData.applications += 1;
      }
    });
  }

  if (isLoading)
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );

  if (error)
    return (
      <Card>
        <CardContent>Error loading activity.</CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Activity This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={activityData}>
            <defs>
              <linearGradient
                id="colorApplications"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-border"
            />
            <XAxis
              dataKey="day"
              stroke="currentColor"
              className="text-muted-foreground"
            />
            <YAxis
              allowDecimals={false}
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
            />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="#16a34a"
              fillOpacity={1}
              fill="url(#colorApplications)"
              name="Applications Sent"
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorViews)"
              name="Jobs Viewed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
