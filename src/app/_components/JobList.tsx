import jobPostService from "@/services/jobPost-service";
import React from "react";

const JobList = async () => {
  const jobPosts = await jobPostService.jobPosts();
  return (
    <div>
      {jobPosts.map((jobPost) => (
        <div className="flex" key={jobPost.id}>
          <li>{jobPost.jobTitle}</li>
          <li>{jobPost.jobType}</li>
          <li>{jobPost.description}</li>
          <li>{jobPost.id}</li>
        </div>
      ))}
    </div>
  );
};

export default JobList;
