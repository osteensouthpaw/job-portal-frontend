import jobPostService from "@/services/jobPost-service";
import React from "react";
import JobPostCard from "./JobPostCard";

const JobListings = async () => {
  const jobPosts = await jobPostService.jobPosts(
    "?datePosted=2025-03-21T08:30:59"
  );
  return (
    <div className="grid gap-4">
      {jobPosts.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}
    </div>
  );
};

export default JobListings;
