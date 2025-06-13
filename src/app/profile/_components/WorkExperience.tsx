import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExperienceResponse } from "@/services/profile-service";
import { calculateDuration } from "@/utils/calculateDuration";
import { formatDuration, intervalToDuration } from "date-fns";
import { Building2, Calendar1Icon, Edit2, Plus } from "lucide-react";

const WorkExperience = ({
  experiences,
  isProfileOwner,
}: {
  experiences: ExperienceResponse[];
  isProfileOwner: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Work Experience</h3>
        {isProfileOwner && (
          <div className="flex gap-1">
            <Button variant="ghost" className="rounded-full">
              <Plus />
            </Button>
            <Button variant="ghost" className="rounded-full">
              <Edit2 />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-9">
        {experiences.map((experience) => (
          <div key={experience.id} className="flex gap-3">
            <Badge
              variant="secondary"
              className="self-start size-10 text-center"
            >
              {experience.companyName
                ? experience.companyName.charAt(0).toUpperCase()
                : "C"}
              {/* Display first letter of company name as badge */}
            </Badge>
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-muted-foreground">{experience.jobTitle}</h4>
                <p>{experience.description}</p>
              </div>

              <div className="flex text-sm gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Building2 size={20} />
                  <p className="text-sm">{experience.companyName}</p>
                </div>
                <div className="flex gap-2">
                  <Calendar1Icon size={20} />
                  <p className="text-sm">
                    {calculateDuration(
                      experience.startDate,
                      experience.endDate || new Date().toISOString()
                    )}{" "}
                    {experience.isCurrentJob && "(Present)"}
                  </p>
                </div>
              </div>
              {/* <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Skills Acquired</p>
                <div className="flex gap-1 flex-wrap">
                  {experience.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
