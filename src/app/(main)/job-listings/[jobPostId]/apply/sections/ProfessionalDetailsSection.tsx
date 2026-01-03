import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormData } from "./PersonalInfoSection";

const EXPERIENCE_OPTIONS = [
  { value: "0-1", label: "0-1 years" },
  { value: "1-3", label: "1-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-7", label: "5-7 years" },
  { value: "7-10", label: "7-10 years" },
  { value: "10+", label: "10+ years" },
];
const NOTICE_PERIOD_OPTIONS = [
  { value: "Immediate", label: "Immediate" },
  { value: "2 weeks", label: "2 weeks" },
  { value: "1 month", label: "1 month" },
  { value: "2 months", label: "2 months" },
  { value: "3 months", label: "3 months" },
];

const ProfessionalDetailsSection = () => {
  const { register, control } = useFormContext<ApplicationFormData>();

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Controller
            name="yearsOfExperience"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="yearsOfExperience" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Controller
            name="noticePeriod"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="noticePeriod" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NOTICE_PERIOD_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor="currentCompany">Current Company (Optional)</Label>
          <Input
            id="currentCompany"
            {...register("currentCompany")}
            placeholder="Your Current Company"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="currentRole">Current Role (Optional)</Label>
          <Input
            id="currentRole"
            {...register("currentRole")}
            placeholder="Your Current Position"
            className="mt-1"
          />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="expectedSalary">Expected Salary</Label>
        <Input
          id="expectedSalary"
          {...register("expectedSalary")}
          placeholder="$120,000"
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Leave blank if you prefer to discuss during interview
        </p>
      </div>
    </div>
  );
};

export default ProfessionalDetailsSection;
