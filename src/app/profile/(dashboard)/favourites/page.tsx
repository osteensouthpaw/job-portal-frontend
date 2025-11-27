"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLikedJobPosts } from "@/hooks/useJobPosts";
import SavedJobsList from "./SavedJobsList";
import StatsGrid from "./StatsGrid";

const UserFavouritesJobsPage = () => {
  const { data: savedJobs } = useLikedJobPosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Saved Jobs</h1>
        <p className="text-muted-foreground">
          Keep track of interesting opportunities and apply when ready
        </p>
      </div>

      {/* Stats Overview */}
      <StatsGrid savedJobs={savedJobs?.content} />

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="text-green-900 dark:text-green-300 mb-2">
                Apply Early
              </h4>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Jobs get more competitive over time. Apply within the first 3
                UserJobApplicationsPage days for better chances.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="text-blue-900 dark:text-blue-300 mb-2">
                Tailor Your Resume
              </h4>
              <p className="text-blue-700 dark:text-blue-400 text-sm">
                Customize your resume to match the job requirements and
                keywords.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h4 className="text-purple-900 dark:text-purple-300 mb-2">
                Research Company
              </h4>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                Learn about the company culture and values before applying.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <SavedJobsList savedJobs={savedJobs?.content} />
    </div>
  );
};

export default UserFavouritesJobsPage;
