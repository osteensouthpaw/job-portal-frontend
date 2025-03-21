import React from "react";
import JobListings from "./_components/JobListings";
import JobListingsFilter from "./_components/JobListingsFilter";

const HomePage = () => {
  return (
    <div className="md:grid grid-cols-3 gap-8 mt-10">
      <JobListingsFilter />
      <div className="col-span-2 col-start-2">
        <JobListings />
      </div>
    </div>
  );
};

export default HomePage;
