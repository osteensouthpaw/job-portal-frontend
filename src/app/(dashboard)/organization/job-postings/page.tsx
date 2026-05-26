"use client";

import Pagination from "@/components/general/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useApplicationsForJobPost } from "@/hooks/useApplications";
import { useDeleteJobPost, useRecruiterJobPosts } from "@/hooks/useJobPosts";
import { JobPostResponse, JobType, WorkMode } from "@/services/jobPost-service";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatTimeAgo } from "@/utils/formatRelativeTime";
import {
  Briefcase,
  Calendar,
  DollarSign,
  Edit,
  Eye,
  FileText,
  Filter,
  MapPin,
  MoreVertical,
  PlusCircle,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { JobApplicantsList } from "../dashboard/components/JobApplicantsList";

type SortOption =
  | "date-desc"
  | "date-asc"
  | "applicants-desc"
  | "applicants-asc"
  | "title-asc"
  | "title-desc";

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export default function JobPostingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<JobPostResponse | null>(null);
  const jobsPerPage = 10;

  const { data, isLoading, isError, error } = useRecruiterJobPosts({
    page: currentPage - 1,
    size: jobsPerPage,
  });
  const { data: applicationsData, isLoading: isApplicationsLoading } =
    useApplicationsForJobPost(selectedJob?.id);

  const deleteJobPost = useDeleteJobPost();

  const jobs = useMemo(() => data?.content ?? [], [data?.content]);
  const totalPages = data?.totalPages ?? 1;
  const pageNumber = data?.pageNumber ?? 0;
  const totalElements = data?.totalElements ?? jobs.length;

  const filteredJobs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return jobs
      .filter((job) => {
        const matchesSearch =
          normalizedQuery === "" ||
          job.jobTitle.toLowerCase().includes(normalizedQuery) ||
          job.organization.companyName
            .toLowerCase()
            .includes(normalizedQuery) ||
          job.location.toLowerCase().includes(normalizedQuery);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "open" && job.isOpen) ||
          (statusFilter === "closed" && !job.isOpen);

        const matchesType = typeFilter === "all" || job.jobType === typeFilter;

        const matchesWorkMode =
          workModeFilter === "all" || job.workMode === workModeFilter;

        return matchesSearch && matchesStatus && matchesType && matchesWorkMode;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date-asc":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "applicants-desc":
            return b.totalApplications - a.totalApplications;
          case "applicants-asc":
            return a.totalApplications - b.totalApplications;
          case "title-asc":
            return a.jobTitle.localeCompare(b.jobTitle);
          case "title-desc":
            return b.jobTitle.localeCompare(a.jobTitle);
          case "date-desc":
          default:
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }
      });
  }, [jobs, searchQuery, sortBy, statusFilter, typeFilter, workModeFilter]);

  const stats = useMemo(() => {
    const totalApplications = jobs.reduce(
      (sum, job) => sum + job.totalApplications,
      0,
    );

    return [
      {
        label: "Total Jobs",
        value: jobs.length,
        icon: Briefcase,
        className:
          "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      },
      {
        label: "Open Jobs",
        value: jobs.filter((job) => job.isOpen).length,
        icon: FileText,
        className:
          "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      },
      {
        label: "Total Applicants",
        value: totalApplications,
        icon: Users,
        className:
          "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
      },
      {
        label: "Avg per Job",
        value: jobs.length ? Math.round(totalApplications / jobs.length) : 0,
        icon: DollarSign,
        className:
          "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      },
    ];
  }, [jobs]);

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (statusFilter !== "all" ? 1 : 0) +
    (typeFilter !== "all" ? 1 : 0) +
    (workModeFilter !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setWorkModeFilter("all");
    resetToFirstPage();
  };

  const resetToFirstPage = () => setCurrentPage(1);

  const handleDelete = (job: JobPostResponse) => {
    const confirmed = window.confirm(
      `Delete "${job.jobTitle}"? This action cannot be undone.`,
    );

    if (confirmed) {
      deleteJobPost.mutate(job.id);
    }
  };

  if (selectedJob) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Applications for {selectedJob.jobTitle}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Review candidates who applied to this job post.
            </p>
          </div>
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            Back to Job Postings
          </Button>
        </div>
        {isApplicationsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-28 w-full" />
            ))}
          </div>
        ) : (
          <JobApplicantsList
            jobTitle={selectedJob.jobTitle}
            applications={applicationsData?.content ?? []}
            onBack={() => setSelectedJob(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Postings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage the roles posted by your recruiting team.
          </p>
        </div>
        <Button asChild>
          <Link href="/post-job">
            <PlusCircle className="h-4 w-4" />
            Post Job
          </Link>
        </Button>
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
                placeholder="Search by title, company, or location..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  resetToFirstPage();
                }}
                className="bg-card pl-10"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  resetToFirstPage();
                }}
              >
                <SelectTrigger className="bg-card">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setTypeFilter(value);
                  resetToFirstPage();
                }}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.values(JobType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={workModeFilter}
                onValueChange={(value) => {
                  setWorkModeFilter(value);
                  resetToFirstPage();
                }}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Work Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  {Object.values(WorkMode).map((mode) => (
                    <SelectItem key={mode} value={mode}>
                      {formatLabel(mode)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="bg-card">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="applicants-desc">
                    Most Applicants
                  </SelectItem>
                  <SelectItem value="applicants-asc">
                    Least Applicants
                  </SelectItem>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {activeFiltersCount > 0 && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters ({activeFiltersCount})
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredJobs.length} of {totalElements} job postings
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-28 w-full" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-8 text-center">
              <Briefcase className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
              <p className="font-medium text-foreground">
                Unable to load job postings
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {error.message}
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="p-8 text-center">
              <Briefcase className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
              <p className="font-medium text-foreground">
                No job postings found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your filters or post a new job.
              </p>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-3"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              <div className="hidden bg-muted/50 p-4 lg:block">
                <div className="grid grid-cols-12 items-center gap-4">
                  <div className="col-span-4 text-sm font-medium text-foreground">
                    Job
                  </div>
                  <div className="col-span-2 text-sm font-medium text-foreground">
                    Location
                  </div>
                  <div className="col-span-2 text-sm font-medium text-foreground">
                    Details
                  </div>
                  <div className="col-span-1 text-sm font-medium text-foreground">
                    Applicants
                  </div>
                  <div className="col-span-2 text-sm font-medium text-foreground">
                    Deadline
                  </div>
                  <div className="col-span-1 text-sm font-medium text-foreground">
                    Actions
                  </div>
                </div>
              </div>

              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-foreground">
                              {job.jobTitle}
                            </p>
                            <Badge
                              variant={job.isOpen ? "default" : "secondary"}
                            >
                              {job.isOpen ? "Open" : "Closed"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {job.organization.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Posted {formatTimeAgo(job.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 lg:col-span-2">
                      <Badge variant="outline">
                        {formatLabel(job.jobType)}
                      </Badge>
                      <Badge variant="outline">
                        {formatLabel(job.workMode)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(job.salary)}
                      </span>
                    </div>

                    <div className="lg:col-span-1">
                      <Button
                        variant="ghost"
                        className="h-auto justify-start px-0"
                        onClick={() => setSelectedJob(job)}
                      >
                        <Users className="h-4 w-4" />
                        {job.totalApplications}
                      </Button>
                    </div>

                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(job.applicationDeadline)}</span>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/job-listings/${job.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Listing
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setSelectedJob(job)}>
                            <Users className="mr-2 h-4 w-4" />
                            View Applications
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/job-listings/${job.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Job
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            disabled={deleteJobPost.isPending}
                            onClick={() => handleDelete(job)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <Pagination
          pageNumber={pageNumber}
          pageSize={data?.pageSize ?? jobsPerPage}
          totalPages={totalPages}
          onPrevious={() => setCurrentPage((page) => Math.max(1, page - 1))}
          onNext={() =>
            setCurrentPage((page) => Math.min(totalPages, page + 1))
          }
          onCurrent={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
