import { Label } from "@/components/ui/label";
import React from "react";

interface Props {
  experience: number;
  location: string;
}

const Experience = ({ experience, location }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Experience & Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-muted-foreground">Years of Experience</Label>
          <p>{experience} year(s)</p>
        </div>
        <div>
          <Label className="text-muted-foreground">Location</Label>
          <p>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
