import { useAuth } from "@/app/AuthProvider";
import React from "react";

const Header = () => {
  const { user } = useAuth();

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-foreground mb-2">
            Welcome back, {user?.firstName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your job search today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
