import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Download,
  CheckCircle,
  X,
  Star,
  ExternalLink,
  Linkedin,
  Github,
} from "lucide-react";

interface CandidateProfileViewProps {
  open: boolean;
  onClose: () => void;
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
    appliedDate: string;
    status:
      | "new"
      | "screening"
      | "interview"
      | "offer"
      | "rejected"
      | "accepted";
    avatar?: string;
    summary?: string;
    education?: Array<{ degree: string; school: string; year: string }>;
    workHistory?: Array<{
      title: string;
      company: string;
      period: string;
      description: string;
    }>;
    certifications?: string[];
    portfolio?: string;
    linkedin?: string;
    github?: string;
    coverLetter?: string;
  };
  onAccept?: () => void;
  onReject?: () => void;
}

export function CandidateProfileView({
  open,
  onClose,
  candidate,
  onAccept,
  onReject,
}: CandidateProfileViewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidate Profile</DialogTitle>
        </DialogHeader>

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-border">
          <Avatar className="h-24 w-24">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white text-2xl">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div>
                <h3 className="text-foreground mb-1">{candidate.name}</h3>
                <p className="text-muted-foreground">{candidate.position}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < candidate.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {candidate.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {candidate.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {candidate.phone}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {candidate.experience}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {candidate.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={candidate.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4 mr-1" />
                    LinkedIn
                  </a>
                </Button>
              )}
              {candidate.github && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    GitHub
                  </a>
                </Button>
              )}
              {candidate.portfolio && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={candidate.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Portfolio
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Application Info */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Applied For
                </p>
                <p className="text-foreground">{candidate.appliedFor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Application Date
                </p>
                <p className="text-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {candidate.appliedDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge
                  className={
                    candidate.status === "accepted"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : candidate.status === "rejected"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                  }
                >
                  {candidate.status.charAt(0).toUpperCase() +
                    candidate.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Summary */}
            {candidate.summary && (
              <div>
                <h4 className="text-foreground mb-2">Professional Summary</h4>
                <p className="text-muted-foreground">{candidate.summary}</p>
              </div>
            )}

            {/* Skills */}
            <div>
              <h4 className="text-foreground mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {candidate.certifications &&
              candidate.certifications.length > 0 && (
                <div>
                  <h4 className="text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </h4>
                  <ul className="space-y-2">
                    {candidate.certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 mt-1 text-green-600 dark:text-green-400 flex-shrink-0" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Cover Letter */}
            {candidate.coverLetter && (
              <div>
                <h4 className="text-foreground mb-2">Cover Letter</h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {candidate.coverLetter}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            {candidate.workHistory && candidate.workHistory.length > 0 ? (
              candidate.workHistory.map((work, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-foreground mb-1">{work.title}</h4>
                        <p className="text-muted-foreground mb-1">
                          {work.company}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {work.period}
                        </p>
                        <p className="text-muted-foreground">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No work history available
              </p>
            )}
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            {candidate.education && candidate.education.length > 0 ? (
              candidate.education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-foreground mb-1">{edu.degree}</h4>
                        <p className="text-muted-foreground mb-1">
                          {edu.school}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.year}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No education information available
              </p>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-foreground">Resume.pdf</p>
                      <p className="text-sm text-muted-foreground">
                        2.4 MB • Uploaded {candidate.appliedDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-foreground">Cover_Letter.pdf</p>
                      <p className="text-sm text-muted-foreground">
                        1.1 MB • Uploaded {candidate.appliedDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {candidate.status !== "accepted" && candidate.status !== "rejected" && (
          <>
            <Separator />
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={onAccept}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Accept Application
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={onReject}
              >
                <X className="h-4 w-4 mr-2" />
                Reject Application
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
