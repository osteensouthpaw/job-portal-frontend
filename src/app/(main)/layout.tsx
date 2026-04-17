"use client";
import NavBar from "@/components/general/NavBar";
import { Container } from "@/components/ui/container";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const tabRouteMap: Record<string, string> = {
  dashboard: "/profile/dashboard",
  profile: "/profile/me",
  applications: "/profile/job-applications",
  saved: "/profile/favourites",
  jobs: "/job-listings",
  settings: "/profile/settings",
};

function getActiveTab(pathname: string): string {
  if (pathname === "/") return "dashboard";
  for (const [tab, route] of Object.entries(tabRouteMap)) {
    if (pathname.startsWith(route) && route !== "/") return tab;
  }
  return "dashboard";
}

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  const handleTabChange = (tab: string) => {
    const route = tabRouteMap[tab];
    if (route) router.push(route);
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10">
        <NavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div>
        <Container variant="constrainedPadded">{children}</Container>
      </div>
    </div>
  );
};

export default MainLayout;
