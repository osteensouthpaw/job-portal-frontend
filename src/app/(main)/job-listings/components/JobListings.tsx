import jobPostService from "@/services/jobPost-service";
import React from "react";
import JobPostCard from "./JobPostCard";
import Pagination from "@/components/general/Pagination";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const JobListings = async ({ searchParams }: Props) => {
  const filters = await searchParams;
  const {
    content: jobPosts,
    first,
    last,
    pageNumber,
    totalElements,
    pageSize,
    totalPages,
  } = await jobPostService.jobPosts(filters);
  return (
    <div className="grid gap-4">
      {jobPosts.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}
      <Pagination
        pageNumber={pageNumber}
        first={first}
        last={last}
        totalElements={totalElements}
        pageSize={pageSize}
        totalPages={totalPages}
      />
    </div>
  );
};

export default JobListings;
