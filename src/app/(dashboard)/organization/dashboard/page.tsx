"use client";
import { useState } from "react";
import { AnalyticsCard } from "./components/AnalyticsCard";
import { JobPostingCard } from "./components/JobPostingCard";
import { ApplicationFunnelChart } from "./components/ApplicationFunnelChart";
import { ApplicationsOverTimeChart } from "./components/ApplicationsOverTimeChart";
import { ActivityFeed } from "./components/ActivityFeed";
import { TopPerformingJobs } from "./components/TopPerformingJobs";
import { JobApplicationsList } from "./components/JobApplicationsList";

import {
  Search,
  Users,
  Briefcase,
  Calendar,
  CheckCircle,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  useRecruiterJobPosts,
  useTotalOpenJobPosts,
} from "@/hooks/useJobPosts";
import {
  useApplicationsForJobPost,
  useRecentApplications,
} from "@/hooks/useApplications";
import { CandidateCard } from "./components/CandidateCard";

export default function RecruiterDashboard() {
  const { data: jobPosts } = useRecruiterJobPosts();
  const { data: recentApplications } = useRecentApplications();
  const { data: totalOpenJobPosts = 0 } = useTotalOpenJobPosts();
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Get applications for selected job
  const { data: applicationsData } = useApplicationsForJobPost(selectedJob?.id);

  const recentApplicants =
    recentApplications?.content.map((application) => ({
      id: application.appliedUser.id,
      name: `${application.appliedUser.firstName} ${application.appliedUser.lastName ?? ""}`.trim(),
      position: application.appliedPost.jobTitle,
      location: application.appliedPost.organization.companyLocation,
      email: application.appliedUser.email,
      phone: "N/A",
      experience: "N/A",
      skills: ["Resume", "Interview", "Referral"],
      appliedFor: application.appliedPost.jobTitle,
      status:
        application.applicationStatus === "ACCEPTED"
          ? "offer"
          : application.applicationStatus === "REJECTED"
            ? "rejected"
            : "new",
      avatar: application.appliedUser.imageUrl,
    })) || [];

  // Compute analytics from real data
  const analyticsData = [
    {
      title: "Total Applicants",
      value: recentApplications?.totalElements || 0,
      icon: Users,
    },
    {
      title: "Active Job Postings",
      value: totalOpenJobPosts,
      icon: Briefcase,
    },
    {
      title: "Positions Filled",
      value:
        recentApplications?.content?.filter(
          (app) => app.applicationStatus === "ACCEPTED",
        ).length || 0,
      icon: CheckCircle,
    },
  ];

  // Transform job posts for display
  const activeJobs =
    jobPosts?.content.map((job) => ({
      id: job.id,
      title: job.jobTitle,
      department: "Engineering",
      postedDate: new Date(job.createdAt).toLocaleDateString(),
      applicants: job.totalApplications,
      views: job.totalLikes,
      status: job.isOpen ? ("active" as const) : ("paused" as const),
      deadline: new Date(job.applicationDeadline).toLocaleDateString(),
    })) || [];

  const handleViewApplications = (job: any) => {
    setSelectedJob(job);
  };

  const handleUpdateApplicationStatus = (
    applicationId: number,
    status: "accepted" | "rejected",
  ) => {
    console.log(`Update application ${applicationId} to ${status}`);
  };

  // Show job applications list when a job is selected
  if (selectedJob) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Applications for {selectedJob.title}
          </h1>
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            Back to Dashboard
          </Button>
        </div>
        <JobApplicationsList
          jobTitle={selectedJob.title}
          applications={applicationsData?.content || []}
          onBack={() => setSelectedJob(null)}
          onUpdateStatus={handleUpdateApplicationStatus}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Search & Export */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search candidates, jobs, or skills..."
            className="pl-10 bg-card"
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          <Button variant="outline" className="gap-2 flex-1 sm:flex-initial">
            <Download className="h-5 w-5" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {analyticsData.map((data, index) => (
          <AnalyticsCard key={index} {...data} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <ApplicationFunnelChart />
        <ApplicationsOverTimeChart />
      </div>

      {/* Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div className="lg:col-span-2">
          <TopPerformingJobs />
        </div>
        <ActivityFeed />
      </div>

      {/* Recent Applicants */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-foreground">Recent Applicants</h2>
            <p className="text-muted-foreground text-sm">
              Latest candidates who applied to your active roles.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {recentApplicants.length > 0 ? (
            recentApplicants.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                {...candidate}
                onClick={() => {
                  /* optional: view candidate profile */
                }}
                onQuickView={() => {
                  /* optional: quick view action */
                }}
              />
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-muted-foreground">
              No recent applicants available yet.
            </div>
          )}
        </div>
      </div>

      {/* Active Job Postings */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-foreground">Active Job Postings</h2>
          <Button variant="ghost">Manage All Jobs</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {activeJobs.map((job) => (
            <JobPostingCard
              key={job.id}
              {...job}
              onViewApplications={() => handleViewApplications(job)}
            />
          ))}
        </div>
      </div>

      {/* Quick Stats Card */}
      <Card className="mt-6 sm:mt-8">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-green-600 dark:text-green-400 text-2xl sm:text-3xl mb-1">
                89%
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Interview Rate
              </p>
            </div>
            <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <p className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl mb-1">
                24
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Days Avg. Hiring
              </p>
            </div>
            <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <p className="text-teal-600 dark:text-teal-400 text-2xl sm:text-3xl mb-1">
                4.8
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Candidate Rating
              </p>
            </div>
            <div className="text-center p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
              <p className="text-lime-600 dark:text-lime-400 text-2xl sm:text-3xl mb-1">
                92%
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Offer Accept Rate
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
