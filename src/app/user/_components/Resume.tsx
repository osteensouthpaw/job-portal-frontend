import { Button } from "@/components/ui/button";
import { Edit2, WholeWord } from "lucide-react";
import React from "react";

const Resume = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Resume</h3>
        <Button variant="ghost" className="rounded-full">
          <Edit2 />
        </Button>
      </div>
      <div className="flex gap-4">
        <WholeWord />
        <p>this is my resume</p>
      </div>
    </div>
  );
};

export default Resume;
