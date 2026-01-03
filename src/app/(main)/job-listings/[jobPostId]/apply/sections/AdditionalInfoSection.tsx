import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Globe, MapPin } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { ApplicationFormData } from "./PersonalInfoSection";

const AdditionalInfoSection = () => {
  const { register, control } = useFormContext<ApplicationFormData>();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-foreground">Willing to relocate</p>
            <p className="text-xs text-muted-foreground">
              Are you open to relocating for this position?
            </p>
          </div>
        </div>
        <Controller
          name="willingToRelocate"
          control={control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-foreground">Prefer remote work</p>
            <p className="text-xs text-muted-foreground">
              Would you prefer to work remotely?
            </p>
          </div>
        </div>
        <Controller
          name="remotePreferred"
          control={control}
          render={({ field }) => (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
      </div>
      <div>
        <Label htmlFor="additionalInfo">Additional Comments (Optional)</Label>
        <Textarea
          id="additionalInfo"
          {...register("additionalInfo")}
          placeholder="Any additional information you'd like to share..."
          className="mt-1 min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoSection;
