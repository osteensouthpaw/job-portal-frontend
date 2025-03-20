"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExperienceLevel, JobType, WorkMode } from "@/services/jobPost-service";
import { set } from "date-fns";
import { useState } from "react";

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

const jobListingsFilter = () => {
  const [salaryRange, setSalaryRange] = useState<number[]>([]);

  return (
    <Card className="px-3 md:min-w-48">
      <CardHeader className="font-semibold text-2xl">Filter</CardHeader>
      <CardContent className="space-y-8">
        <JobFilter title="Job Type" filterTypes={jobTypes} />
        <JobFilter title="Experience Level" filterTypes={experienceLevels} />
        <JobFilter title="Work Mode" filterTypes={workModes} />
        <SalaryRange
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
        />
      </CardContent>
    </Card>
  );
};

const JobFilter = ({
  title,
  filterTypes,
}: {
  title: string;
  filterTypes: typeof jobTypes | typeof workModes | typeof experienceLevels;
}) => {
  return (
    <div className="space-y-2">
      <Label className="font-semibold text-lg">{title}</Label>
      <RadioGroup className="flex gap-2 flex-wrap">
        {filterTypes.map((filter) => (
          <div className="flex items-center space-x-2" key={filter.label}>
            <RadioGroupItem value={filter.key} id={filter.key} />
            <Label htmlFor={filter.key}>{filter.label}</Label>
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
  setSalaryRange: (salaryRange: number[]) => void;
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

export default jobListingsFilter;
