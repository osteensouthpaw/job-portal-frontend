"use client";
import { useAuth } from "@/app/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  useApplicationsForJobPost,
  useRecentApplications,
} from "@/hooks/useApplications";
import {
  useRecruiterJobPosts,
  useTotalOpenJobPosts,
} from "@/hooks/useJobPosts";
import { JobApplicationResponse } from "@/services/application-service";
import { JobPostResponse } from "@/services/jobPost-service";
import { Briefcase, CheckCircle, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ActivityFeed } from "./components/ActivityFeed";
import { AnalyticsCard } from "./components/AnalyticsCard";
import { ApplicationFunnelChart } from "./components/ApplicationFunnelChart";
import { ApplicationsOverTimeChart } from "./components/ApplicationsOverTimeChart";
import { CandidateCard } from "./components/CandidateCard";
import { CandidateProfileView } from "./components/CandidateProfileView";
import { JobApplicantsList } from "./components/JobApplicantsList";
import { JobPostingCard } from "./components/JobPostingCard";
import PerformanceSummaryCard from "./components/PerformanceSummaryCard";
import { TopPerformingJobs } from "./components/TopPerformingJobs";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: jobPosts, isLoading: isJobPostsLoading } =
    useRecruiterJobPosts();
  const {
    data: recentApplications,
    isLoading: isRecentApplicationsLoading,
    isError: isRecentApplicationsError,
  } = useRecentApplications();
  const { data: totalOpenJobPosts = 0, isLoading: isTotalJobsLoading } =
    useTotalOpenJobPosts();
  const [selectedJob, setSelectedJob] = useState<JobPostResponse | null>(null);
  const [selectedCandidate, setSelectedCandidate] =
    useState<JobApplicationResponse | null>(null);

  // Get applications for selected job
  const { data: applicationsData } = useApplicationsForJobPost(selectedJob?.id);

  const analyticsData = [
    {
      title: "Total Applicants",
      value: recentApplications?.totalElements || 0,
      icon: Users,
    },
    {
      title: "Active Job Postings",
      value: jobPosts?.totalElements || 0,
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

  const activeJobs = jobPosts?.content || [];
  const applications = recentApplications?.content || [];

  const handleViewApplications = (job: JobPostResponse) => setSelectedJob(job);

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  // Show job applications list when a job is selected
  if (selectedJob && applicationsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Applications for {selectedJob.jobTitle}
          </h1>
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            Back to Dashboard
          </Button>
        </div>
        <JobApplicantsList
          jobTitle={selectedJob.jobTitle}
          applications={applicationsData.content}
          onBack={() => setSelectedJob(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-foreground mb-2">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">
              {`Welcome back, ${user?.firstName}! Here's your recruitment overview.`}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {analyticsData.map((data, index) => (
          <AnalyticsCard
            key={index}
            {...data}
            isLoading={isRecentApplicationsLoading || isTotalJobsLoading}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <ApplicationFunnelChart
          applications={applications}
          totalApplications={recentApplications?.totalElements ?? 0}
          isLoading={isRecentApplicationsLoading}
          isError={isRecentApplicationsError}
        />
        <ApplicationsOverTimeChart
          applications={applications}
          isLoading={isRecentApplicationsLoading}
          isError={isRecentApplicationsError}
        />
      </div>

      {/* Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div className="lg:col-span-2">
          <TopPerformingJobs jobs={activeJobs} isLoading={isJobPostsLoading} />
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
          {isRecentApplicationsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-4 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 rounded bg-muted" />
                    <div className="h-3 w-48 rounded bg-muted" />
                    <div className="h-3 w-40 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))
          ) : applications.length > 0 ? (
            applications.map((candidate) => (
              <CandidateCard
                key={candidate.appliedUser.id}
                jobApplication={candidate}
                onClick={() => setSelectedCandidate(candidate)}
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
          <Button variant="ghost" asChild>
            <Link href="/organization/job-postings">Manage All Jobs</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {isJobPostsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card p-4 animate-pulse"
              >
                <div className="space-y-3">
                  <div className="h-5 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="flex justify-between">
                    <div className="h-3 w-20 rounded bg-muted" />
                    <div className="h-3 w-20 rounded bg-muted" />
                  </div>
                </div>
              </div>
            ))
          ) : activeJobs.length > 0 ? (
            activeJobs.map((job) => (
              <JobPostingCard
                key={job.id}
                title={job.jobTitle}
                department={job.organization.companyName}
                postedDate={job.createdAt}
                applicants={job.totalApplications}
                likes={job.totalLikes}
                deadline={job.applicationDeadline}
                onViewApplications={() => handleViewApplications(job)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No active job postings yet
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Card */}
      <PerformanceSummaryCard
        applications={applications}
        jobs={activeJobs}
        isLoading={isRecentApplicationsLoading || isJobPostsLoading}
        isError={isRecentApplicationsError}
      />
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
