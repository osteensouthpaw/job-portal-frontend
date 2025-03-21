"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import JobFilter, {
  DatesAfter,
  experienceLevels,
  jobTypes,
  workModes,
} from "./JobFilter";
import JobFilterMobile from "./JobFilterMobile";
import SalaryRange from "./SalaryRange";
import Location from "./Location";

const jobListingsFilter = () => {
  const [salaryRange, setSalaryRange] = useState<number[]>([]);
  const [countryName, setCountryName] = useState<string>("");

  return (
    <>
      <Card className="px-3 md:min-w-48 hidden md:block">
        <CardHeader className="font-semibold text-2xl">Filter</CardHeader>
        <CardContent className="space-y-10">
          <JobFilter title="Job Type" filterTypes={jobTypes} />
          <JobFilter title="Experience Level" filterTypes={experienceLevels} />
          <JobFilter title="Work Mode" filterTypes={workModes} />
          <SalaryRange
            salaryRange={salaryRange}
            setSalaryRange={(salary) => setSalaryRange(salary)}
          />
          <Location setCountryName={(country) => setCountryName(country)} />
          <JobFilter filterTypes={DatesAfter} title="Date Posted" />
        </CardContent>
      </Card>
      <JobFilterMobile
        setCountryName={(country) => setCountryName(country)}
        salaryRange={salaryRange}
        setSalaryRange={(salaryRange) => setSalaryRange(salaryRange)}
      />
    </>
  );
};

export default jobListingsFilter;
