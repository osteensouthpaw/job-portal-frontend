import {
  fetchCertifications,
  CertificationRequest,
  createCertification,
  deleteCertification,
  CertificationResponse,
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
  onAdd?: (newCert: CertificationResponse) => void
) =>
  useMutation({
    mutationFn: (data: CertificationRequest) => createCertification(data),
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

export const useRemoveCertification = (onRemove: (certId: number) => void) =>
  useMutation({
    mutationFn: (id: number) => deleteCertification(id),
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
