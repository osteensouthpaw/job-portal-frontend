import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillSetResponse } from "@/services/profile-service";
import { Edit2 } from "lucide-react";
import React from "react";

const UserSkills = ({ skillSet }: { skillSet: SkillSetResponse[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Skills</h3>
        <Button variant="ghost" className="rounded-full">
          <Edit2 />
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {skillSet.map(({ id, skill }) => (
          <Badge key={id} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default UserSkills;
