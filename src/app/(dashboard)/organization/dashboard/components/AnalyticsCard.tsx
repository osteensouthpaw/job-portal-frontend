import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changePositive?: boolean;
  subtitle?: string;
}

export function AnalyticsCard({
  title,
  value,
  icon: Icon,
  change,
  changePositive,
  subtitle,
}: AnalyticsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
          </div>
          {change && (
            <span
              className={`text-sm ${changePositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {change}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className="text-foreground text-2xl sm:text-3xl mb-1">{value}</p>
        {subtitle && (
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
