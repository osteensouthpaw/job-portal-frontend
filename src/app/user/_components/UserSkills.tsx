import { Badge } from "@/components/ui/badge";
import React from "react";

const UserSkills = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Skills</h3>
      <div className="flex gap-2 flex-wrap">
        <Badge variant="outline">Java</Badge>
        <Badge variant="outline">Javascript</Badge>
        <Badge variant="outline">React</Badge>
        <Badge variant="outline">Prisma</Badge>
        <Badge variant="outline">C</Badge>
      </div>
    </div>
  );
};

export default UserSkills;
