import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { JobType, ExperienceLevel, WorkMode } from "@/services/jobPost-service";
import { subMinutes, subHours, subWeeks, subMonths } from "date-fns";

interface Props {
  title: string;
  filterTypes:
    | typeof jobTypes
    | typeof workModes
    | typeof experienceLevels
    | typeof DatesAfter;
}

const JobFilter = ({ title, filterTypes }: Props) => {
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

export const jobTypes: { key: JobType; label: string }[] = [
  { key: JobType.CONTRACT, label: "Contract" },
  { key: JobType.FULL_TIME, label: "Full-Time" },
  { key: JobType.INTERNSHIP, label: "Internship" },
];

export const experienceLevels: { key: ExperienceLevel; label: string }[] = [
  { key: ExperienceLevel.ENTRY_LEVEL, label: "Entry" },
  { key: ExperienceLevel.JUNIOR, label: "Junior" },
  { key: ExperienceLevel.SENIOR, label: "Senior" },
  { key: ExperienceLevel.PROFESSIONAL, label: "Professional" },
];

export const workModes: { key: WorkMode; label: string }[] = [
  { key: WorkMode.HYBRID, label: "Hybrid" },
  { key: WorkMode.REMOTE, label: "Remote" },
  { key: WorkMode.ON_SITE, label: "On Site" },
];

const date = new Date();
export const DatesAfter: { key: Date; label: string }[] = [
  { key: subMinutes(date, 1), label: "Past Minute" },
  { key: subHours(date, 1), label: "Past Hour" },
  { key: subHours(date, 24), label: "Past 24hrs" },
  { key: subWeeks(date, 1), label: "Past Week" },
  { key: subMonths(date, 1), label: "Past Month" },
  // { key: subMonths(date, 3), label: "Past 3 Months" },
];

export default JobFilter;
