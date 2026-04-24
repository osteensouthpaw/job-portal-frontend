import {
  fetchCertifications,
  CertificationRequest,
  createCertification,
  deleteCertification,
  CertificationResponse,
  updateCertification,
} from "@/services/profile-service";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchCertification = (id?: number) =>
  useQuery({
    queryKey: ["certifications", id],
    queryFn: () => (id ? fetchCertifications(id) : Promise.resolve([])),
    enabled: !!id,
  });

export const useAddCertification = (
  jobSeekerId?: number,
  onAdd?: (newCert: CertificationResponse) => void
) =>
  useMutation({
    mutationFn: (data: CertificationRequest) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return createCertification(data, jobSeekerId);
    },
    onSuccess: (newCert) => {
      toast.success("Certification added!");
      onAdd?.(newCert);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to add certification"
      );
    },
  });

export const useRemoveCertification = (
  jobSeekerId?: number,
  onRemove?: (certId: number) => void
) =>
  useMutation({
    mutationFn: (id: number) => {
      if (!jobSeekerId) {
        return Promise.reject(new Error("No job seeker ID provided"));
      }
      return deleteCertification(id, jobSeekerId);
    },
    onSuccess: (data, certId) => {
      toast.success("Certification removed");
      onRemove?.(certId);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove certification"
      );
    },
  });

export const useUpdateCertification = (
  certificateId?: number,
  jobSeekerId?: number,
  onUpdate?: () => void
) =>
  useMutation({
    mutationFn: (request: CertificationRequest) => {
      if (!certificateId || !jobSeekerId) {
        return Promise.reject(
          new Error("Missing certificate or job seeker ID")
        );
      }
      return updateCertification(certificateId, jobSeekerId, request);
    },
    onSuccess: () => {
      toast.success("Certificate edited successfully");
      onUpdate?.();
    },
    onError: (error: any) =>
      toast.error(error?.message || "Failed to update certificate"),
  });
