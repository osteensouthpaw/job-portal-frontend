import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";

const ViewResume = ({ resumeUrl }: { resumeUrl: string }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <Label className="text-muted-foreground">Resume</Label>
      </div>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ViewResume;
