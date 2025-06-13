import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EducationResponse } from "@/services/profile-service";
import { calculateDuration } from "@/utils/calculateDuration";
import { Calendar1Icon, Edit2, GraduationCap, Plus } from "lucide-react";

const Education = ({
  educationList,
  isProfileOwner,
}: {
  educationList: EducationResponse[];
  isProfileOwner: boolean;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Education</h3>
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

      {educationList.map((education) => (
        <div key={education.id} className="space-y-9">
          <div className="flex gap-3">
            <Badge
              variant="secondary"
              className="self-start size-10 text-center"
            >
              {education.institution
                ? education.institution.charAt(0).toUpperCase()
                : "I"}
            </Badge>
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-muted-foreground">
                  {education.institution}
                </h4>
                <div className="flex text-sm gap-4 items-center">
                  <div className="flex gap-2 items-center flex-wrap">
                    <GraduationCap size={20} />
                    <p className="text-sm">{education.fieldOfStudy}</p>
                  </div>
                  <div className="flex gap-2">
                    <Calendar1Icon size={20} />
                    <p className="text-sm">
                      {calculateDuration(
                        education.startDate,
                        education.endDate || new Date().toISOString()
                      )}{" "}
                      {!education.endDate && "(Present)"}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="space-y-2">
                <p className="text-muted-foreground text-sm">Skills Acquired</p>
                <div className="flex gap-1 flex-wrap">
                  {education.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      ))}
      {/* Example static education entry for demonstration */}
    </div>
  );
};

export default Education;
