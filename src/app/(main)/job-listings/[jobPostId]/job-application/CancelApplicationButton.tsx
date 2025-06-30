"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteApplication } from "@/services/application-service";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CancelApplicationButton = ({ jobPostId }: { jobPostId: number }) => {
  const [isOpen, setOpen] = useState(false);
  const router = useRouter();

  const cancelApplication = (jobPostId: number) => {
    deleteApplication(jobPostId)
      .then((res) => {
        toast.success("Successful");
        router.push(`/job-listings/${jobPostId}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Could not delete application. An error occured: ${err}`);
      });
  };

  return (
    <div>
      <Button
        variant="destructive"
        className="w-max ml-auto rounded-full flex gap-1 border hover:border-red-400"
        onClick={() => setOpen(true)}
      >
        <X className="fill-red-600 rounded-full" />
        Cancel
      </Button>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle>Cancel Application</DialogTitle>
            <DialogDescription>
              The following action will permanently delete this job application.
              This process is NOT reversable. Continue anyway?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 md:flex-row">
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => cancelApplication(jobPostId)}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CancelApplicationButton;
