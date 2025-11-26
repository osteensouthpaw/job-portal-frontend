"use client";
import JobPostCard from "@/app/(main)/job-listings/components/JobPostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJobApplications } from "@/hooks/useApplications";
import { useJobPosts, useLikedJobPosts } from "@/hooks/useJobPosts";
import { ApplicationStatus } from "@/services/application-service";
import {
  BookmarkCheck,
  Briefcase,
  Eye,
  FileText,
  Target,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ApplicationCard } from "./ApplicationCard";
import { ApplicationStatusChart } from "./ApplicationStatusChart";
import Header from "./Header";
import { JobSearchActivityChart } from "./JobSearchActivityChart";
import { StatsCard } from "./StatsCard";

export default function Page() {
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
    {
      title: "Profile Views",
      value: 342,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="bg-background">
      {/* Main Content */}
      <div className="mx-auto p-4">
        {/* Header */}
        <Header />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <JobSearchActivityChart />
          <ApplicationStatusChart />
        </div>

        {/* Profile Completion & Quick Actions */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          Profile Completion
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">Profile Completion</span>
                    <span className="text-foreground">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-900 dark:text-green-300 mb-2">
                    Complete your profile to get better job recommendations
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-400 space-y-1 list-disc list-inside">
                    <li>Add your portfolio link</li>
                    <li>Upload your resume</li>
                    <li>Add skills and certifications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          Quick Actions
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-5 w-5" />
                Update Resume
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="mr-2 h-5 w-5" />
                Browse Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="mr-2 h-5 w-5" />
                Job Alerts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="mr-2 h-5 w-5" />
                Career Goals
              </Button>
            </CardContent>
          </Card>
        </div> */}

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

        {/* Job Market Insights */}
        <Card className="mt-6 sm:mt-8">
          <CardHeader>
            <CardTitle>Job Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 text-2xl sm:text-3xl mb-1">
                  +23%
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Design Jobs Growth
                </p>
              </div>
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Briefcase className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 text-2xl sm:text-3xl mb-1">
                  1,248
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  New Jobs This Week
                </p>
              </div>
              <div className="text-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <p className="text-teal-600 dark:text-teal-400 text-2xl sm:text-3xl mb-1">
                  87%
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Profile Match Rate
                </p>
              </div>
              <div className="text-center p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-lime-600 dark:text-lime-400" />
                </div>
                <p className="text-lime-600 dark:text-lime-400 text-2xl sm:text-3xl mb-1">
                  $125k
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Avg. Salary Range
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
