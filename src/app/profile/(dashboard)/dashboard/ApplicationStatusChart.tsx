import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Pending", value: 8, color: "#6b7280" },
  { name: "Under Review", value: 6, color: "#3b82f6" },
  { name: "Interview", value: 5, color: "#8b5cf6" },
  { name: "Accepted", value: 3, color: "#22c55e" },
  { name: "Rejected", value: 2, color: "#ef4444" },
];

export function ApplicationStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
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
          {data.map((item, index) => (
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
