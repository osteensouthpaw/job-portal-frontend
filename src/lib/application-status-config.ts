import type { ElementType } from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { ApplicationStatus } from "@/services/application-service";

export interface ApplicationStatusConfigItem {
  label: string;
  className: string;
  icon: ElementType;
}

export const applicationStatusConfig: Record<
  ApplicationStatus,
  ApplicationStatusConfigItem
> = {
  [ApplicationStatus.APPLIED]: {
    label: "Applied",
    className: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
    icon: Clock,
  },
  [ApplicationStatus.REJECTED]: {
    label: "Rejected",
    className: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    icon: XCircle,
  },
  [ApplicationStatus.ACCEPTED]: {
    label: "Accepted",
    className:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    icon: CheckCircle2,
  },
};
