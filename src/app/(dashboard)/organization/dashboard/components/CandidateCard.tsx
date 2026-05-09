import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

interface CandidateCardProps {
  name: string;
  position: string;
  location: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  appliedFor: string;
  status: "new" | "screening" | "interview" | "offer" | "rejected";
  avatar?: string;
  onClick?: () => void;
  onQuickView?: () => void;
}

export function CandidateCard({
  name,
  position,
  location,
  email,
  phone,
  experience,
  skills,
  appliedFor,
  status,
  avatar,
  onClick,
  onQuickView,
}: CandidateCardProps) {
  const statusConfig = {
    new: {
      label: "New",
      className:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    },
    screening: {
      label: "Screening",
      className:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    },
    interview: {
      label: "Interview",
      className:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    },
    offer: {
      label: "Offer Sent",
      className:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    },
  };

  const config = statusConfig[status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-400 text-white rounded-full p-4">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Candidate Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="text-foreground mb-1 truncate">{name}</h3>
                <p className="text-muted-foreground truncate">{position}</p>
              </div>
              <Badge className={config.className}>{config.label}</Badge>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {location}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {email}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Phone className="h-4 w-4 flex-shrink-0" />
                {phone}
              </span>
            </div>

            {/* Rating & Experience */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
              <span className="text-sm text-muted-foreground">
                {experience} experience
              </span>
            </div>

            {/* Applied For */}
            <p className="text-sm text-muted-foreground mb-3">
              Applied for: <span className="text-foreground">{appliedFor}</span>
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
                onClick={onClick}
              >
                View Profile
              </Button>
              <Button size="sm" variant="outline" onClick={onQuickView}>
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Quick View</span>
                <span className="sm:hidden">View</span>
              </Button>
              <Button size="sm" variant="outline">
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
