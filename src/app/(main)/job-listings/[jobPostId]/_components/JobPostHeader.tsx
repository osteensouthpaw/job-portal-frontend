import { Calendar1, House, MapPin } from "lucide-react";
import React from "react";

const JobPostHeader = () => {
  return (
    <div className="space-y-10">
      <h3 className="font-semibold text-2xl md:text-3xl lg:text-4xl">
        Relationship Executive
      </h3>
      <div className="md:space-y-2">
        <OrganizationInfo name="Company Name">
          <House size={16} />
        </OrganizationInfo>
        <OrganizationInfo name="Company Location">
          <MapPin size={16} />
        </OrganizationInfo>
        <OrganizationInfo name="Created on">
          <Calendar1 size={16} />
        </OrganizationInfo>
      </div>
    </div>
  );
};

const OrganizationInfo = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
      {children}
      <h1 className="text-base font-medium">{name}</h1>
    </div>
  );
};

export default JobPostHeader;
