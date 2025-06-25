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
import { useState } from "react";
import JobFilterMobileTabs from "./JobFilterMobileTabs";

interface Props {
  onApplyFilter: () => void;
  onClearFilter: () => void;
}

const JobFilterMobile = ({ onApplyFilter, onClearFilter }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleApplyFilter = () => {
    onApplyFilter();
    setIsOpen((prev) => !prev);
  };

  const handleOnClearFilter = () => {
    onClearFilter();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="md:hidden">
      <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DrawerTrigger className="mb-4 fixed !z-40 top-20 size-10 rounded-full bg-primary flex justify-center items-center">
          <FilterIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="mx-auto flex items-center">
            <DrawerTitle>Filter Job posts</DrawerTitle>
            <Button
              variant="link"
              onClick={handleOnClearFilter}
              className="text-destructive dark:text-red-500"
            >
              Clear Filters
            </Button>
          </DrawerHeader>
          <JobFilterMobileTabs />
          <DrawerFooter className="flex flex-row justify-around border-t mt-2">
            <DrawerClose>Close</DrawerClose>
            <Button onClick={handleApplyFilter}>
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
