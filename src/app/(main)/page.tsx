import React from "react";
import JobListings from "./_components/JobListings";
import JobListingsFilter from "./_components/JobListingsFilter";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const HomePage = async ({ searchParams }: Props) => {
  return (
    <div className="md:grid grid-cols-3 gap-8 mt-10">
      <JobListingsFilter />
      <div className="col-span-2 col-start-2">
        <JobListings searchParams={searchParams} />
      </div>
    </div>
  );
};

export default HomePage;
