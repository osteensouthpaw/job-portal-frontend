import JobPostCard from "@/app/(main)/job-listings/components/JobPostCard";
import { useAuth } from "@/app/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import { Bookmark, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  savedJobs?: JobPostResponse[];
}

const SavedJobsList = ({ savedJobs }: Props) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      {!savedJobs || savedJobs.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground mb-2">No saved jobs found</p>
            <p className="text-muted-foreground text-sm mb-4">
              Start saving jobs you're interested in to keep track of them here
            </p>
            <Button
              onClick={() => router.push("/job-listings")}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Jobs
            </Button>
          </CardContent>
        </Card>
      ) : (
        savedJobs.map((job) => (
          <JobPostCard user={user} key={job.id} jobPost={job} />
        ))
      )}
    </div>
  );
};

export default SavedJobsList;
