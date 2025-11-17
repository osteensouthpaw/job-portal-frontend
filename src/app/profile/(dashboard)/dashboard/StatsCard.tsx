import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm mb-1">{title}</p>
            <p className="text-foreground text-3xl mb-2">{value}</p>
            {trend && (
              <p
                className={`text-sm ${
                  trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend}
              </p>
            )}
          </div>
          <div className="bg-green-50 dark:border dark:bg-inherit p-3 rounded-lg">
            <Icon className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
