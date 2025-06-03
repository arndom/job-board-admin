import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export function formatTimeAgo(date: Date): string {
  return dayjs(date).fromNow()
}


export function extractReplyOnly(body: string) {
  // Common split lines
  const splitPatterns = [
    /^On .*<.*@.*> wrote:/m,
    /^> /m,
    /^From: /m
  ];

  for (const pattern of splitPatterns) {
    const parts = body.split(pattern);
    if (parts.length > 1) return parts[0].trim();
  }

  return body.trim(); // if no match, return full body
}
