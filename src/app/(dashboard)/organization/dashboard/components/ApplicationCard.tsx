import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge, Building2, Calendar } from "lucide-react";

interface ApplicationCardProps {
  title: string;
  company: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interview" | "rejected" | "accepted";
  logo?: string;
}

export function ApplicationCard({
  title,
  company,
  appliedDate,
  status,
  logo,
}: ApplicationCardProps) {
  const statusConfig = {
    pending: { label: "Pending", className: "bg-gray-100 text-gray-700" },
    reviewing: {
      label: "Under Review",
      className: "bg-blue-100 text-blue-700",
    },
    interview: {
      label: "Interview",
      className: "bg-purple-100 text-purple-700",
    },
    rejected: { label: "Rejected", className: "bg-red-100 text-red-700" },
    accepted: { label: "Accepted", className: "bg-green-100 text-green-700" },
  };

  const config = statusConfig[status];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={logo} />
            <AvatarFallback className="rounded-lg bg-gray-100">
              {company.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-gray-900">{title}</h4>
              <Badge className={config.className}>{config.label}</Badge>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {company}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {appliedDate}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
