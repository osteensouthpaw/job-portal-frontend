import NavBar from "@/components/general/NavBar";
import { Container } from "@/components/ui/container";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-10">
        <NavBar />
      </div>
      <div>
        <Container variant="constrainedPadded">{children}</Container>
      </div>
    </div>
  );
};

export default MainLayout;
