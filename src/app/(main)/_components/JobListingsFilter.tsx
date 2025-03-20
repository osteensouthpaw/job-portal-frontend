"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import LocationSelector from "@/components/ui/location-input";
import { Dispatch, SetStateAction, useState } from "react";
import JobFilter, {
  DatesAfter,
  experienceLevels,
  jobTypes,
  workModes,
} from "./JobFilter";

const jobListingsFilter = () => {
  const [salaryRange, setSalaryRange] = useState<number[]>([]);
  const [countryName, setCountryName] = useState<string>("");

  return (
    <Card className="px-3 md:min-w-48">
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
  );
};

const SalaryRange = ({
  salaryRange,
  setSalaryRange,
}: {
  salaryRange: number[];
  setSalaryRange: Dispatch<SetStateAction<number[]>>;
}) => {
  return (
    <div className="space-y-2">
      <Label className="font-semibold text-lg">Salary Range</Label>
      <DualRangeSlider
        label={(value) => <span>{value}$</span>}
        labelPosition="bottom"
        value={salaryRange}
        onValueChange={setSalaryRange}
        min={1000}
        max={200000}
        step={10}
      />
    </div>
  );
};

const Location = ({
  setCountryName,
}: {
  setCountryName: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="space-y-2">
      <Label className="font-semibold text-lg">Location</Label>
      <LocationSelector
        onCountryChange={(country) => {
          setCountryName(country?.name || "");
        }}
      />
    </div>
  );
};

export default jobListingsFilter;
