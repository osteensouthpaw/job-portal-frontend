"use client";
import ErrorMessage from "@/app/auth/ErrorMessage";
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
import { useJobApplications } from "@/hooks/useApplications";
import {
  ApplicationStatus,
  JobApplicationResponse,
} from "@/services/application-service";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Filter,
  Search,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import ApplicationsStats from "./ApplicationsStats";
import ApplicationTimeline from "./ApplicationTimeline";
import Header from "./Header";
import JobApplicationCard from "./JobApplicationCard";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    icon: Clock,
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    icon: XCircle,
  },
  accepted: {
    label: "Accepted",
    className:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    icon: CheckCircle2,
  },
};

function mapStatus(status: ApplicationStatus): keyof typeof statusConfig {
  switch (status) {
    case ApplicationStatus.APPLIED:
      return "pending";
    case ApplicationStatus.ACCEPTED:
      return "accepted";
    case ApplicationStatus.REJECTED:
      return "rejected";
    default:
      return "pending";
  }
}

const MyApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data, isLoading, isError, error } = useJobApplications();

  // Flatten the backend response (PageResponse<JobApplicationResponse>)
  const applications: JobApplicationResponse[] = data?.content || [];

  // UI expects fields like title, company, etc. Map from JobApplicationResponse
  const uiApplications = useMemo(() => {
    return applications.map((app) => {
      const post = app.appliedPost;
      return {
        id: post.id.toString(),
        title: post.jobTitle,
        company: post.organization.companyName,
        location: post.location,
        salary: post.salary ? `$${post.salary}` : "-",
        appliedDate: app.appliedDate,
        status: mapStatus(app.applicationStatus),
        logo: undefined, // Optionally map logo if available
        type: post.jobType
          .replace("_", " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: post.description,
        interviewDate: undefined, // Optionally map if available
      };
    });
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return uiApplications.filter((app) => {
      const matchesSearch =
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [uiApplications, searchQuery, statusFilter]);

  const statusCounts = useMemo(() => {
    return {
      all: uiApplications.length,
      pending: uiApplications.filter((a) => a.status === "pending").length,
      accepted: uiApplications.filter((a) => a.status === "accepted").length,
      rejected: uiApplications.filter((a) => a.status === "rejected").length,
    };
  }, [uiApplications]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <ApplicationsStats
        statusCounts={statusCounts}
        statusConfig={statusConfig}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
      />

      {/* Application Timeline */}
      <ApplicationTimeline statusCounts={statusCounts} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search applications by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))
        ) : isError ? (
          <ErrorMessage
            message={error?.message || "Failed to load applications."}
          />
        ) : filteredApplications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground mb-2">No applications found</p>
              <p className="text-muted-foreground text-sm">
                Try adjusting your search or filters
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredApplications.map((app) => {
            const config = statusConfig[app.status];
            return (
              <JobApplicationCard app={app} config={config} key={app.id} />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
