"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import LocationSelector from "@/components/ui/location-input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExperienceLevel, JobType, WorkMode } from "@/services/jobPost-service";
import { Dispatch, SetStateAction, useState } from "react";
import { subHours, subMinutes, subMonths, subWeeks } from "date-fns"; // Import date-fns for date calculations

const jobTypes: { key: JobType; label: string }[] = [
  { key: JobType.CONTRACT, label: "Contract" },
  { key: JobType.FULL_TIME, label: "Full-Time" },
  { key: JobType.INTERNSHIP, label: "Internship" },
];

const experienceLevels: { key: ExperienceLevel; label: string }[] = [
  { key: ExperienceLevel.ENTRY_LEVEL, label: "Entry" },
  { key: ExperienceLevel.JUNIOR, label: "Junior" },
  { key: ExperienceLevel.SENIOR, label: "Senior" },
  { key: ExperienceLevel.PROFESSIONAL, label: "Professional" },
];

const workModes: { key: WorkMode; label: string }[] = [
  { key: WorkMode.HYBRID, label: "Hybrid" },
  { key: WorkMode.REMOTE, label: "Remote" },
  { key: WorkMode.ON_SITE, label: "On Site" },
];

const date = new Date();
const DatesAfter: { key: Date; label: string }[] = [
  { key: subMinutes(date, 1), label: "Past Minute" },
  { key: subHours(date, 1), label: "Past Hour" },
  { key: subHours(date, 24), label: "Past 24hrs" },
  { key: subWeeks(date, 1), label: "Past Week" },
  { key: subMonths(date, 1), label: "Past Month" },
  // { key: subMonths(date, 3), label: "Past 3 Months" },
];

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

const JobFilter = ({
  title,
  filterTypes,
}: {
  title: string;
  filterTypes:
    | typeof jobTypes
    | typeof workModes
    | typeof experienceLevels
    | typeof DatesAfter;
}) => {
  return (
    <div className="space-y-3">
      <Label className="font-semibold text-lg">{title}</Label>
      <RadioGroup className="flex gap-3 flex-wrap">
        {filterTypes.map((filter) => (
          <div className="flex items-center space-x-2" key={filter.label}>
            <RadioGroupItem value={filter.label} id={filter.label} />
            <Label htmlFor={filter.label}>{filter.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
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
