"use client";
import { useAuth } from "@/app/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteUserAccount } from "@/services/user-service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const DangerZone = () => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();
  const handleDeleteAccount = () =>
    deleteUserAccount()
      .then(() => {
        setUser(null);
        router.replace("/job-listings");
        toast.success("Account successfully deleted");
      })
      .catch((err) => toast.error(`An error occured on the server: ${err}`));

  return (
    <div>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Account
      </Button>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              The following action will permanently delete your account. This action is
              irreversible. Proceed with caution
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 md:flex-row">
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DangerZone;
