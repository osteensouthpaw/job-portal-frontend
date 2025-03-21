import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@radix-ui/react-label";
import { Dispatch, SetStateAction } from "react";
import { DatesAfter, experienceLevels, jobTypes, workModes } from "./JobFilter";
import Location from "./Location";
import SalaryRange from "./SalaryRange";

interface Props {
  setCountryName: Dispatch<SetStateAction<string>>;
  salaryRange: number[];
  setSalaryRange: Dispatch<SetStateAction<number[]>>;
  onSelectJobFilter: (jobFilter: string) => void;
  onSelectWorkMode: (workMode: string) => void;
  onSelectExperienceLevel: (experienceLevel: string) => void;
  onSelectDatePosted: (datePosted: string) => void;
}

const JobFilterMobileTabs = ({
  setCountryName,
  salaryRange,
  setSalaryRange,
  onSelectJobFilter,
  onSelectWorkMode,
  onSelectExperienceLevel,
  onSelectDatePosted,
}: Props) => {
  return (
    <Tabs
      orientation="vertical"
      className="max-w-md w-full flex items-start gap-4 justify-center h-max pr-3 mx-auto"
    >
      <TabsList className="shrink-0 grid grid-cols-1 min-w-28 p-0 bg-background">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-2"
          >
            {tab.name}
          </TabsTrigger>
        ))}
        <TabsTrigger
          value="location"
          className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-2"
        >
          Location
        </TabsTrigger>
        <TabsTrigger
          value="salaryRange"
          className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-2"
        >
          Salary Range
        </TabsTrigger>
      </TabsList>

      <div className="h-56 px-4 flex max-w-xs w-full border rounded-md font-medium text-muted-foreground">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            <RadioGroup
              defaultValue=""
              className="flex flex-col outline flex-wrap"
              onValueChange={(value) => {
                switch (tab.value) {
                  case "jobType":
                    onSelectJobFilter(tab.value);
                    break;
                  case "experienceLevel":
                    onSelectExperienceLevel(value);
                    break;
                  case "workMode":
                    onSelectWorkMode(value);
                    break;
                  case "datePosted":
                    onSelectDatePosted(value);
                    break;
                  default:
                    break;
                }
              }}
            >
              {tab.content.map((filter) => (
                <div
                  className="flex items-center space-x-2 text-sm"
                  key={filter.label}
                >
                  <RadioGroupItem
                    value={filter.key.toString()}
                    id={filter.label}
                  />
                  <Label htmlFor={filter.label}>{filter.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        ))}
        <TabsContent value="location" className="w-full">
          <Location setCountryName={(country) => setCountryName(country)} />
        </TabsContent>
        <TabsContent value="salaryRange" className="w-full">
          <SalaryRange
            salaryRange={salaryRange}
            setSalaryRange={(salaryRange) => setSalaryRange(salaryRange)}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

const tabs: {
  name: string;
  value: string;
  content:
    | typeof jobTypes
    | typeof workModes
    | typeof experienceLevels
    | typeof DatesAfter;
}[] = [
  {
    name: "Job Type",
    value: "jobType",
    content: jobTypes,
  },
  {
    name: "Experience Level",
    value: "experienceLeveL",
    content: experienceLevels,
  },
  {
    name: "Work Mode",
    value: "workMode",
    content: workModes,
  },
  {
    name: "Date Posted",
    value: "datePosted",
    content: DatesAfter,
  },
];

export default JobFilterMobileTabs;
