import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CertificationResponse } from "@/services/profile-service";
import { fromISODate, toISODate } from "@/utils/dateUtils";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCert: CertificationResponse | null;
  certControl: any;
  handleCertSubmit: any;
  certMutation: any;
}

export function CertificationDialog({
  open,
  onOpenChange,
  editingCert,
  certControl,
  handleCertSubmit,
  certMutation,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingCert ? "Edit Certification" : "Add Certification"}
          </DialogTitle>
          <DialogDescription>
            {editingCert
              ? "Update your certification details"
              : "Add a new certification to your profile"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleCertSubmit((data: any) => certMutation.mutate(data))}
          className="space-y-4 py-4"
        >
          <div>
            <Label htmlFor="name">Certification Name *</Label>
            <Controller
              name="name"
              control={certControl}
              render={({ field }) => <Input {...field} id="name" required />}
            />
          </div>
          <div>
            <Label htmlFor="issuer">Issuing Organization *</Label>
            <Controller
              name="issuer"
              control={certControl}
              render={({ field }) => <Input {...field} id="issuer" required />}
            />
          </div>
          <div>
            <Label htmlFor="date">Issue Date</Label>
            <Controller
              name="date"
              control={certControl}
              render={({ field: { value, onChange } }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={
                        "w-full justify-start text-left font-normal" +
                        (!value ? " text-muted-foreground" : "")
                      }
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value
                        ? format(fromISODate(value)!, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={fromISODate(value)}
                      onSelect={(date) => onChange(toISODate(date))}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1970}
                      toYear={new Date().getFullYear() + 1}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div>
            <Label htmlFor="credentialId">Credential ID</Label>
            <Controller
              name="credentialId"
              control={certControl}
              render={({ field }) => <Input {...field} id="credentialId" />}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              type="submit"
            >
              {editingCert ? "Update" : "Add"} Certification
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
