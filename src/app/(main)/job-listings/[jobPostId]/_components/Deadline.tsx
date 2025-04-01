import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

const Deadline = ({ deadline }: { deadline: string }) => {
  const days = formatRelativeTime(new Date(deadline)).split(" ")[0];
  const period = formatRelativeTime(new Date(deadline)).split(" ")[1];

  return (
    <Card>
      <Badge variant="outline" className="size-28 grid place-content-center">
        <div className="flex flex-col items-center justify-between">
          <p className="font-semibold text-5xl">{days}</p>
          <hr />
          <p className="text-center font-normal text-base">{period} left</p>
        </div>
      </Badge>
    </Card>
  );
};

export default Deadline;
