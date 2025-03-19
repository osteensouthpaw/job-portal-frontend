import jobPostService from "@/services/jobPost-service";
import React from "react";
import JobPostCard from "./JobPostCard";

const JobListings = async () => {
  const jobPosts = await jobPostService.jobPosts();
  return (
    <div className="grid gap-4">
      {jobPosts.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}
    </div>
  );
};

export default JobListings;
