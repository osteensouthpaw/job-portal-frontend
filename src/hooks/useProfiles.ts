import { findJobSeekerProfile } from "@/services/profile-service";
import { useQuery } from "@tanstack/react-query";

export const useJobSeekerProfile = (userId?: number) =>
  useQuery({
    queryKey: ["profiles", userId],
    queryFn: () => findJobSeekerProfile(userId!),
    enabled: !!userId,
  });
