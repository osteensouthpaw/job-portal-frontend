"use client";
import JobPostCard from "@/app/(main)/job-listings/components/JobPostCard";
import { Button } from "@/components/ui/button";
import { useJobApplications } from "@/hooks/useApplications";
import { useJobPosts, useLikedJobPosts } from "@/hooks/useJobPosts";
import { ApplicationStatus } from "@/services/application-service";
import { BookmarkCheck, Briefcase, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationStatusChart } from "./ApplicationStatusChart";
import Header from "./Header";
import { JobSearchActivityChart } from "./JobSearchActivityChart";
import { StatsCard } from "./StatsCard";

export default function DashboardPage() {
  const { data: applications } = useJobApplications();
  const interviewInvites = applications?.content.filter((items) =>
    items.applicationStatus.includes(ApplicationStatus.ACCEPTED)
  ).length;
  const { data: likedJobPosts } = useLikedJobPosts();
  const router = useRouter();
  const { data: jobPosts } = useJobPosts();

  const stats = [
    {
      title: "Applications Sent",
      value: applications?.totalElements || 0,
      icon: FileText,
    },
    {
      title: "Saved Jobs",
      value: likedJobPosts?.totalElements || 0,
      icon: BookmarkCheck,
    },
    {
      title: "Interview Invites",
      value: interviewInvites || 0,
      icon: Briefcase,
    },
  ];

  return (
    <div className="bg-background">
      <div className="mx-auto p-4">
        <Header />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <JobSearchActivityChart />
          <ApplicationStatusChart />
        </div>

        {/* Recent Applications */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h2 className="text-foreground">Recent Applications</h2>
            <Button
              variant="ghost"
              onClick={() => router.push("job-applications")}
            >
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications?.content.map((app, index) => (
              <ApplicationCard application={app} key={index} />
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-foreground">Recommended for You</h2>
              <p className="text-muted-foreground text-sm">
                Jobs matching your profile and preferences
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push("/job-listings")}
            >
              View All Jobs
            </Button>
          </div>
          <div className="grid gap-6">
            {jobPosts?.content.map((job) => (
              <JobPostCard key={job.id} jobPost={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
