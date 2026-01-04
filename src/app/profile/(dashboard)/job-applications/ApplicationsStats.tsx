import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";

interface Props {
  statusCounts: {
    all: number;
    pending: number;
    interview: number;
    accepted: number;
    rejected: number;
  };
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  statusConfig: {
    [key: string]: { label: string; icon: React.ComponentType<any> };
  };
}

const ApplicationsStats: React.FC<Props> = ({
  statusCounts,
  statusFilter,
  setStatusFilter,
  statusConfig,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
      <Card
        className={`cursor-pointer transition-all hover:shadow-md ${
          statusFilter === "all"
            ? "ring-2 ring-green-600 dark:ring-green-500"
            : ""
        }`}
        onClick={() => setStatusFilter("all")}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Total</p>
          </div>
          <p className="text-foreground">{statusCounts.all}</p>
        </CardContent>
      </Card>

      {Object.entries(statusConfig).map(([key, config]) => {
        const Icon = config.icon;
        return (
          <Card
            key={key}
            className={`cursor-pointer transition-all hover:shadow-md ${
              statusFilter === key
                ? "ring-2 ring-green-600 dark:ring-green-500"
                : ""
            }`}
            onClick={() => setStatusFilter(key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">{config.label}</p>
              </div>
              <p className="text-foreground">
                {statusCounts[key as keyof typeof statusCounts]}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationsStats;
