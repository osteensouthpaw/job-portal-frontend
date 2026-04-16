import { useAuth } from "@/app/AuthProvider";
import { Label } from "@/components/ui/label";
import { UploadButton } from "@/utils/utils";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

interface ApplicationFormData {
  resume?: string;
  portfolio_file?: string;
}

export default function DocumentsSection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ApplicationFormData>();
  const { token } = useAuth();
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const resumeValue = watch("resume");
  const [documentName, setDocumentName] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="resume">Resume / CV *</Label>
        <div className="mt-1">
          {!resumeUploaded && !resumeValue && (
            <UploadButton
              headers={{
                Authorization: `Bearer ${token}`,
              }}
              endpoint="resumeUploader"
              onClientUploadComplete={(res) => {
                setValue("resume", res[0].serverData.fileUrl);
                setResumeUploaded(true);
                setDocumentName(res[0].name);
                toast.success("Resume uploaded successfully");
              }}
              onUploadError={(error) => {
                toast.error(error.message);
              }}
            />
          )}
          {(resumeUploaded || resumeValue) && (
            <div className="flex items-center gap-2 mt-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span>
                <Link
                  className="hover:underline"
                  href={resumeValue!}
                  target="_blank"
                >
                  {documentName}
                </Link>
              </span>
            </div>
          )}
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
