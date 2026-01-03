import { useAuth } from "@/app/AuthProvider";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/utils";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface ApplicationFormData {
  resume?: string;
  portfolio_file?: string;
}

interface DocumentsSectionProps {
  resumeUrl?: string;
  portfolioUrl?: string;
}

export default function DocumentsSection({
  resumeUrl,
  portfolioUrl,
}: DocumentsSectionProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();
  const { token } = useAuth();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="resume">Resume / CV *</Label>
        <div className="mt-1">
          <UploadButton
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            endpoint="resumeUploader"
            onClientUploadComplete={(res) => {
              setValue("resume", res[0].serverData.fileUrl);
              toast.success("Resume uploaded successfully");
            }}
            onUploadError={(error) => {
              toast.error(error.message);
            }}
          />
          {errors.resume && (
            <p className="text-destructive text-xs mt-1">
              {String(errors.resume.message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
