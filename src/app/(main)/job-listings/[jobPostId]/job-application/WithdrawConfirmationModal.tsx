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
import { AlertCircle } from "lucide-react";

interface WithdrawConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  jobTitle?: string;
  companyName?: string;
}

export function WithdrawConfirmModal({
  open,
  onConfirm,
  onCancel,
  loading,
  jobTitle,
  companyName,
}: WithdrawConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-6 w-6" />
            Withdraw Application?
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to withdraw your application
            {jobTitle && companyName && (
              <>
                {" "}
                for <span className="font-semibold">{jobTitle}</span> at{" "}
                <span className="font-semibold">{companyName}</span>
              </>
            )}
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Withdrawing..." : "Yes, Withdraw"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
