import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDuration, intervalToDuration } from "date-fns";
import { Calendar1Icon, Edit2, GraduationCap, Plus } from "lucide-react";

const Education = () => {
  const educationDuration = intervalToDuration({
    start: new Date().setDate(2020),
    end: new Date(),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Education</h3>
        <div className="flex gap-1">
          <Button variant="ghost" className="rounded-full">
            <Plus />
          </Button>
          <Button variant="ghost" className="rounded-full">
            <Edit2 />
          </Button>
        </div>
      </div>
      <div className="space-y-9">
        <div className="flex gap-3">
          <Badge variant="secondary" className="self-start size-10 text-center">
            SC
          </Badge>
          <div className="space-y-6">
            <div className="space-y-1">
              <h4 className="text-muted-foreground">Kisii Universitry</h4>
              <div className="flex text-sm gap-4 items-center">
                <div className="flex gap-2 items-center flex-wrap">
                  <GraduationCap size={20} />
                  <p className="text-sm">
                    B.Tech/BE (Bachelor of Technology/Bachelor of Engineering)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Calendar1Icon size={20} />
                  <p className="text-sm">
                    {formatDuration(educationDuration, {
                      delimiter: ",",
                      zero: false,
                      format: ["years", "months"],
                    })}
                  </p>
                </div>
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

export default Education;
