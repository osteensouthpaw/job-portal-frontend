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

// Helper function to format time ago
export const formatTimeAgo = (date: string) => {
  const d = new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? "s" : ""} ago`;
};
