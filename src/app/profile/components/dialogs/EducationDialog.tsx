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
import { EducationLevel } from "@/services/profile-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function EducationDialog({
  open,
  onOpenChange,
  editingEdu,
  eduControl,
  handleEduSubmit,
  eduMutation,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingEdu ? "Edit Education" : "Add Education"}
          </DialogTitle>
          <DialogDescription>
            {editingEdu
              ? "Update your education details"
              : "Add a new education to your profile"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleEduSubmit((data: any) => eduMutation.mutate(data))}
          className="space-y-4 py-4"
        >
          <div>
            <Label htmlFor="institution">Institution *</Label>
            <Controller
              name="institution"
              control={eduControl}
              render={({ field }) => (
                <Input {...field} id="institution" required />
              )}
            />
          </div>
          <div>
            <Label htmlFor="fieldOfStudy">Field of Study *</Label>
            <Controller
              name="fieldOfStudy"
              control={eduControl}
              render={({ field }) => (
                <Input {...field} id="fieldOfStudy" required />
              )}
            />
          </div>
          <div>
            <Label htmlFor="educationLevel">Education Level</Label>
            <Controller
              name="educationLevel"
              control={eduControl}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="educationLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EducationLevel).map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Controller
                name="startDate"
                control={eduControl}
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
                control={eduControl}
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
              {editingEdu ? "Update" : "Add"} Education
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
