import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExperienceLevel, JobType, WorkMode } from "@/services/jobPost-service";
import { subHours, subMinutes, subMonths, subWeeks } from "date-fns";

interface Props {
  title: string;
  filterTypes:
    | typeof jobTypes
    | typeof workModes
    | typeof experienceLevels
    | typeof DatesAfter;
  onSelectFilter: (filterType: string) => void;
}

const JobFilter = ({ title, filterTypes, onSelectFilter }: Props) => {
  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">{title}</Label>
      <RadioGroup
        className="flex flex-wrap gap-3"
        onValueChange={(value) => onSelectFilter(value)}
      >
        {filterTypes.map((filter) => (
          <div className="flex items-center space-x-2" key={filter.label}>
            <RadioGroupItem value={filter.key.toString()} id={filter.label} />
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
