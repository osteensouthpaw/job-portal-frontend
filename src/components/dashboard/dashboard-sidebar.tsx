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
  Flag,
  LayoutDashboard,
  Search,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { user } = useAuth();
  const { data: profile, isLoading, isError } = useJobSeekerProfile(user?.id);
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      url: "/profile/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      url: "/profile/me",
      icon: UserRoundCog,
    },
    {
      title: "Applications",
      url: "/profile/job-applications",
      icon: Search,
    },
    {
      title: "Favourites",
      url: "/profile/favourites",
      icon: Flag,
    },
    {
      title: "Settings",
      url: "/profile/settings",
      icon: Settings,
    },
  ];

  if (!profile || isLoading) {
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
                <p className="text-foreground truncate">{`${user?.firstName.toUpperCase()} ${user?.lastName.toUpperCase()}`}</p>
                <p className="text-muted-foreground text-sm">
                  {profile.profession}
                </p>
              </div>
            </div>
          </div>

          <SidebarGroupContent>
            {user && user.userType !== UserType.PENDING && (
              <SidebarMenu className="space-y-2">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
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
