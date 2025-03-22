import jobPostService from "@/services/jobPost-service";
import React from "react";
import JobPostCard from "./JobPostCard";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const JobListings = async ({ searchParams }: Props) => {
  const filters = await searchParams;
  const jobPosts = await jobPostService.jobPosts(filters);
  return (
    <div className="grid gap-4">
      {jobPosts.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}
    </div>
  );
};

export default JobListings;
