/**
 * Utility Functions
 * Common helper functions for the Python Master 12 application
 */

/**
 * Formats a date into a Vietnamese "time ago" string
 * @param date - The date to format (Date object or ISO string)
 * @returns Vietnamese time ago string (e.g., "2 giờ trước", "3 ngày trước")
 */
export function formatTimeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'vừa xong';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'phút' : 'phút'} trước`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'giờ' : 'giờ'} trước`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'ngày' : 'ngày'} trước`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'tuần' : 'tuần'} trước`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'tháng' : 'tháng'} trước`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'năm' : 'năm'} trước`;
}

/**
 * Formats a number with Vietnamese locale formatting
 * @param num - The number to format
 * @returns Formatted string with Vietnamese locale (e.g., "1,000")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}

/**
 * Truncates text to a maximum length and appends ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3).trim() + '...';
}

/**
 * Returns the initials from a person's name
 * @param name - Full name to extract initials from
 * @returns First letter of each word, capitalized (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Generates a consistent gradient CSS string from a seed string
 * Uses string hash to generate deterministic colors
 * @param seed - String to generate gradient from
 * @returns CSS gradient string (e.g., "linear-gradient(135deg, #123456, #789ABC)")
 */
export function generateGradient(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const hue1 = Math.abs(hash % 360);
  const hue2 = (hue1 + 40) % 360;

  const color1 = `hsl(${hue1}, 70%, 60%)`;
  const color2 = `hsl(${hue2}, 70%, 60%)`;

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

/**
 * Joins class names conditionally, filtering out falsy values
 * @param classes - Array of class names (string, undefined, or false)
 * @returns Combined class string
 */
export function classNames(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const cn = classNames;

/**
 * Creates a debounced version of a function
 * @param fn - The function to debounce
 * @param ms - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, ms);
  }) as T;
}

/**
 * Creates a delay/promise that resolves after specified milliseconds
 * @param ms - Number of milliseconds to wait
 * @returns Promise that resolves after delay
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}