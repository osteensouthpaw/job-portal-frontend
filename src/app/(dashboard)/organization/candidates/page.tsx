"use client";

import Pagination from "@/components/general/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentApplications } from "@/hooks/useApplications";
import { applicationStatusConfig } from "@/lib/application-status-config";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import { formatTimeAgo } from "@/utils/formatRelativeTime";
import {
  AlertCircle,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Mail,
  MapPin,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CandidateProfileView } from "../dashboard/components/CandidateProfileView";

type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc";

const getCandidateName = (application: JobApplicationResponse) =>
  `${application.appliedUser.firstName} ${
    application.appliedUser.lastName ?? ""
  }`.trim();

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function CandidatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] =
    useState<JobApplicationResponse | null>(null);
  const candidatesPerPage = 10;

  const { data, isLoading, isError, error } = useRecentApplications({
    page: currentPage - 1,
    size: candidatesPerPage,
  });
  const applications = useMemo(() => data?.content ?? [], [data?.content]);
  const totalPages = data?.totalPages ?? 1;
  const pageNumber = data?.pageNumber ?? 0;
  const totalElements = data?.totalElements ?? applications.length;

  const positions = useMemo(
    () =>
      Array.from(
        new Set(
          applications.map((application) => application.appliedPost.jobTitle),
        ),
      ),
    [applications],
  );

  const filteredApplications = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return applications
      .filter((application) => {
        const candidateName = getCandidateName(application).toLowerCase();
        const jobTitle = application.appliedPost.jobTitle.toLowerCase();
        const email = application.appliedUser.email.toLowerCase();
        const location = application.appliedPost.location.toLowerCase();

        const matchesSearch =
          normalizedQuery === "" ||
          candidateName.includes(normalizedQuery) ||
          jobTitle.includes(normalizedQuery) ||
          email.includes(normalizedQuery) ||
          location.includes(normalizedQuery);

        const matchesStatus =
          statusFilter === "all" ||
          application.applicationStatus === statusFilter;

        const matchesPosition =
          positionFilter === "all" ||
          application.appliedPost.jobTitle === positionFilter;

        return matchesSearch && matchesStatus && matchesPosition;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date-asc":
            return (
              new Date(a.appliedDate).getTime() -
              new Date(b.appliedDate).getTime()
            );
          case "name-asc":
            return getCandidateName(a).localeCompare(getCandidateName(b));
          case "name-desc":
            return getCandidateName(b).localeCompare(getCandidateName(a));
          case "date-desc":
          default:
            return (
              new Date(b.appliedDate).getTime() -
              new Date(a.appliedDate).getTime()
            );
        }
      });
  }, [applications, positionFilter, searchQuery, sortBy, statusFilter]);

  const statusCounts = useMemo(
    () => ({
      total: totalElements,
      applied: applications.filter(
        (application) =>
          application.applicationStatus === ApplicationStatus.APPLIED,
      ).length,
      accepted: applications.filter(
        (application) =>
          application.applicationStatus === ApplicationStatus.ACCEPTED,
      ).length,
      rejected: applications.filter(
        (application) =>
          application.applicationStatus === ApplicationStatus.REJECTED,
      ).length,
    }),
    [applications, totalElements],
  );

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (positionFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPositionFilter("all");
    setCurrentPage(1);
  };

  const stats = [
    {
      label: "Total Candidates",
      value: statusCounts.total,
      icon: Users,
      className:
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "New Applications",
      value: statusCounts.applied,
      icon: Clock,
      className:
        "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    },
    {
      label: "Accepted",
      value: statusCounts.accepted,
      icon: CheckCircle,
      className:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      label: "Rejected",
      value: statusCounts.rejected,
      icon: XCircle,
      className: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Candidates</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review applications from candidates across your open roles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-3 ${stat.className}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by candidate, email, role, or location..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                className="bg-card pl-10"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="bg-card sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={ApplicationStatus.APPLIED}>
                    Applied
                  </SelectItem>
                  <SelectItem value={ApplicationStatus.ACCEPTED}>
                    Accepted
                  </SelectItem>
                  <SelectItem value={ApplicationStatus.REJECTED}>
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={positionFilter}
                onValueChange={(value) => {
                  setPositionFilter(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="bg-card sm:w-[200px]">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="bg-card sm:w-[170px]">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters ({activeFiltersCount})
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} of {totalElements} candidates
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="divide-y divide-border">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="p-4 sm:p-5">
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <AlertCircle className="h-6 w-6" />
              </div>
              <p className="font-medium text-foreground">
                Could not load candidates
              </p>
              <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                {error?.message ||
                  "Something went wrong while loading candidate applications."}
              </p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
              <p className="text-foreground">No candidates found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-3"
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              <div className="hidden bg-muted/50 px-5 py-3 text-sm font-medium text-muted-foreground lg:grid lg:grid-cols-12 lg:gap-4">
                <div className="col-span-4">Candidate</div>
                <div className="col-span-3">Applied Role</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1 text-right">Action</div>
              </div>

              {filteredApplications.map((application) => {
                const candidateName = getCandidateName(application);
                const config =
                  applicationStatusConfig[application.applicationStatus];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={`${application.appliedUser.id}-${application.appliedPost.id}`}
                    className="p-4 transition-colors hover:bg-muted/50 sm:p-5"
                  >
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-11 w-11">
                            <AvatarImage
                              src={application.appliedUser.imageUrl}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                              {getInitials(candidateName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">
                              {candidateName}
                            </p>
                            <p className="flex items-center gap-1 truncate text-sm text-muted-foreground">
                              <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                              {application.appliedUser.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-3">
                        <p className="font-medium text-foreground">
                          {application.appliedPost.jobTitle}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          Applied {formatTimeAgo(application.appliedDate)}
                        </p>
                      </div>

                      <div className="lg:col-span-2">
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">
                            {application.appliedPost.location}
                          </span>
                        </p>
                      </div>

                      <div className="lg:col-span-2">
                        <Badge className={config.className}>
                          <StatusIcon className="mr-1 h-4 w-4" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="lg:col-span-1 lg:text-right">
                        <Button
                          size="sm"
                          onClick={() => setSelectedCandidate(application)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination
          pageNumber={pageNumber}
          pageSize={data?.pageSize ?? candidatesPerPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
          onNext={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          onCurrent={(page) => setCurrentPage(page)}
        />
      )}

      {selectedCandidate && (
        <CandidateProfileView
          open={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          userId={selectedCandidate.appliedUser.id}
          applicantId={selectedCandidate.appliedUser.id}
          jobPostId={selectedCandidate.appliedPost.id}
          candidate={{
            name: getCandidateName(selectedCandidate),
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
