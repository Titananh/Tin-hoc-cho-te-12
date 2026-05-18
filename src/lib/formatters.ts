/**
 * Formatters
 * Formatting utilities for displaying data in the Python Master 12 UI
 */

/**
 * Formats XP number into display string
 * @param xp - The XP amount to format
 * @returns Formatted XP string (e.g., "1,250 XP")
 */
export function formatXP(xp: number): string {
  return `${new Intl.NumberFormat('vi-VN').format(xp)} XP`;
}

/**
 * Formats duration in minutes into Vietnamese display string
 * @param minutes - Duration in minutes
 * @returns Formatted duration string (e.g., "15 phút")
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'phút' : 'phút'}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'giờ' : 'giờ'}`;
  }

  return `${hours} ${hours === 1 ? 'giờ' : 'giờ'} ${remainingMinutes} phút`;
}

/**
 * Formats a date into Vietnamese display format
 * @param date - The date to format (Date object or ISO string)
 * @param format - Format type: 'short' (e.g., "12/05/2026") or 'long' (e.g., "12 tháng 5, 2026")
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'long' = 'short'
): string {
  const d = new Date(date);

  if (format === 'short') {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  }

  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(d);
}

/**
 * Formats progress as percentage with text
 * @param current - Current progress value
 * @param total - Total/goal value
 * @returns Object containing percent (0-100) and text (e.g., "75%")
 */
export function formatProgress(
  current: number,
  total: number
): { percent: number; text: string } {
  if (total === 0) {
    return { percent: 0, text: '0%' };
  }

  const percent = Math.min(Math.round((current / total) * 100), 100);
  return {
    percent,
    text: `${percent}%`,
  };
}