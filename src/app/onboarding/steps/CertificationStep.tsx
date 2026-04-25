"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddCertification,
  useRemoveCertification,
} from "@/hooks/useCertifications";
import {
  CertificationRequest,
  CertificationResponse,
} from "@/services/profile-service";
import { AlertCircle, CheckCircle2, Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CertificationStepProps {
  onNext: () => void;
  onSkip: () => void;
  jobSeekerId?: number;
}

export default function CertificationStep({
  onNext,
  onSkip,
  jobSeekerId,
}: CertificationStepProps) {
  const [certifications, setCertifications] = useState<CertificationResponse[]>(
    []
  );

  const { mutate: addCertification, isPending: isAdding } = useAddCertification(
    jobSeekerId,
    (newCert) => {
      setCertifications([...certifications, newCert]);
      reset();
    }
  );

  const { mutate: removeCert, isPending: isRemoving } = useRemoveCertification(
    jobSeekerId,
    (certId) =>
      setCertifications((certs) => certs.filter((cert) => cert.id !== certId))
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CertificationRequest>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    },
  });

  const onSubmit = (data: CertificationRequest) => {
    // Future date validation
    if (data.date && new Date(data.date) > new Date()) {
      toast.error("Certification date cannot be in the future");
      return;
    }
    addCertification(data);
  };

  const renderError = (error?: any) => {
    if (!error) return null;
    return (
      <p className="text-destructive text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3" />
        {error.message}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <p className="text-amber-900 dark:text-amber-300 text-sm mb-1">
              Add your certifications (Optional)
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-xs">
              Professional certifications help validate your expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Added Certifications List */}
      {certifications.length > 0 && (
        <div className="space-y-3">
          <Label>Added Certifications ({certifications.length})</Label>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="text-foreground font-medium">{cert.name}</h4>
                <p className="text-muted-foreground text-sm">{cert.issuer}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeCert(cert.id)}
                disabled={isRemoving}
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Certification Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg p-4 space-y-4"
      >
        <h4 className="text-foreground font-medium">Add Certification</h4>

        <div>
          <Label htmlFor="cert-name">
            Certification Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cert-name"
            {...register("name", {
              required: "Certification name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 200,
                message: "Name must be less than 200 characters",
              },
            })}
            placeholder="Google UX Design Professional Certificate"
            className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
          />
          {renderError(errors.name)}
        </div>

        <div>
          <Label htmlFor="cert-issuer">
            Issuing Organization <span className="text-destructive">*</span>
          </Label>
          <Input
            id="cert-issuer"
            {...register("issuer", {
              required: "Issuer is required",
              minLength: {
                value: 2,
                message: "Issuer must be at least 2 characters",
              },
              maxLength: {
                value: 100,
                message: "Issuer must be less than 100 characters",
              },
            })}
            placeholder="Google"
            className={`mt-1 ${errors.issuer ? "border-destructive" : ""}`}
          />
          {renderError(errors.issuer)}
        </div>

        <div>
          <Label htmlFor="cert-date">Issue Date</Label>
          <Input
            id="cert-date"
            type="date"
            {...register("date", {
              validate: (value) => {
                if (value && new Date(value) > new Date()) {
                  return "Date cannot be in the future";
                }
                return true;
              },
            })}
            className={`mt-1 ${errors.date ? "border-destructive" : ""}`}
          />
          {renderError(errors.date)}
        </div>

        <div>
          <Label htmlFor="cert-id">Credential ID (Optional)</Label>
          <Input
            id="cert-id"
            {...register("credentialId", {
              maxLength: {
                value: 100,
                message: "Credential ID must be less than 100 characters",
              },
            })}
            placeholder="ABC123XYZ"
            className={`mt-1 ${
              errors.credentialId ? "border-destructive" : ""
            }`}
          />
          {renderError(errors.credentialId)}
        </div>

        <Button
          type="submit"
          disabled={isAdding || isSubmitting}
          variant="outline"
          className="w-full gap-2"
        >
          <Plus className="h-4 w-4" />
          {isAdding || isSubmitting ? "Adding..." : "Add Certification"}
        </Button>
      </form>

      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button variant="ghost" onClick={onSkip}>
          Skip
        </Button>
        <Button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-700 text-white gap-2"
        >
          Complete
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
