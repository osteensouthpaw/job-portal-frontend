import { WholeWord } from "lucide-react";
import React from "react";

const Resume = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Resume</h3>
      <div className="flex gap-4">
        <WholeWord />
        <p>this is my resume</p>
      </div>
    </div>
  );
};

export default Resume;
