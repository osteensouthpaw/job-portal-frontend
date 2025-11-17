"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@radix-ui/react-progress";
import {
  BookmarkCheck,
  Briefcase,
  FileText,
  Filter,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { JobCard } from "./JobCard";
import { StatsCard } from "./StatsCard";

// Mock data
const stats = [
  {
    title: "Applications Sent",
    value: 24,
    icon: FileText,
    trend: "+12% this month",
    trendUp: true,
  },
  {
    title: "Saved Jobs",
    value: 18,
    icon: BookmarkCheck,
    trend: "+3 new",
    trendUp: true,
  },
  {
    title: "Interview Invites",
    value: 5,
    icon: Briefcase,
    trend: "+2 this week",
    trendUp: true,
  },
  {
    title: "Profile Views",
    value: 342,
    icon: TrendingUp,
    trend: "+28% this week",
    trendUp: true,
  },
];

const recommendedJobs = [
  {
    title: "Senior Product Designer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $150k",
    type: "Full-time",
    postedTime: "2 days ago",
    tags: ["UI/UX", "Figma", "Remote"],
    saved: false,
  },
  {
    title: "UX Designer",
    company: "StartupHub",
    location: "New York, NY",
    salary: "$100k - $130k",
    type: "Full-time",
    postedTime: "1 day ago",
    tags: ["Design Systems", "User Research"],
    saved: true,
  },
  {
    title: "Product Design Lead",
    company: "Innovation Labs",
    location: "Remote",
    salary: "$140k - $180k",
    type: "Full-time",
    postedTime: "3 days ago",
    tags: ["Leadership", "Strategy", "Remote"],
    saved: false,
  },
];

const recentApplications = [
  {
    title: "Senior UX Designer",
    company: "Google",
    appliedDate: "Nov 10, 2025",
    status: "reviewing" as const,
  },
  {
    title: "Product Designer",
    company: "Meta",
    appliedDate: "Nov 8, 2025",
    status: "interview" as const,
  },
  {
    title: "UI Designer",
    company: "Apple",
    appliedDate: "Nov 5, 2025",
    status: "pending" as const,
  },
];

export default function Page() {
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set([1]));

  const handleSaveJob = (index: number) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-1">
                  Welcome back, John! 👋
                </h1>
                <p className="text-sm text-muted-foreground">
                  Here's what's happening with your job search today.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-3 bg-card border rounded-full px-4 py-2 shadow-sm">
                  <Avatar>
                    <AvatarImage
                      src={""}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium text-foreground">John Doe</div>
                    <div className="text-xs text-muted-foreground">
                      Last active: 2h ago
                    </div>
                  </div>
                </div>
                <Button className="hidden sm:inline-flex" variant="ghost">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for jobs..."
                  className="pl-12 pr-4 py-3 rounded-full shadow-sm bg-input text-foreground"
                />
              </div>
              <Button variant="outline" className="gap-2 px-4 py-2">
                <Filter className="h-5 w-5" />
                Filters
              </Button>
              <Button className="hidden sm:inline-flex px-4 py-2">
                Advanced
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-start">
            {/* Profile Completion */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Profile Completion
                      </span>
                      <span className="text-sm text-foreground">75%</span>
                    </div>
                    <Progress
                      value={75}
                      className="h-2 rounded-full bg-slate-100"
                    />
                  </div>
                  <div className="rounded-lg p-4 bg-card border">
                    <p className="text-sm mb-2 font-medium text-foreground">
                      Complete your profile to get better job recommendations
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Add your portfolio link</li>
                      <li>Upload your resume</li>
                      <li>Add skills and certifications</li>
                    </ul>
                    <div className="mt-3">
                      <Button className="mt-2" variant="outline">
                        Complete profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="ghost">
                  <FileText className="mr-2 h-5 w-5" />
                  Update Resume
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Browse Jobs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Search className="mr-2 h-5 w-5" />
                  Job Alerts
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Applications */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Recent Applications</h2>
              <Button variant="ghost">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentApplications.map((app, index) => (
                <ApplicationCard key={index} {...app} />
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground">Recommended for You</h2>
              <Button variant="ghost">View All</Button>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <JobCard
                  key={index}
                  {...job}
                  saved={savedJobs.has(index)}
                  onSave={() => handleSaveJob(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
