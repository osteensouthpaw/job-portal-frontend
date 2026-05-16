import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { applicationStatusConfig } from "@/lib/application-status-config";
import { JobApplicationResponse } from "@/services/application-service";
import { formatTimeAgo } from "@/utils/formatRelativeTime";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Mail, MapPin, Phone } from "lucide-react";

interface CandidateCardProps {
  jobApplication: JobApplicationResponse;
  onClick?: () => void;
}

export function CandidateCard({ jobApplication, onClick }: CandidateCardProps) {
  const config = applicationStatusConfig[jobApplication.applicationStatus];
  const { data: profile, isLoading } = useJobSeekerProfile(
    jobApplication.appliedUser.id,
  );

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar */}
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
            <AvatarImage src={jobApplication.appliedUser.imageUrl} />
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-400 text-white rounded-full p-4">
              {jobApplication.appliedUser.firstName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* Candidate Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="min-w-0">
                <h3 className="text-foreground mb-1 truncate uppercase">
                  {jobApplication.appliedUser.firstName}{" "}
                  {jobApplication.appliedUser.lastName}
                </h3>
                <p className="text-muted-foreground truncate">
                  {profile?.profession}
                </p>
              </div>
              <Badge className={config.className}>
                <config.icon className="h-4 w-4 mr-1" />
                {config.label}
              </Badge>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 truncate">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {jobApplication.appliedPost.location}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {jobApplication.appliedUser.email}
              </span>
              <span className="flex items-center gap-1 truncate">
                <Phone className="h-4 w-4 flex-shrink-0" />
                {profile?.phone}
              </span>
            </div>

            {/* Applied For */}
            <p className="text-sm text-muted-foreground mb-3">
              Applied for:{" "}
              <span className="text-foreground">
                {jobApplication.appliedPost.jobTitle},
              </span>
              <span className="text-foreground ml-2">
                {formatTimeAgo(jobApplication.appliedDate)}
              </span>
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile?.skills.map(({ skill }, index) => (
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
