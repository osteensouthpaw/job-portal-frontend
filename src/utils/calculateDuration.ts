import { formatDuration, intervalToDuration } from "date-fns";

export const calculateDuration = (startDate: string, endDate: string) => {
  const duration = intervalToDuration({
    start: new Date(startDate),
    end: new Date(endDate),
  });
  return formatDuration(duration, {
    delimiter: ", ",
    zero: false,
    format: ["years", "months"],
  });
};
