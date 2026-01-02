"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Filter,
  MapPin,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useJobApplications } from "@/hooks/useApplications";
import {
  JobApplicationResponse,
  ApplicationStatus,
} from "@/services/application-service";
import ErrorMessage from "@/app/auth/ErrorMessage";
import { Skeleton } from "@/components/ui/skeleton";

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    icon: Clock,
  },
  interview: {
    label: "Interview",
    className:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    icon: AlertCircle,
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

// Map backend status to UI statusConfig keys
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
      interview: uiApplications.filter((a) => a.status === "interview").length,
      accepted: uiApplications.filter((a) => a.status === "accepted").length,
      rejected: uiApplications.filter((a) => a.status === "rejected").length,
    };
  }, [uiApplications]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">My Applications</h1>
        <p className="text-muted-foreground">
          Track and manage all your job applications in one place
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${
            statusFilter === "all"
              ? "ring-2 ring-green-600 dark:ring-green-500"
              : ""
          }`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground text-sm">Total</p>
            </div>
            <p className="text-foreground">{statusCounts.all}</p>
          </CardContent>
        </Card>

        {Object.entries(statusConfig).map(([key, config]) => {
          const Icon = config.icon;
          return (
            <Card
              key={key}
              className={`cursor-pointer transition-all hover:shadow-md ${
                statusFilter === key
                  ? "ring-2 ring-green-600 dark:ring-green-500"
                  : ""
              }`}
              onClick={() => setStatusFilter(key)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">
                    {config.label}
                  </p>
                </div>
                <p className="text-foreground">
                  {statusCounts[key as keyof typeof statusCounts]}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Application Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Application Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span className="text-muted-foreground">Response Rate</span>
                <span className="text-foreground">
                  {statusCounts.all > 0
                    ? Math.round(
                        ((statusCounts.interview +
                          statusCounts.accepted +
                          statusCounts.rejected) /
                          statusCounts.all) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <Progress
                value={
                  statusCounts.all > 0
                    ? ((statusCounts.interview +
                        statusCounts.accepted +
                        statusCounts.rejected) /
                        statusCounts.all) *
                      100
                    : 0
                }
                className="h-2"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="text-green-600 dark:text-green-400 text-sm mb-1">
                  Success Rate
                </p>
                <p className="text-green-700 dark:text-green-300">
                  {statusCounts.all > 0
                    ? Math.round(
                        ((statusCounts.accepted + statusCounts.interview) /
                          statusCounts.all) *
                          100
                      )
                    : 0}
                  %
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-blue-600 dark:text-blue-400 text-sm mb-1">
                  Interviews
                </p>
                <p className="text-blue-700 dark:text-blue-300">
                  {statusCounts.interview}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Pending
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {statusCounts.pending}
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
                <p className="text-red-600 dark:text-red-400 text-sm mb-1">
                  Rejected
                </p>
                <p className="text-red-700 dark:text-red-300">
                  {statusCounts.rejected}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <SelectItem value="interview">Interview</SelectItem>
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
            const StatusIcon = config.icon;
            return (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Company Logo */}
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={app.logo} />
                      <AvatarFallback className="rounded-lg bg-muted">
                        {app.company.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-foreground mb-1 truncate">
                            {app.title}
                          </h3>
                          <p className="text-muted-foreground truncate">
                            {app.company}
                          </p>
                        </div>
                        <Badge className={config.className}>
                          <StatusIcon className="h-3.5 w-3.5 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {app.description}
                      </p>

                      {/* Job Meta */}
                      <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {app.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {app.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Applied: {app.appliedDate}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        >
                          {app.type}
                        </Badge>
                      </div>

                      {/* Interview Date if applicable */}
                      {app.status === "interview" && app.interviewDate && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 mb-4">
                          <p className="text-purple-900 dark:text-purple-300 text-sm">
                            <strong>Upcoming Interview:</strong>{" "}
                            {app.interviewDate}
                          </p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                        {app.status === "interview" && (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white gap-2"
                          >
                            <Calendar className="h-4 w-4" />
                            Add to Calendar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;
