import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

const data = [
  { month: "Jun", applications: 45, hired: 8 },
  { month: "Jul", applications: 62, hired: 12 },
  { month: "Aug", applications: 78, hired: 15 },
  { month: "Sep", applications: 95, hired: 18 },
  { month: "Oct", applications: 112, hired: 22 },
  { month: "Nov", applications: 128, hired: 25 },
];

export function ApplicationsOverTimeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications & Hires Trend</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
