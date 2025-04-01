import { Card, CardTitle } from "@/components/ui/card";
import { JobPostResponse } from "@/services/jobPost-service";
import { formatCurrency } from "@/utils/formatCurrency";
import { Briefcase, DollarSign, MapPin, User } from "lucide-react";

interface Props {
  jobPost: JobPostResponse;
}

const JobDetailsCard = ({ jobPost }: Props) => {
  const jobDetails = [
    {
      label: "Experience Level",
      value: jobPost.experienceLevel,
      icon: <User size={16} />,
    },
    {
      label: "Work Mode",
      value: jobPost.workMode,
      icon: <Briefcase size={16} />,
    },
    {
      label: "Job Type",
      value: jobPost.jobType,
      icon: <Briefcase size={16} />,
    },
    {
      label: "Salary",
      value: formatCurrency(jobPost.salary),
      icon: <DollarSign size={16} />,
    },
    { label: "Location", value: jobPost.location, icon: <MapPin size={16} /> },
  ];

  return (
    <Card className="p-3 shadow-none border-0 space-y-4 text-gray-200">
      <CardTitle className="font-semibold text-lg">Job Details</CardTitle>
      <div className="space-y-1">
        {jobDetails.map(
          (detail, index) =>
            detail.value && (
              <div key={index} className="flex items-center gap-4">
                <div className="text-xl ">{detail.icon}</div>
                <span>{detail.value}</span>
              </div>
            )
        )}
      </div>
    </Card>
  );
};

export default JobDetailsCard;
