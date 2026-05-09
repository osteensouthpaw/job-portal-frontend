"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useState } from "react";
import { CandidateProfileView } from "./CandidateProfileView";

interface Application {
  id: number;
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
  status: "new" | "screening" | "interview" | "offer" | "rejected" | "accepted";
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
}

interface JobApplicationsListProps {
  jobTitle: string;
  applications: Application[];
  onBack: () => void;
  onUpdateStatus: (
    applicationId: number,
    status: "accepted" | "rejected",
  ) => void;
}

export function JobApplicationsList({
  jobTitle,
  applications,
  onBack,
  onUpdateStatus,
}: JobApplicationsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCandidate, setSelectedCandidate] =
    useState<Application | null>(null);

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
    accepted: {
      label: "Accepted",
      className:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    },
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: applications.length,
    new: applications.filter((a) => a.status === "new").length,
    screening: applications.filter((a) => a.status === "screening").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer: applications.filter((a) => a.status === "offer").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
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
            <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
            <TabsTrigger value="screening">
              Screening ({statusCounts.screening})
            </TabsTrigger>
            <TabsTrigger value="interview">
              Interview ({statusCounts.interview})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              Accepted ({statusCounts.accepted})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({statusCounts.rejected})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => {
            const config = statusConfig[application.status];
            return (
              <Card
                key={application.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedCandidate(application)}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                      <AvatarImage src={application.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-green-400 to-emerald-600 text-white">
                        {application.name
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
                            {application.name}
                          </h3>
                          <p className="text-muted-foreground truncate">
                            {application.position}
                          </p>
                        </div>
                        <Badge className={config.className}>
                          {config.label}
                        </Badge>
                      </div>

                      {/* Contact & Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 truncate">
                          <MapPin className="h-4 w-4 flex-shrink-0" />
                          {application.location}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          {application.email}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          {application.phone}
                        </span>
                      </div>

                      {/* Rating & Date */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < application.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Applied on {application.appliedDate}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {application.skills.slice(0, 4).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {application.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{application.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
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

      {/* Candidate Profile Modal */}
      {selectedCandidate && (
        <CandidateProfileView
          open={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          candidate={selectedCandidate}
          onAccept={() => {
            onUpdateStatus(selectedCandidate.id, "accepted");
            setSelectedCandidate(null);
          }}
          onReject={() => {
            onUpdateStatus(selectedCandidate.id, "rejected");
            setSelectedCandidate(null);
          }}
        />
      )}
    </div>
  );
}
