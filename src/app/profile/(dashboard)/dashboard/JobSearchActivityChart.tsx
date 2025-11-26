import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", applications: 3, views: 12 },
  { day: "Tue", applications: 5, views: 18 },
  { day: "Wed", applications: 2, views: 15 },
  { day: "Thu", applications: 4, views: 22 },
  { day: "Fri", applications: 6, views: 28 },
  { day: "Sat", applications: 1, views: 8 },
  { day: "Sun", applications: 3, views: 10 },
];

export function JobSearchActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Activity This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
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
            <YAxis stroke="currentColor" className="text-muted-foreground" />
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
