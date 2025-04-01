import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Deadline from "./Deadline";
import { JobPostResponse } from "@/services/jobPost-service";

interface Props {
  jobPost: JobPostResponse;
}

const JobDescriptionCard = ({ jobPost }: Props) => {
  return (
    <Card className="shadow-none border-0 p-3 relative">
      <div className="hidden absolute -top-32 right-0 lg:block">
        <Deadline deadline={jobPost.applicationDeadline} />
      </div>

      <CardHeader>
        <CardTitle className="font-semibold text-lg">Description</CardTitle>
      </CardHeader>
      <CardContent>{jobPost.description}</CardContent>
    </Card>
  );
};

export default JobDescriptionCard;
