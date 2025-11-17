import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Bookmark, MapPin, DollarSign, Clock } from "lucide-react";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  logo?: string;
  postedTime: string;
  tags: string[];
  saved?: boolean;
  onSave?: () => void;
}

export function JobCard({
  title,
  company,
  location,
  salary,
  type,
  logo,
  postedTime,
  tags,
  saved = false,
  onSave,
}: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Company Logo */}
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={logo} />
            <AvatarFallback className="rounded-lg bg-gray-100">
              {company.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-600">{company}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={saved ? "text-blue-600" : "text-gray-400"}
                onClick={onSave}
              >
                <Bookmark
                  className={`h-5 w-5 ${saved ? "fill-current" : ""}`}
                />
              </Button>
            </div>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                {salary}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {postedTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                {type}
              </Badge>
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
              <Button variant="outline">View Details</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
