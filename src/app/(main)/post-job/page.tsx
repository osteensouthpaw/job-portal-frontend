import React from "react";
import JobPostForm from "./_components/JobPostForm";
import { Card } from "@/components/ui/card";

const NewJobPostPage = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card>
          <JobPostForm />
        </Card>
      </div>
      <div className="">
        <Card></Card>
      </div>
    </div>
  );
};

export default NewJobPostPage;
