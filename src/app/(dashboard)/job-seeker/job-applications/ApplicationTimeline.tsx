import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import React from "react";

interface Props {
  statusCounts: {
    all: number;
    pending: number;
    accepted: number;
    rejected: number;
  };
}

const ApplicationTimeline: React.FC<Props> = ({ statusCounts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Response Rate</span>
              <span className="text-foreground">
                {statusCounts.all > 0
                  ? Math.round(
                      ((statusCounts.accepted + statusCounts.rejected) /
                        statusCounts.all) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <Progress
              value={
                statusCounts.all > 0
                  ? ((statusCounts.accepted + statusCounts.rejected) /
                      statusCounts.all) *
                    100
                  : 0
              }
              className="h-2"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <p className="text-green-600 dark:text-green-400 text-sm mb-1">
                Success Rate
              </p>
              <p className="text-green-700 dark:text-green-300">
                {statusCounts.all > 0
                  ? Math.round((statusCounts.accepted / statusCounts.all) * 100)
                  : 0}
                %
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                Pending
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {statusCounts.pending}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm mb-1">
                Rejected
              </p>
              <p className="text-red-700 dark:text-red-300">
                {statusCounts.rejected}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTimeline;
