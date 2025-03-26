import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const Deadline = () => {
  return (
    <Card>
      <Badge variant="outline" className="size-24 grid place-content-center">
        <div className="flex flex-col gap-2 items-center">
          <p className="font-semibold text-5xl">23</p>
          <hr />
          <p className="text-center font-normal text-lg">Days Left</p>
        </div>
      </Badge>
    </Card>
  );
};

export default Deadline;
