export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "1 day";
  } else if (diffInDays < 7) {
    return `${diffInDays} days`;
  } else if (diffInWeeks === 1) {
    return "1 week";
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} weeks`;
  } else if (diffInMonths === 1) {
    return "1 month";
  } else if (diffInMonths < 12) {
    return `${diffInMonths} months`;
  } else if (diffInYears === 1) {
    return "1 year";
  } else {
    return `${diffInYears} years`;
  }
}
