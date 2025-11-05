"use client";
import Pagination from "@/components/general/Pagination";
import { useJobPosts } from "@/hooks/useJobPosts";
import { useSearchParams } from "next/navigation";
import JobPostCard from "./JobPostCard";

const JobListings = () => {
  const filters = useSearchParams();
  const { data: jobPosts } = useJobPosts(filters.toString());

  return (
    <div className="grid gap-4">
      {jobPosts?.content.map((jobPost) => (
        <JobPostCard jobPost={jobPost} key={jobPost.id} />
      ))}

      {jobPosts && (
        <Pagination
          pageNumber={jobPosts.pageNumber}
          first={jobPosts.first}
          last={jobPosts.last}
          totalElements={jobPosts.totalElements}
          pageSize={jobPosts.pageSize}
          totalPages={jobPosts.totalPages}
        />
      )}
    </div>
  );
};

export default JobListings;
