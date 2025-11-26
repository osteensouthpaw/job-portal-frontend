import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export function StatsCard({ title, value, icon: Icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm mb-1">{title}</p>
            <p className="text-foreground text-2xl sm:text-3xl mb-2">{value}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
