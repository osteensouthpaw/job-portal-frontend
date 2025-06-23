import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { HeartIcon } from "lucide-react";

const LikedPostCard = () => {
  return (
    <Card className="shadow-none transition-all duration-300 hover:border-primary relative">
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-grow">
            <h1 className="text-xl md:text-xl font-semibold">
              {/* {jobPost.jobTitle} */}Software Engineer
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {/* {jobPost.organization.companyName} */} Tech Solutions Inc.
              </p>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full" variant="secondary">
                {/* {jobPost.jobType} */} Full-time
              </Badge>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full">Remote</Badge>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">
                {/* {formatCurrency(jobPost.salary)} */} $80,000 - $100,000
              </p>
            </div>
          </div>

          <div className="md:ml-auto">
            <div className="flex items-center gap-2">
              <HeartIcon className="size-5 cursor-pointer fill-red-600 text-red-500" />
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default LikedPostCard;
