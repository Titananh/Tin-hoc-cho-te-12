/**
 * AI message rate limiter cho PyMate.
 *
 * - Giới hạn: 100 tin nhắn mỗi ngày cho mỗi user
 * - In-memory Map theo dõi số tin nhắn hàng ngày
 * - Reset lúc 00:00 giờ Việt Nam (UTC+7)
 * - Thông báo tiếng Việt khi vượt giới hạn
 */

// Cấu hình
const MAX_MESSAGES_PER_DAY = 100;

interface AiRateLimitRecord {
  /** Số tin nhắn đã gửi trong ngày */
  count: number;
  /** Ngày (YYYY-MM-DD theo UTC+7) */
  date: string;
}

/** In-memory store theo dõi tin nhắn AI theo userId */
const aiRateLimitStore = new Map<string, AiRateLimitRecord>();

/**
 * Lấy ngày hiện tại theo múi giờ Việt Nam (UTC+7).
 * Format: YYYY-MM-DD
 */
function getVietnamDate(): string {
  const now = new Date();
  // UTC+7: cộng 7 giờ vào UTC time
  const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  return vietnamTime.toISOString().split('T')[0];
}

/**
 * Tính thời gian còn lại đến nửa đêm Việt Nam (UTC+7).
 * @returns Số phút còn lại đến khi reset
 */
function getMinutesUntilReset(): number {
  const now = new Date();
  // Tính thời điểm hiện tại theo UTC+7
  const vietnamNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  // Tính nửa đêm ngày tiếp theo theo UTC+7
  const tomorrow = new Date(vietnamNow);
  tomorrow.setUTCHours(0, 0, 0, 0);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  // Chuyển về UTC để so sánh
  const midnightVietnamUTC = new Date(tomorrow.getTime() - 7 * 60 * 60 * 1000);

  const diffMs = midnightVietnamUTC.getTime() - now.getTime();
  return Math.max(1, Math.ceil(diffMs / (60 * 1000)));
}

/** Kết quả kiểm tra AI rate limit */
export interface AiRateLimitResult {
  /** Cho phép gửi tin nhắn hay không */
  allowed: boolean;
  /** Số tin nhắn còn lại trong ngày */
  remainingMessages: number;
  /** Thông báo lỗi (nếu bị chặn) */
  message?: string;
}

/**
 * Kiểm tra rate limit AI cho user.
 * @param userId - ID của user cần kiểm tra
 * @returns Kết quả kiểm tra
 */
export function checkAiRateLimit(userId: string): AiRateLimitResult {
  const today = getVietnamDate();
  const record = aiRateLimitStore.get(userId);

  // Chưa có record hoặc record từ ngày khác → cho phép
  if (!record || record.date !== today) {
    return {
      allowed: true,
      remainingMessages: MAX_MESSAGES_PER_DAY,
    };
  }

  const remaining = Math.max(0, MAX_MESSAGES_PER_DAY - record.count);
  const allowed = record.count < MAX_MESSAGES_PER_DAY;

  if (!allowed) {
    const minutesLeft = getMinutesUntilReset();
    const hoursLeft = Math.floor(minutesLeft / 60);
    const minsLeft = minutesLeft % 60;

    let timeStr: string;
    if (hoursLeft > 0) {
      timeStr = `${hoursLeft} giờ ${minsLeft} phút`;
    } else {
      timeStr = `${minsLeft} phút`;
    }

    return {
      allowed: false,
      remainingMessages: 0,
      message: `Bạn đã sử dụng hết ${MAX_MESSAGES_PER_DAY} tin nhắn AI trong ngày. Giới hạn sẽ được reset sau ${timeStr}.`,
    };
  }

  return {
    allowed,
    remainingMessages: remaining,
  };
}

/**
 * Ghi nhận một tin nhắn AI từ user.
 * @param userId - ID của user gửi tin nhắn
 */
export function recordAiMessage(userId: string): void {
  const today = getVietnamDate();
  const record = aiRateLimitStore.get(userId);

  if (!record || record.date !== today) {
    // Ngày mới → reset counter
    aiRateLimitStore.set(userId, { count: 1, date: today });
    return;
  }

  record.count += 1;
}

/**
 * Lấy số tin nhắn AI còn lại trong ngày cho user.
 * @param userId - ID của user
 * @returns Số tin nhắn còn lại
 */
export function getRemainingMessages(userId: string): number {
  const today = getVietnamDate();
  const record = aiRateLimitStore.get(userId);

  if (!record || record.date !== today) {
    return MAX_MESSAGES_PER_DAY;
  }

  return Math.max(0, MAX_MESSAGES_PER_DAY - record.count);
}

/**
 * Lấy thời gian reset giới hạn AI cho user.
 * @param userId - ID của user
 * @returns Thời điểm reset (ISO string) - nửa đêm Việt Nam tiếp theo
 */
export function getAiLimitResetTime(userId: string): string {
  const now = new Date();
  // Tính thời điểm hiện tại theo UTC+7
  const vietnamNow = new Date(now.getTime() + 7 * 60 * 60 * 1000);

  // Tính nửa đêm ngày tiếp theo theo UTC+7
  const tomorrow = new Date(vietnamNow);
  tomorrow.setUTCHours(0, 0, 0, 0);
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  // Chuyển về UTC
  const midnightVietnamUTC = new Date(tomorrow.getTime() - 7 * 60 * 60 * 1000);

  return midnightVietnamUTC.toISOString();
}

// Export cho testing
export const _testHelpers = {
  clearStore: () => aiRateLimitStore.clear(),
  getStore: () => aiRateLimitStore,
  getVietnamDate,
  MAX_MESSAGES_PER_DAY,
};
