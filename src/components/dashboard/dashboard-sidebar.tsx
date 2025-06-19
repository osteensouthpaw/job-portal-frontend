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
import { UserType } from "@/app/auth/register/RegisterForm";
import {
  ArrowLeft,
  Flag,
  History,
  LayoutDashboard,
  Search,
  Settings,
  UserRoundCog,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { user } = useAuth();
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
      title: "Recently Viewed",
      url: "/profile/recently-viewed",
      icon: History,
    },
    {
      title: "Settings",
      url: "/profile/settings",
      icon: Settings,
    },
  ];

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
