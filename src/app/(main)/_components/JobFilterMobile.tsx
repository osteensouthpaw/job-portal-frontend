import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowRight, FilterIcon } from "lucide-react";
import JobFilterMobileTabs from "./JobFilterMobileTabs";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setCountryName: Dispatch<SetStateAction<string>>;
  salaryRange: number[];
  setSalaryRange: Dispatch<SetStateAction<number[]>>;
  onSelectJobFilter: (jobFilter: string) => void;
  onSelectWorkMode: (workMode: string) => void;
  onSelectExperienceLevel: (experienceLevel: string) => void;
  onSelectDatePosted: (datePosted: string) => void;
}

const JobFilterMobile = ({
  setCountryName,
  salaryRange,
  setSalaryRange,
  onSelectJobFilter,
  onSelectWorkMode,
  onSelectExperienceLevel,
  onSelectDatePosted,
}: Props) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="mb-4 fixed z-10 top-20 size-10 rounded-full bg-primary flex justify-center items-center">
          <FilterIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="mx-auto">
            <DrawerTitle>Filter Job posts</DrawerTitle>
          </DrawerHeader>
          <JobFilterMobileTabs
            onSelectDatePosted={onSelectDatePosted}
            onSelectExperienceLevel={onSelectExperienceLevel}
            onSelectJobFilter={onSelectJobFilter}
            onSelectWorkMode={onSelectWorkMode}
            setCountryName={(countryName) => setCountryName(countryName)}
            salaryRange={salaryRange}
            setSalaryRange={(salaryRange) => setSalaryRange(salaryRange)}
          />
          <DrawerFooter className="flex flex-row justify-around border-t mt-2">
            <DrawerClose>Close</DrawerClose>
            <Button>
              Apply
              <ArrowRight />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default JobFilterMobile;
