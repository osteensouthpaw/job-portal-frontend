"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Pagination from "@/components/general/Pagination";
import { applicationStatusConfig } from "@/lib/application-status-config";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CandidateProfileView } from "./CandidateProfileView";

interface JobApplicationsListProps {
  jobTitle: string;
  applications: JobApplicationResponse[];
  onBack: () => void;
  isLoading?: boolean;
}

export function JobApplicantsList({
  jobTitle,
  applications,
  onBack,
  isLoading = false,
}: JobApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] =
    useState<JobApplicationResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  const statusConfig = applicationStatusConfig;

  const filteredApplications = useMemo(
    () =>
      applications.filter((app) => {
        const searchTarget = [
          app.appliedUser.firstName,
          app.appliedUser.lastName,
          app.appliedUser.email,
          app.appliedPost.jobTitle,
          app.appliedPost.organization.companyName,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch = searchTarget.includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || app.applicationStatus === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [applications, searchQuery, statusFilter],
  );

  const totalPages = Math.ceil(
    filteredApplications.length / applicationsPerPage,
  );
  const paginatedApplications = useMemo(() => {
    const startIdx = (currentPage - 1) * applicationsPerPage;
    return filteredApplications.slice(startIdx, startIdx + applicationsPerPage);
  }, [filteredApplications, currentPage]);

  const statusCounts: Record<ApplicationStatus | "all", number> = {
    all: applications.length,
    [ApplicationStatus.APPLIED]: applications.filter(
      (a) => a.applicationStatus === ApplicationStatus.APPLIED,
    ).length,
    [ApplicationStatus.ACCEPTED]: applications.filter(
      (a) => a.applicationStatus === ApplicationStatus.ACCEPTED,
    ).length,
    [ApplicationStatus.REJECTED]: applications.filter(
      (a) => a.applicationStatus === ApplicationStatus.REJECTED,
    ).length,
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-foreground mb-1">
              Applications for {jobTitle}
            </h2>
            <p className="text-muted-foreground">
              {applications.length} total applications
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <span className="hidden sm:inline">Filters</span>
        </Button>
      </div>

      {/* Status Tabs */}
      <div className="mb-6 overflow-x-auto">
        <Tabs value={statusFilter} onValueChange={setStatusFilter}>
          <TabsList className="inline-flex">
            <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
            <TabsTrigger value={ApplicationStatus.APPLIED}>
              Applied ({statusCounts[ApplicationStatus.APPLIED]})
            </TabsTrigger>
            <TabsTrigger value={ApplicationStatus.ACCEPTED}>
              Accepted ({statusCounts[ApplicationStatus.ACCEPTED]})
            </TabsTrigger>
            <TabsTrigger value={ApplicationStatus.REJECTED}>
              Rejected ({statusCounts[ApplicationStatus.REJECTED]})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6 animate-pulse">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredApplications.length > 0 ? (
          paginatedApplications.map((application) => {
            const config = statusConfig[application.applicationStatus];
            const candidateName =
              `${application.appliedUser.firstName} ${application.appliedUser.lastName ?? ""}`.trim();
            const companyLocation = application.appliedPost.location;

            return (
              <Card
                key={`${application.appliedUser.id}-${application.appliedPost.id}`}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCandidate(application)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                      <AvatarImage src={application.appliedUser.imageUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                        {candidateName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    {/* Candidate Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3 className="text-foreground mb-1 truncate">
                            {candidateName}
                          </h3>
                          <p className="text-muted-foreground truncate">
                            {application.appliedPost.jobTitle}
                          </p>
                        </div>
                        <Badge className={config.className}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Applied Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <span className="text-sm text-muted-foreground">
                          Applied on{" "}
                          {new Date(
                            application.appliedDate,
                          ).toLocaleDateString()}
                        </span>
                      </div>

                      {application.resumeUrl && (
                        <Badge variant="outline" className="text-xs">
                          Resume attached
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No applications found matching your criteria.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            pageNumber={currentPage - 1}
            pageSize={applicationsPerPage}
            totalPages={totalPages}
            onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
            onNext={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            onCurrent={(page) => setCurrentPage(page + 1)}
          />
        </div>
      )}

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <CandidateProfileView
          open={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          userId={selectedCandidate.appliedUser.id}
          applicantId={selectedCandidate.appliedUser.id}
          jobPostId={selectedCandidate.appliedPost.id}
          candidate={{
            name: `${selectedCandidate.appliedUser.firstName} ${selectedCandidate.appliedUser.lastName ?? ""}`.trim(),
            position: selectedCandidate.appliedPost.jobTitle,
            location: selectedCandidate.appliedPost.location,
            email: selectedCandidate.appliedUser.email,
            appliedFor: selectedCandidate.appliedPost.jobTitle,
            appliedDate: selectedCandidate.appliedDate,
            status: selectedCandidate.applicationStatus,
            avatar: selectedCandidate.appliedUser.imageUrl,
            coverLetter: selectedCandidate.coverLetter,
            resume: selectedCandidate.resumeUrl,
          }}
        />
      )}
    </div>
  );
}
