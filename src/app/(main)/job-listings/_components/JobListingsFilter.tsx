"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import JobFilter, {
  DatesAfter,
  experienceLevels,
  jobTypes,
  workModes,
} from "./JobFilter";
import JobFilterMobile from "./JobFilterMobile";
import Location from "./Location";
import SalaryRange from "./SalaryRange";
import { useRouter } from "next/navigation";

const jobListingsFilter = () => {
  const [salaryRange, setSalaryRange] = useState<number[]>([]);
  const [jobType, setJobType] = useState<string>();
  const [experienceLevel, setExperienceLevel] = useState<string>();
  const [datePosted, setDatePosted] = useState<string>();
  const [workMode, setWorkMode] = useState<string>();
  const [countryName, setCountryName] = useState<string>("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = () => {
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
            <Button variant="destructive" onClick={clearFilter}>
              Clear Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-10">
          <JobFilter
            title="Job Type"
            filterTypes={jobTypes}
            onSelectFilter={(jobType) => setJobType(jobType)}
          />
          <JobFilter
            title="Experience Level"
            filterTypes={experienceLevels}
            onSelectFilter={(experienceLevel) =>
              setExperienceLevel(experienceLevel)
            }
          />
          <JobFilter
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
        onSelectJobFilter={(jobType) => setJobType(jobType)}
        onSelectWorkMode={(workMode) => setWorkMode(workMode)}
        onSelectExperienceLevel={(experienceLevel) =>
          setExperienceLevel(experienceLevel)
        }
        onSelectDatePosted={(datePosted) => setDatePosted(datePosted)}
        setCountryName={(country) => setCountryName(country)}
        salaryRange={salaryRange}
        setSalaryRange={(salaryRange) => setSalaryRange(salaryRange)}
      />
    </>
  );
};

export default jobListingsFilter;
