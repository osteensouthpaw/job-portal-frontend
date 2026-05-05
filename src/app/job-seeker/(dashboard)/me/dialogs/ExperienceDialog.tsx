import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { fromISODate, toISODate } from "@/utils/dateUtils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export function ExperienceDialog({
  open,
  onOpenChange,
  editingExp,
  expControl,
  handleExpSubmit,
  expMutation,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingExp ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
          <DialogDescription>
            {editingExp
              ? "Update your work experience details"
              : "Add a new work experience to your profile"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleExpSubmit((data: any) => expMutation.mutate(data))}
          className="space-y-4 py-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Controller
                name="jobTitle"
                control={expControl}
                render={({ field }) => (
                  <Input {...field} id="jobTitle" required />
                )}
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company *</Label>
              <Controller
                name="companyName"
                control={expControl}
                render={({ field }) => (
                  <Input {...field} id="companyName" required />
                )}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="jobLocation">Location</Label>
            <Controller
              name="jobLocation"
              control={expControl}
              render={({ field }) => <Input {...field} id="jobLocation" />}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Controller
                name="startDate"
                control={expControl}
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
              <Label>End Date</Label>
              <Controller
                name="endDate"
                control={expControl}
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
          </div>
          <div className="flex items-center gap-2">
            <Controller
              name="isCurrentJob"
              control={expControl}
              render={({ field }) => (
                <Switch
                  id="isCurrentJob"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isCurrentJob">I currently work here</Label>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={expControl}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  className="min-h-[100px]"
                />
              )}
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
              {editingExp ? "Update" : "Add"} Experience
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
