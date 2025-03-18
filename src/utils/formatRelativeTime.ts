export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInTime = now.getTime() - new Date(date).getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  if (diffInDays === 0) {
    return "Posted Today";
  } else if (diffInDays === 1) {
    return "Posted 1 day ago";
  } else if (diffInDays < 7) {
    return `Posted ${diffInDays} days ago`;
  } else if (diffInWeeks === 1) {
    return "Posted 1 week ago";
  } else if (diffInWeeks < 4) {
    return `Posted ${diffInWeeks} weeks ago`;
  } else if (diffInMonths === 1) {
    return "Posted 1 month ago";
  } else if (diffInMonths < 12) {
    return `Posted ${diffInMonths} months ago`;
  } else if (diffInYears === 1) {
    return "Posted 1 year ago";
  } else {
    return `Posted ${diffInYears} years ago`;
  }
}
