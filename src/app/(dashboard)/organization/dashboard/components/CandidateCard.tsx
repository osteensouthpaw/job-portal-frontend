import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { applicationStatusConfig } from "@/lib/application-status-config";
import { ApplicationStatus } from "@/services/application-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, MapPin, Phone } from "lucide-react";

interface CandidateCardProps {
  id: number;
  name: string;
  position: string;
  location: string;
  email: string;
  experience: string;
  skills: string[];
  appliedFor: string;
  status: ApplicationStatus;
  avatar?: string;
  onClick?: () => void;
}

export function CandidateCard({
  id,
  name,
  position,
  email,
  appliedFor,
  status,
  avatar,
  onClick,
}: CandidateCardProps) {
  const config = applicationStatusConfig[status];
  const { data: jobSeekerProfile, isLoading } = useJobSeekerProfile(id);

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
              <Badge className={config.className}>
                <config.icon className="h-4 w-4 mr-1" />
                {config.label}
              </Badge>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 truncate">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {email}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Phone className="h-4 w-4 flex-shrink-0" />
                {jobSeekerProfile?.phone}
              </span>
            </div>

            {/* Applied For */}
            <p className="text-sm text-muted-foreground mb-3">
              Applied for: <span className="text-foreground">{appliedFor}</span>
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {jobSeekerProfile?.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill.description}
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
