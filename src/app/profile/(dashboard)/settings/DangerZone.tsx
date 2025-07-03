"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const DangerZone = () => {
  const handleDeleteAccount = () => {};
  return (
    <Button variant="destructive" onClick={handleDeleteAccount}>
      Delete Account
    </Button>
  );
};

export default DangerZone;
