import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface Props {
  term: string;
  description: string;
  children: ReactNode;
}

const DefinitionItem = ({ term, description, children }: Props) => {
  return (
    <div className="flex gap-3 items-center">
      <Badge variant="secondary" className="size-12">
        {children}
      </Badge>
      <div className="flex flex-col gap-0">
        <dt>
          <small>{term}</small>
        </dt>
        <dd className="font-semibold">{description}</dd>
      </div>
    </div>
  );
};

export default DefinitionItem;
