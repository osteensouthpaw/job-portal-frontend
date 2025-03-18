import jobPostService from "@/services/jobPost-service";
import React from "react";
import JobPostCard from "./JobPostCard";

const JobList = async () => {
  const jobPosts = await jobPostService.jobPosts();
  return (
    <div className="grid gap-3 mt-3">
      {jobPosts.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}
    </div>
  );
};

export default JobList;
