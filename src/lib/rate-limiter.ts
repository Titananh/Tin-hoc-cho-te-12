/**
 * Module rate limiting cho code execution.
 *
 * - In-memory rate limiter (Map-based, có thể nâng cấp lên Redis sau)
 * - Giới hạn: 10 lần chạy code mỗi phút cho mỗi user
 * - Trả về thông báo tiếng Việt khi vượt giới hạn
 * - Tự động dọn dẹp entries hết hạn mỗi 5 phút
 */

// Cấu hình
const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_DURATION_MS = 60 * 1000; // 1 phút
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 phút

interface RateLimitRecord {
  /** Danh sách timestamp của các request trong window hiện tại */
  timestamps: number[];
}

/** In-memory store theo dõi request theo userId */
const rateLimitStore = new Map<string, RateLimitRecord>();

/** Kết quả kiểm tra rate limit */
export interface RateLimitResult {
  /** Cho phép request hay không */
  allowed: boolean;
  /** Số request còn lại trong window hiện tại */
  remainingRequests: number;
  /** Thời điểm reset window (Unix timestamp ms) */
  resetTime: number;
}

/**
 * Lọc bỏ các timestamp ngoài window hiện tại.
 */
function filterExpiredTimestamps(timestamps: number[], now: number): number[] {
  const windowStart = now - WINDOW_DURATION_MS;
  return timestamps.filter((ts) => ts > windowStart);
}

/**
 * Kiểm tra rate limit cho user.
 * @param userId - ID của user cần kiểm tra
 * @returns Kết quả kiểm tra bao gồm allowed, remainingRequests, resetTime
 */
export function checkRateLimit(userId: string): RateLimitResult {
  const now = Date.now();
  const record = rateLimitStore.get(userId);

  if (!record) {
    return {
      allowed: true,
      remainingRequests: MAX_REQUESTS_PER_WINDOW,
      resetTime: now + WINDOW_DURATION_MS,
    };
  }

  // Lọc bỏ timestamps hết hạn
  const validTimestamps = filterExpiredTimestamps(record.timestamps, now);
  record.timestamps = validTimestamps;

  const requestCount = validTimestamps.length;
  const allowed = requestCount < MAX_REQUESTS_PER_WINDOW;
  const remainingRequests = Math.max(0, MAX_REQUESTS_PER_WINDOW - requestCount);

  // resetTime là thời điểm timestamp cũ nhất hết hạn (nếu đã đầy)
  let resetTime: number;
  if (validTimestamps.length > 0) {
    resetTime = validTimestamps[0] + WINDOW_DURATION_MS;
  } else {
    resetTime = now + WINDOW_DURATION_MS;
  }

  return {
    allowed,
    remainingRequests,
    resetTime,
  };
}

/**
 * Ghi nhận một request từ user.
 * @param userId - ID của user thực hiện request
 */
export function recordRequest(userId: string): void {
  const now = Date.now();

  if (!rateLimitStore.has(userId)) {
    rateLimitStore.set(userId, { timestamps: [now] });
    return;
  }

  const record = rateLimitStore.get(userId)!;
  // Lọc bỏ timestamps hết hạn trước khi thêm mới
  record.timestamps = filterExpiredTimestamps(record.timestamps, now);
  record.timestamps.push(now);
}

/**
 * Tạo thông báo tiếng Việt khi vượt rate limit.
 * @param resetTime - Thời điểm reset (Unix timestamp ms)
 * @returns Thông báo tiếng Việt
 */
export function getRateLimitMessage(resetTime: number): string {
  const now = Date.now();
  const remainingSeconds = Math.ceil((resetTime - now) / 1000);
  const seconds = Math.max(1, remainingSeconds);
  return `Bạn đã chạy code quá nhiều lần. Vui lòng đợi ${seconds} giây.`;
}

/**
 * Dọn dẹp các entries hết hạn trong store.
 * Xóa các user không còn timestamp nào trong window hiện tại.
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();

  for (const [userId, record] of rateLimitStore.entries()) {
    const validTimestamps = filterExpiredTimestamps(record.timestamps, now);
    if (validTimestamps.length === 0) {
      rateLimitStore.delete(userId);
    } else {
      record.timestamps = validTimestamps;
    }
  }
}

// Tự động dọn dẹp mỗi 5 phút
let cleanupInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Khởi động auto-cleanup interval.
 * Gọi hàm này khi server khởi động.
 */
export function startCleanup(): void {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(cleanupExpiredEntries, CLEANUP_INTERVAL_MS);
  // Cho phép process thoát mà không cần đợi interval
  if (cleanupInterval.unref) {
    cleanupInterval.unref();
  }
}

/**
 * Dừng auto-cleanup interval.
 */
export function stopCleanup(): void {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

// Tự động khởi động cleanup khi module được import
startCleanup();

// Export cho testing
export const _testHelpers = {
  clearStore: () => rateLimitStore.clear(),
  getStore: () => rateLimitStore,
  cleanupExpiredEntries,
  MAX_REQUESTS_PER_WINDOW,
  WINDOW_DURATION_MS,
  CLEANUP_INTERVAL_MS,
};
