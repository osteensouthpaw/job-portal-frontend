import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Activity {
  id: number;
  type: "application" | "interview" | "hired" | "posted";
  candidate?: string;
  position: string;
  time: string;
  avatar?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "application",
    candidate: "Alex Johnson",
    position: "Senior Frontend Developer",
    time: "5 minutes ago",
  },
  {
    id: 2,
    type: "interview",
    candidate: "Maria Garcia",
    position: "UX Designer",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "hired",
    candidate: "David Chen",
    position: "Product Manager",
    time: "3 hours ago",
  },
  {
    id: 4,
    type: "posted",
    position: "Backend Engineer",
    time: "5 hours ago",
  },
  {
    id: 5,
    type: "application",
    candidate: "Emma Wilson",
    position: "Data Analyst",
    time: "6 hours ago",
  },
];

const activityConfig = {
  application: {
    icon: "📝",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    getText: (a: Activity) => `${a.candidate} applied for ${a.position}`,
  },
  interview: {
    icon: "📅",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    getText: (a: Activity) =>
      `Interview scheduled with ${a.candidate} for ${a.position}`,
  },
  hired: {
    icon: "✅",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    getText: (a: Activity) => `${a.candidate} hired as ${a.position}`,
  },
  posted: {
    icon: "📢",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    getText: (a: Activity) => `New job posted: ${a.position}`,
  },
};

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const config = activityConfig[activity.type];
            return (
              <div key={activity.id} className="flex gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${config.bgColor} flex items-center justify-center text-lg flex-shrink-0`}
                >
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm">
                    {config.getText(activity)}
                  </p>
                  <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
