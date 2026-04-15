"use client";

import { useAuth } from "@/app/AuthProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteJobApplication,
  useJobApplication,
} from "@/hooks/useApplications";
import { useJobPost } from "@/hooks/useJobPosts";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { ApplicationStatus } from "@/services/application-service";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Trash2,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function JobApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const jobPostId = Number(params.jobPostId);

  if (!user) {
    router.push("/login");
    return null;
  }

  // Fetch application and job post
  const {
    data: application,
    isLoading: appLoading,
    error: appError,
  } = useJobApplication(jobPostId, user.id);
  const {
    data: jobPost,
    isLoading: jobLoading,
    error: jobError,
  } = useJobPost(jobPostId);

  const deleteApplication = useDeleteJobApplication();
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useJobSeekerProfile(user.id);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  const statusConfig: Record<
    ApplicationStatus,
    {
      label: string;
      className: string;
      icon: React.ElementType;
    }
  > = {
    [ApplicationStatus.APPLIED]: {
      label: "Applied",
      className:
        "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
      icon: Clock,
    },
    [ApplicationStatus.REJECTED]: {
      label: "Rejected",
      className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
      icon: XCircle,
    },
    [ApplicationStatus.ACCEPTED]: {
      label: "Accepted",
      className:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      icon: CheckCircle2,
    },
  };

  if (appLoading || jobLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        Loading...
      </div>
    );
  }
  if (
    appError ||
    !application ||
    jobError ||
    !jobPost ||
    profileError ||
    !profile
  ) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-600">
        Application or job not found.{" "}
        {appError?.message || jobError?.message || profileError?.message || ""}
      </div>
    );
  }

  const config = statusConfig[application.applicationStatus];
  const StatusIcon = config.icon;

  const handleWithdraw = async () => {
    try {
      await deleteApplication.mutateAsync(jobPostId);
      toast.success("Application withdrawn");
      setShowWithdrawConfirm(false);
      router.back();
    } catch (e) {
      toast.error("Failed to withdraw application");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </div>

      {/* Application Overview */}
      <Card className="border-green-100 dark:border-green-900/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Company Logo */}
            <Avatar className="h-20 w-20 rounded-lg">
              {/* <AvatarImage src={jobPost.organization. || ""} /> */}
              <AvatarFallback className="rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400 text-2xl">
                {jobPost.organization.companyName
                  ?.substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-foreground mb-1">{jobPost.jobTitle}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {jobPost.organization.companyName}
                  </p>
                </div>
                {
                  <Badge className={config.className}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {config.label}
                  </Badge>
                }
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {jobPost.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  {jobPost.salary ? `${formatCurrency(jobPost.salary)}` : "-"}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {jobPost.jobType}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Applied:{" "}
                  {application.appliedDate
                    ? new Date(application.appliedDate).toLocaleDateString()
                    : "-"}
                </div>
              </div>

              {application.applicationStatus !== ApplicationStatus.REJECTED &&
                application.applicationStatus !==
                  ApplicationStatus.ACCEPTED && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setShowWithdrawConfirm(true)}
                      disabled={deleteApplication.isPending}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Withdraw Application
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Confirmation */}
      {showWithdrawConfirm && (
        <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-red-900 dark:text-red-200 mb-2">
                  Withdraw Application?
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm mb-4">
                  Are you sure you want to withdraw your application for{" "}
                  {jobPost.jobTitle} at {jobPost.organization.companyName}? This
                  action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleWithdraw}
                    disabled={deleteApplication.isPending}
                  >
                    {deleteApplication.isPending
                      ? "Withdrawing..."
                      : "Yes, Withdraw"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowWithdrawConfirm(false)}
                    disabled={deleteApplication.isPending}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Details */}
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-foreground mb-2">About the Role</h3>
              <p className="text-muted-foreground text-sm whitespace-pre-line">
                {jobPost.description}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="text-foreground mb-2">Key Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posted Date:</span>
                  <span className="text-foreground">
                    {jobPost.createdAt
                      ? new Date(jobPost.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Application Deadline:
                  </span>
                  <span className="text-foreground">
                    {jobPost.applicationDeadline
                      ? new Date(
                          jobPost.applicationDeadline
                        ).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Experience Level:
                  </span>
                  <span className="text-foreground">
                    {jobPost.experienceLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location Type:</span>
                  <span className="text-foreground">{jobPost.workMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="text-foreground">Tech</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Application */}
        <Card>
          <CardHeader>
            <CardTitle>Your Application</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-foreground mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </div>
                {profile.linkedInUrl && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Linkedin className="h-4 w-4" />
                    <a
                      href={profile.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      LinkedIn Profile
                      <ExternalLink className="h-3 w-3 inline ml-1" />
                    </a>
                  </div>
                )}
                {profile.personalWebsiteUrl && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <a
                      href={profile.personalWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline"
                    >
                      Portfolio Website
                      <ExternalLink className="h-3 w-3 inline ml-1" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* <div>
              <h3 className="text-foreground mb-2">Application Details</h3>
              <div className="space-y-2 text-sm">
                {application.expectedSalary && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Expected Salary:
                    </span>
                    <span className="text-foreground">
                      {application.expectedSalary}
                    </span>
                  </div>
                )}
                {application.availableFrom && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Available From:
                    </span>
                    <span className="text-foreground">
                      {application.availableFrom}
                    </span>
                  </div>
                )}
                {application.willingToRelocate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Willing to Relocate:
                    </span>
                    <span className="text-foreground">
                      {application.willingToRelocate}
                    </span>
                  </div>
                )}
              </div>
            </div> */}

            <Separator />

            {application.resumeUrl && (
              <div>
                <h3 className="text-foreground mb-3">Attached Documents</h3>
                <div className="space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-4 w-4" />
                      Resume.pdf
                      <Download className="h-3.5 w-3.5 ml-auto" />
                    </a>
                  </Button>
                </div>
              </div>
            )}

            <Separator />

            {application.coverLetter && (
              <div>
                <h3 className="text-foreground mb-2">Cover Letter</h3>
                <div className="bg-muted/50 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {application.coverLetter}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
