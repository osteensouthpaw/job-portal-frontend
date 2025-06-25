import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

interface Props {
  salaryRange: number[];
  setSalaryRange: Dispatch<SetStateAction<number[]>>;
}

const SalaryRange = ({ salaryRange, setSalaryRange }: Props) => {
  return (
    <div className="space-y-2">
      <Label className="font-semibold text-lg">Salary Range</Label>
      <DualRangeSlider
        label={(value) => <span>{value}$</span>}
        labelPosition="bottom"
        value={salaryRange}
        onValueChange={(value) => setSalaryRange(value)}
        min={1000}
        max={200000}
        step={10}
      />
    </div>
  );
};

export default SalaryRange;
