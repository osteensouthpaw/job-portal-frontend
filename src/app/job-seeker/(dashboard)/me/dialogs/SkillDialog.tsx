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
import { Controller } from "react-hook-form";

export function SkillDialog({
  open,
  onOpenChange,
  editingSkill,
  skillControl,
  handleSkillSubmit,
  skillMutation,
}: any) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingSkill ? "Edit Skill" : "Add Skill"}</DialogTitle>
          <DialogDescription>
            {editingSkill
              ? "Update your skill details"
              : "Add a new skill to your profile"}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSkillSubmit((data: any) =>
            skillMutation.mutate(data)
          )}
          className="space-y-4 py-4"
        >
          <div>
            <Label htmlFor="skill">Skill Name *</Label>
            <Controller
              name="skill"
              control={skillControl}
              render={({ field }) => <Input {...field} id="skill" required />}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={skillControl}
              render={({ field }) => <Input {...field} id="description" />}
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
              {editingSkill ? "Update" : "Add"} Skill
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
