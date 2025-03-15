import NavBar from "@/components/general/NavBar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
