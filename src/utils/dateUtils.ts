import { format } from "date-fns";

// Helper for formatting and parsing dates
export function toISODate(date: Date | undefined | null): string {
  return date ? format(date, "yyyy-MM-dd") : "";
}
export function fromISODate(dateStr?: string | null): Date | undefined {
  if (!dateStr) return undefined;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? undefined : d;
}
