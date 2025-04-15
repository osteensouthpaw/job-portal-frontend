import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import NavBar from "@/components/general/NavBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <NavBar />
        <main className="p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
