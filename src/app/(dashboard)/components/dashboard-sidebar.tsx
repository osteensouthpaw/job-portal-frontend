"use client";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useAuth } from "@/app/AuthProvider";
import { useJobSeekerProfile } from "@/hooks/useProfiles";
import { UserType } from "@/services/auth-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Calendar,
  Flag,
  LayoutDashboard,
  Search,
  Settings,
  UserRoundCog,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const jobSeekerTabs: {
  title: string;
  url: string;
  icon: React.ElementType;
}[] = [
  { title: "Dashboard", url: "/job-seeker/dashboard", icon: LayoutDashboard },
  { title: "Profile", url: "/job-seeker/me", icon: UserRoundCog },
  { title: "Applications", url: "/job-seeker/job-applications", icon: Search },
  { title: "Favourites", url: "/job-seeker/favourites", icon: Flag },
  { title: "Settings", url: "/job-seeker/settings", icon: Settings },
];

const organizationTabs: {
  title: string;
  url: string;
  icon: React.ElementType;
}[] = [
  { title: "dashboard", url: "/organization/dashboard", icon: LayoutDashboard },
  { title: "candidates", url: "/organization/candidates", icon: Users },
  { title: "jobs", url: "/organization/postings", icon: Briefcase },
  { title: "interviews", url: "/organization/interviews", icon: Calendar },
  { title: "analytics", url: "/organization/analytics", icon: BarChart3 },
  { title: "settings", url: "/organization/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const { user } = useAuth();
  const router = useRouter();

  const isJobSeeker = user?.userType.includes(UserType.JOB_SEEKER);
  const {
    data: profile,
    isLoading,
    isError,
  } = useJobSeekerProfile(user?.id, isJobSeeker);
  const pathname = usePathname();

  const tabLinks = isJobSeeker ? jobSeekerTabs : organizationTabs;

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  if (!profile || isLoading || !user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/job-listings">
                <ArrowLeft />
                <span>Back to site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <div className="p-5 border-y border-primary my-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full p-2">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-foreground truncate">{`${user?.firstName.toUpperCase()}`}</p>
                {user?.lastName && (
                  <p className="text-foreground truncate">{`${user?.lastName.toUpperCase()}`}</p>
                )}
                <p className="text-muted-foreground text-sm">
                  {isJobSeeker && profile.profession}
                </p>
              </div>
            </div>
          </div>

          <SidebarGroupContent>
            {user && user.userType !== UserType.PENDING && (
              <SidebarMenu className="space-y-2">
                {tabLinks.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={pathname === item.url ? "bg-secondary" : ""}
                  >
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="py-5"
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
