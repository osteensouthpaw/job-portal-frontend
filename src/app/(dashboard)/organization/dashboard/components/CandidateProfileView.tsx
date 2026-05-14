"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUpdateApplicationStatus } from "@/hooks/useApplications";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { applicationStatusConfig } from "@/lib/application-status-config";
import { ApplicationStatus } from "@/services/application-service";
import {
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";

interface CandidateProfileViewProps {
  open: boolean;
  onClose: () => void;
  userId?: number;
  applicantId: number;
  jobPostId: number;
  candidate: {
    name: string;
    position: string;
    location: string;
    email: string;
    appliedFor: string;
    appliedDate: string;
    status: ApplicationStatus;
    avatar?: string;
    phone?: string;
    experience?: string;
    rating?: number;
    skills?: string[];
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
}

export function CandidateProfileView({
  open,
  onClose,
  userId,
  applicantId,
  jobPostId,
  candidate,
}: CandidateProfileViewProps) {
  const { data: jobSeekerProfile, isLoading } = useJobSeekerProfile(userId);
  const { acceptMutation, rejectMutation } = useUpdateApplicationStatus();

  // Merge loaded profile data with existing candidate info
  const enrichedCandidate = jobSeekerProfile
    ? {
        ...candidate,
        phone: jobSeekerProfile.phone || candidate.phone,
        position: jobSeekerProfile.profession || candidate.position,
        summary: jobSeekerProfile.bio || candidate.summary,
        experience: jobSeekerProfile.experienceLevel || candidate.experience,
        linkedin: jobSeekerProfile.linkedInUrl || candidate.linkedin,
        github: jobSeekerProfile.gitHubUrl || candidate.github,
        skills: jobSeekerProfile.skills
          ? jobSeekerProfile.skills.map((s: any) => s.skill)
          : candidate.skills,
        workHistory: jobSeekerProfile.experiences
          ? jobSeekerProfile.experiences.map((exp: any) => ({
              title: exp.jobTitle,
              company: exp.companyName,
              period: `${exp.startDate} to ${
                exp.isCurrentJob ? "Present" : exp.endDate
              }`,
              description: exp.description,
            }))
          : candidate.workHistory,
        education: jobSeekerProfile.educations
          ? jobSeekerProfile.educations.map((edu: any) => ({
              degree: edu.educationLevel,
              school: edu.institution,
              year: `${edu.startDate} - ${edu.endDate}`,
            }))
          : candidate.education,
      }
    : candidate;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Candidate Profile</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-border">
              <Avatar className="h-24 w-24">
                <AvatarImage src={enrichedCandidate.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white text-2xl">
                  {enrichedCandidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-foreground mb-1">
                      {enrichedCandidate.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {enrichedCandidate.position}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {enrichedCandidate.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {enrichedCandidate.email}
                  </span>
                  {enrichedCandidate.phone && (
                    <span className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {enrichedCandidate.phone}
                    </span>
                  )}
                  {enrichedCandidate.experience && (
                    <span className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      {enrichedCandidate.experience}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {enrichedCandidate.linkedin && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={enrichedCandidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                  {enrichedCandidate.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={enrichedCandidate.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {enrichedCandidate.portfolio && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={enrichedCandidate.portfolio}
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
                    <p className="text-foreground">
                      {enrichedCandidate.appliedFor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Application Date
                    </p>
                    <p className="text-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {enrichedCandidate.appliedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge
                      className={
                        applicationStatusConfig[enrichedCandidate.status]
                          .className
                      }
                    >
                      {(() => {
                        const config =
                          applicationStatusConfig[enrichedCandidate.status];
                        const IconComponent = config.icon;
                        return (
                          <>
                            <IconComponent className="h-4 w-4 mr-1 inline" />
                            {config.label}
                          </>
                        );
                      })()}
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
                {enrichedCandidate.summary && (
                  <div>
                    <h4 className="text-foreground mb-2">
                      Professional Summary
                    </h4>
                    <p className="text-muted-foreground">
                      {enrichedCandidate.summary}
                    </p>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <h4 className="text-foreground mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {enrichedCandidate.skills &&
                    enrichedCandidate.skills.length > 0 ? (
                      enrichedCandidate.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-sm">
                        No skills added
                      </p>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                {enrichedCandidate.certifications &&
                  enrichedCandidate.certifications.length > 0 && (
                    <div>
                      <h4 className="text-foreground mb-3 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                      </h4>
                      <ul className="space-y-2">
                        {enrichedCandidate.certifications.map((cert, index) => (
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
                {enrichedCandidate.coverLetter && (
                  <div>
                    <h4 className="text-foreground mb-2">Cover Letter</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {enrichedCandidate.coverLetter}
                      </p>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                {enrichedCandidate.workHistory &&
                enrichedCandidate.workHistory.length > 0 ? (
                  enrichedCandidate.workHistory.map((work, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                            <Briefcase className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-foreground mb-1">
                              {work.title}
                            </h4>
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
                {enrichedCandidate.education &&
                enrichedCandidate.education.length > 0 ? (
                  enrichedCandidate.education.map((edu, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="text-foreground mb-1">
                              {edu.degree}
                            </h4>
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
                            Uploaded {enrichedCandidate.appliedDate}
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
                {enrichedCandidate.coverLetter && (
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
                              Uploaded {enrichedCandidate.appliedDate}
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
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            {enrichedCandidate.status !== ApplicationStatus.ACCEPTED &&
              enrichedCandidate.status !== ApplicationStatus.REJECTED && (
                <>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => {
                        acceptMutation.mutate(
                          { applicantId, jobPostId },
                          {
                            onSuccess: onClose,
                          },
                        );
                      }}
                      disabled={acceptMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {acceptMutation.isPending
                        ? "Accepting..."
                        : "Accept Application"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        rejectMutation.mutate(
                          { applicantId, jobPostId },
                          {
                            onSuccess: onClose,
                          },
                        );
                      }}
                      disabled={rejectMutation.isPending}
                    >
                      <X className="h-4 w-4 mr-2" />
                      {rejectMutation.isPending
                        ? "Rejecting..."
                        : "Reject Application"}
                    </Button>
                  </div>
                </>
              )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
