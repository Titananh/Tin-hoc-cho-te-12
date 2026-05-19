/**
 * Module quản lý khóa tài khoản sau nhiều lần đăng nhập thất bại.
 * 
 * - Theo dõi số lần đăng nhập thất bại theo email (in-memory Map)
 * - Sau 5 lần thất bại trong 15 phút, khóa tài khoản 30 phút
 * - Trả về thời gian khóa còn lại bằng tiếng Việt
 * - Reset bộ đếm khi đăng nhập thành công
 * 
 * Có thể nâng cấp lên Redis sau này để hỗ trợ multi-instance.
 */

// Cấu hình
const MAX_FAILED_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 phút
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 phút

interface LoginAttemptRecord {
  /** Danh sách timestamp của các lần đăng nhập thất bại */
  failedAttempts: number[];
  /** Thời điểm tài khoản bị khóa (null nếu chưa bị khóa) */
  lockedUntil: number | null;
}

/** In-memory store theo dõi login attempts theo email */
const attemptStore = new Map<string, LoginAttemptRecord>();

/**
 * Lấy record hiện tại cho email, tạo mới nếu chưa có.
 */
function getRecord(email: string): LoginAttemptRecord {
  const normalizedEmail = email.toLowerCase().trim();
  if (!attemptStore.has(normalizedEmail)) {
    attemptStore.set(normalizedEmail, {
      failedAttempts: [],
      lockedUntil: null,
    });
  }
  return attemptStore.get(normalizedEmail)!;
}

/**
 * Kiểm tra tài khoản có đang bị khóa không.
 * @param email - Email cần kiểm tra
 * @returns true nếu tài khoản đang bị khóa
 */
export function isAccountLocked(email: string): boolean {
  const normalizedEmail = email.toLowerCase().trim();
  const record = attemptStore.get(normalizedEmail);

  if (!record || record.lockedUntil === null) {
    return false;
  }

  const now = Date.now();

  // Nếu thời gian khóa đã hết, tự động mở khóa
  if (now >= record.lockedUntil) {
    record.lockedUntil = null;
    record.failedAttempts = [];
    return false;
  }

  return true;
}

/**
 * Lấy thời gian khóa còn lại (milliseconds).
 * @param email - Email cần kiểm tra
 * @returns Số milliseconds còn lại, hoặc 0 nếu không bị khóa
 */
export function getRemainingLockTime(email: string): number {
  const normalizedEmail = email.toLowerCase().trim();
  const record = attemptStore.get(normalizedEmail);

  if (!record || record.lockedUntil === null) {
    return 0;
  }

  const now = Date.now();
  const remaining = record.lockedUntil - now;

  if (remaining <= 0) {
    // Hết thời gian khóa
    record.lockedUntil = null;
    record.failedAttempts = [];
    return 0;
  }

  return remaining;
}

/**
 * Tạo thông báo tiếng Việt về thời gian khóa còn lại.
 * @param email - Email cần kiểm tra
 * @returns Thông báo tiếng Việt, hoặc null nếu không bị khóa
 */
export function getLockMessage(email: string): string | null {
  const remainingMs = getRemainingLockTime(email);

  if (remainingMs <= 0) {
    return null;
  }

  const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));

  if (remainingMinutes <= 1) {
    return 'Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 1 phút.';
  }

  return `Tài khoản đã bị khóa do đăng nhập sai quá nhiều lần. Vui lòng thử lại sau ${remainingMinutes} phút.`;
}

/**
 * Ghi nhận một lần đăng nhập thất bại.
 * Nếu đạt ngưỡng 5 lần trong 15 phút, tài khoản sẽ bị khóa 30 phút.
 * @param email - Email đăng nhập thất bại
 * @returns true nếu tài khoản bị khóa sau lần thất bại này
 */
export function recordFailedAttempt(email: string): boolean {
  const record = getRecord(email);
  const now = Date.now();

  // Nếu đang bị khóa, không cần ghi thêm
  if (record.lockedUntil !== null && now < record.lockedUntil) {
    return true;
  }

  // Lọc bỏ các lần thất bại ngoài cửa sổ 15 phút
  const windowStart = now - ATTEMPT_WINDOW_MS;
  record.failedAttempts = record.failedAttempts.filter(
    (timestamp) => timestamp > windowStart
  );

  // Thêm lần thất bại mới
  record.failedAttempts.push(now);

  // Kiểm tra ngưỡng khóa
  if (record.failedAttempts.length >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    return true;
  }

  return false;
}

/**
 * Reset bộ đếm khi đăng nhập thành công.
 * @param email - Email đăng nhập thành công
 */
export function resetAttempts(email: string): void {
  const normalizedEmail = email.toLowerCase().trim();
  attemptStore.delete(normalizedEmail);
}

/**
 * Lấy số lần thất bại còn lại trước khi bị khóa.
 * @param email - Email cần kiểm tra
 * @returns Số lần thất bại còn được phép
 */
export function getRemainingAttempts(email: string): number {
  const record = getRecord(email);
  const now = Date.now();

  // Lọc bỏ các lần thất bại ngoài cửa sổ 15 phút
  const windowStart = now - ATTEMPT_WINDOW_MS;
  const recentAttempts = record.failedAttempts.filter(
    (timestamp) => timestamp > windowStart
  );

  return Math.max(0, MAX_FAILED_ATTEMPTS - recentAttempts.length);
}

// Export cho testing
export const _testHelpers = {
  clearStore: () => attemptStore.clear(),
  getStore: () => attemptStore,
  MAX_FAILED_ATTEMPTS,
  ATTEMPT_WINDOW_MS,
  LOCKOUT_DURATION_MS,
};
