import NavBar from "@/components/general/NavBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="sticky top-0 z-10">
        <NavBar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
