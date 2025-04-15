import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDuration, intervalToDuration } from "date-fns";
import { Building2, Calendar1Icon } from "lucide-react";

const WorkExperience = () => {
  const experienceDuration = intervalToDuration({
    start: new Date().setDate(2020),
    end: new Date(),
  });

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Work Experience</h3>
      <div className="space-y-9">
        <div className="flex gap-3">
          <Badge variant="secondary" className="self-start size-10 text-center">
            WE
          </Badge>
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-muted-foreground">Software Engineer</h4>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Veritatis iure nulla qui modi fuga illum aliquam hic quas
                necessitatibus incidunt. Eveniet facere qui repellendus
                perferendis?
              </p>
            </div>

            <div className="flex text-sm gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Building2 size={20} />
                <p className="text-sm">Spring house Enteprise</p>
              </div>
              <div className="flex gap-2">
                <Calendar1Icon size={20} />
                <p className="text-sm">
                  {formatDuration(experienceDuration, {
                    delimiter: ",",
                    zero: false,
                    format: ["years", "months"],
                  })}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Skills Acquired</p>
              <div className="flex gap-1 flex-wrap">
                <Badge variant="outline">Java</Badge>
                <Separator orientation="vertical" />
                <Badge variant="outline">Javascript</Badge>
                <Separator orientation="vertical" />
                <Badge variant="outline">React</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
