"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import JobFilter, {
  DatesAfter,
  experienceLevels,
  jobTypes,
  workModes,
} from "./JobFilter";
import JobFilterMobile from "./JobFilterMobile";
import Location from "./Location";
import SalaryRange from "./SalaryRange";
import { useFilters } from "../Provider";

const jobListingsFilter = () => {
  const {
    jobType,
    experienceLevel,
    datePosted,
    workMode,
    countryName,
    salaryRange,
    setCountryName,
    setDatePosted,
    setExperienceLevel,
    setJobType,
    setSalaryRange,
    setWorkMode,
  } = useFilters();

  const searchParams = useSearchParams();
  const router = useRouter();

  const hasFilters = () => {
    return (
      jobType ||
      experienceLevel ||
      datePosted ||
      workMode ||
      countryName ||
      salaryRange.length > 0
    );
  };

  const handleFilter = () => {
    if (!hasFilters()) return;
    const params = new URLSearchParams(searchParams);

    if (jobType) params.set("jobType", jobType);
    else params.delete("jobType");

    if (experienceLevel) params.set("experienceLevel", experienceLevel);
    else params.delete("experienceLevel");

    if (datePosted)
      params.set(
        "datePosted",
        new Date(datePosted).toISOString().replace(".000Z", "")
      );
    else params.delete("datePosted");

    if (workMode) params.set("workMode", workMode);
    else params.delete("workMode");

    if (countryName) params.set("countryName", countryName);
    else params.delete("countryName");

    // Update URL with new filters
    router.push(`?${params.toString()}`);
  };

  const clearFilter = () => {
    if (!hasFilters()) return;
    setJobType(undefined);
    setExperienceLevel(undefined);
    setDatePosted(undefined);
    setWorkMode(undefined);
    setCountryName("");
    setSalaryRange([]);
    router.push("/job-listings");
  };

  return (
    <>
      <Card className="hidden md:block md:min-w-48 px-3">
        <CardHeader className="text-2xl font-semibold">
          <div className="flex justify-between">
            <p>Filter</p>
            <Button
              variant="link"
              onClick={clearFilter}
              className="dark:text-red-500 text-destructive"
            >
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-10">
          <JobFilter
            selectedFilter={jobType}
            title="Job Type"
            filterTypes={jobTypes}
            onSelectFilter={(jobType) => setJobType(jobType)}
          />
          <JobFilter
            selectedFilter={experienceLevel}
            title="Experience Level"
            filterTypes={experienceLevels}
            onSelectFilter={(experienceLevel) =>
              setExperienceLevel(experienceLevel)
            }
          />
          <JobFilter
            selectedFilter={workMode}
            title="Work Mode"
            filterTypes={workModes}
            onSelectFilter={(workMode) => setWorkMode(workMode)}
          />
          <SalaryRange
            salaryRange={salaryRange}
            setSalaryRange={(salary) => setSalaryRange(salary)}
          />
          <Location setCountryName={(country) => setCountryName(country)} />
          <JobFilter
            selectedFilter={datePosted}
            filterTypes={DatesAfter}
            title="Date Posted"
            onSelectFilter={(datePosted) => setDatePosted(datePosted)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleFilter}>Apply Filter</Button>
        </CardFooter>
      </Card>
      <JobFilterMobile
        onApplyFilter={handleFilter}
        onClearFilter={clearFilter}
      />
    </>
  );
};

export default jobListingsFilter;
