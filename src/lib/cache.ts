/**
 * Simple In-Memory Cache with TTL
 * Dùng cho caching leaderboard, level data, và các dữ liệu truy cập thường xuyên
 *
 * Lưu ý: Cache này chỉ hoạt động trong một process.
 * Khi deploy trên Vercel (serverless), mỗi function invocation có thể có cache riêng.
 * Để cache phân tán, nâng cấp lên Redis.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

interface CacheEntry<T> {
  value: T;
  expiresAt: number; // Unix timestamp (ms)
}

// ─── Cache Store ─────────────────────────────────────────────────────────────

const store = new Map<string, CacheEntry<unknown>>();

// Default TTL: 5 minutes
const DEFAULT_TTL_MS = 5 * 60 * 1000;

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Lấy giá trị từ cache.
 * Trả về undefined nếu key không tồn tại hoặc đã hết hạn.
 *
 * @param key - Cache key
 * @returns Giá trị đã cache hoặc undefined
 */
export function get<T>(key: string): T | undefined {
  const entry = store.get(key);

  if (!entry) {
    return undefined;
  }

  // Kiểm tra hết hạn
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }

  return entry.value as T;
}

/**
 * Lưu giá trị vào cache với TTL.
 *
 * @param key - Cache key
 * @param value - Giá trị cần cache
 * @param ttlMs - Thời gian sống (ms). Mặc định 5 phút.
 */
export function set<T>(key: string, value: T, ttlMs: number = DEFAULT_TTL_MS): void {
  const expiresAt = Date.now() + ttlMs;
  store.set(key, { value, expiresAt });
}

/**
 * Xóa một key khỏi cache.
 *
 * @param key - Cache key cần xóa
 * @returns true nếu key tồn tại và đã bị xóa
 */
export function invalidate(key: string): boolean {
  return store.delete(key);
}

/**
 * Xóa toàn bộ cache.
 */
export function clear(): void {
  store.clear();
}

/**
 * Lấy số lượng entries hiện tại trong cache (bao gồm cả expired chưa bị dọn).
 */
export function size(): number {
  return store.size;
}

/**
 * Kiểm tra key có tồn tại và chưa hết hạn không.
 *
 * @param key - Cache key
 * @returns true nếu key tồn tại và còn hiệu lực
 */
export function has(key: string): boolean {
  const entry = store.get(key);
  if (!entry) return false;

  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return false;
  }

  return true;
}

/**
 * Lấy giá trị từ cache, hoặc gọi factory function nếu cache miss.
 * Kết quả từ factory sẽ được lưu vào cache.
 *
 * @param key - Cache key
 * @param factory - Hàm tạo giá trị khi cache miss
 * @param ttlMs - TTL cho giá trị mới
 * @returns Giá trị từ cache hoặc factory
 */
export async function getOrSet<T>(
  key: string,
  factory: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
  const cached = get<T>(key);
  if (cached !== undefined) {
    return cached;
  }

  const value = await factory();
  set(key, value, ttlMs);
  return value;
}

// ─── Cleanup (dọn dẹp entries hết hạn) ──────────────────────────────────────

/**
 * Dọn dẹp tất cả entries đã hết hạn.
 * Gọi định kỳ để tránh memory leak.
 */
export function cleanup(): number {
  const now = Date.now();
  let removed = 0;

  for (const [key, entry] of store.entries()) {
    if (now > entry.expiresAt) {
      store.delete(key);
      removed++;
    }
  }

  return removed;
}

// Auto-cleanup mỗi 10 phút
const CLEANUP_INTERVAL = 10 * 60 * 1000;
const cleanupTimer = setInterval(cleanup, CLEANUP_INTERVAL);
if (cleanupTimer.unref) {
  cleanupTimer.unref();
}

// ─── Cache Key Helpers ───────────────────────────────────────────────────────

export const CacheKeys = {
  leaderboard: (period: string) => `leaderboard:${period}`,
  userProgress: (userId: string) => `user-progress:${userId}`,
  levelData: (levelId: number) => `level:${levelId}`,
  lessonContent: (lessonId: number) => `lesson:${lessonId}`,
  adminStats: () => 'admin:dashboard-stats',
} as const;
