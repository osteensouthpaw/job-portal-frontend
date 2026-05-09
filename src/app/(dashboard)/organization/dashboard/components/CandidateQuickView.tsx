import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Mail,
  Phone,
  Star,
  Briefcase,
  GraduationCap,
  Calendar,
  FileText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CandidateQuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidate: {
    name: string;
    position: string;
    location: string;
    email: string;
    phone: string;
    rating: number;
    experience: string;
    skills: string[];
    appliedFor: string;
    status: "new" | "screening" | "interview" | "offer" | "rejected";
    avatar?: string;
  };
  onViewFullProfile?: () => void;
}

export function CandidateQuickView({
  open,
  onOpenChange,
  candidate,
  onViewFullProfile,
}: CandidateQuickViewProps) {
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

  const config = statusConfig[candidate.status];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidate Quick View</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-400 text-white text-xl">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl text-foreground">{candidate.name}</h2>
                  <p className="text-muted-foreground">{candidate.position}</p>
                </div>
                <Badge className={config.className}>{config.label}</Badge>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < candidate.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  {candidate.experience} experience
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{candidate.location}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Applied Position */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
              Application Details
            </h3>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm">
                <span className="text-muted-foreground">Applied for:</span>{" "}
                <span className="text-foreground font-medium">
                  {candidate.appliedFor}
                </span>
              </p>
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-600 dark:text-green-400" />
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Summary Highlights */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
              Quick Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Experience Level</p>
                  <p className="text-foreground font-medium">
                    {candidate.experience}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-muted-foreground">Current Role</p>
                  <p className="text-foreground font-medium">
                    {candidate.position}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => {
                onOpenChange(false);
                onViewFullProfile?.();
              }}
              className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
            >
              View Full Profile
            </Button>
            <Button variant="outline" className="flex-1">
              Message Candidate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
