import { Label } from "@/components/ui/label";
import LocationSelector from "@/components/ui/location-input";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setCountryName: Dispatch<SetStateAction<string>>;
}

const Location = ({ setCountryName }: Props) => {
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

export default Location;
