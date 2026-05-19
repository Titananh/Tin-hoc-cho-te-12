import { supabaseAdmin } from './supabase';
import { checkAndAwardBadges } from './gamification';

/**
 * Streak Tracking System - Hệ thống theo dõi chuỗi ngày học
 * Sử dụng múi giờ Việt Nam (UTC+7) cho ranh giới ngày.
 */

// ============================================================
// Timezone Helpers
// ============================================================

/**
 * Lấy ngày hiện tại theo múi giờ Việt Nam (UTC+7).
 * Trả về chuỗi YYYY-MM-DD.
 */
export function getTodayVietnam(): string {
  const now = new Date();
  const vietnamOffset = 7 * 60 * 60 * 1000; // UTC+7
  const vietnamNow = new Date(now.getTime() + vietnamOffset);
  return vietnamNow.toISOString().split('T')[0];
}

/**
 * Lấy ngày hôm qua theo múi giờ Việt Nam (UTC+7).
 * Trả về chuỗi YYYY-MM-DD.
 */
export function getYesterdayVietnam(): string {
  const now = new Date();
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const vietnamNow = new Date(now.getTime() + vietnamOffset);
  vietnamNow.setDate(vietnamNow.getDate() - 1);
  return vietnamNow.toISOString().split('T')[0];
}

// ============================================================
// Streak Update Logic
// ============================================================

export interface UpdateStreakResult {
  currentStreak: number;
  longestStreak: number;
  isNewDay: boolean;
  badgesAwarded: { id: number; name: string; slug: string; icon: string }[];
}

/**
 * Cập nhật streak khi user hoàn thành hoạt động.
 * 
 * Logic:
 * - Nếu last_activity_date = hôm nay (UTC+7): không thay đổi (nhiều lần cùng ngày = 1 ngày)
 * - Nếu last_activity_date = hôm qua (UTC+7): tăng streak +1
 * - Nếu last_activity_date < hôm qua: reset streak về 1
 * 
 * Trao badge:
 * - 7 ngày: "Tuần Hoàn Hảo" (streak-7)
 * - 30 ngày: "Tháng Kiên Trì" (streak-30)
 *
 * @param userId - ID người dùng
 * @returns Kết quả cập nhật streak
 */
export async function updateStreak(userId: string | number): Promise<UpdateStreakResult> {
  const today = getTodayVietnam();
  const yesterday = getYesterdayVietnam();

  // Lấy streak hiện tại
  const { data: streak, error: streakError } = await supabaseAdmin
    .from('streaks')
    .select('id, current_streak, longest_streak, last_activity_date')
    .eq('user_id', userId)
    .single();

  let currentStreak: number;
  let longestStreak: number;
  let isNewDay = false;

  if (streakError || !streak) {
    // Chưa có record streak, tạo mới
    currentStreak = 1;
    longestStreak = 1;
    isNewDay = true;

    await supabaseAdmin.from('streaks').insert({
      user_id: userId,
      current_streak: 1,
      longest_streak: 1,
      last_activity_date: today,
    });
  } else {
    const lastActivityDate = streak.last_activity_date;

    if (lastActivityDate === today) {
      // Cùng ngày - không thay đổi streak
      currentStreak = streak.current_streak;
      longestStreak = streak.longest_streak;
      isNewDay = false;
    } else if (lastActivityDate === yesterday) {
      // Ngày liên tiếp - tăng streak
      currentStreak = streak.current_streak + 1;
      longestStreak = Math.max(streak.longest_streak, currentStreak);
      isNewDay = true;

      await supabaseAdmin
        .from('streaks')
        .update({
          current_streak: currentStreak,
          longest_streak: longestStreak,
          last_activity_date: today,
        })
        .eq('user_id', userId);
    } else {
      // Bỏ lỡ ngày - reset streak về 1
      currentStreak = 1;
      longestStreak = streak.longest_streak; // Giữ longest streak
      isNewDay = true;

      await supabaseAdmin
        .from('streaks')
        .update({
          current_streak: 1,
          longest_streak: longestStreak,
          last_activity_date: today,
        })
        .eq('user_id', userId);
    }
  }

  // Cập nhật streak_count trên bảng users
  await supabaseAdmin
    .from('users')
    .update({ streak_count: currentStreak })
    .eq('id', userId);

  // Kiểm tra và trao badge nếu là ngày mới
  let badgesAwarded: { id: number; name: string; slug: string; icon: string }[] = [];
  if (isNewDay) {
    badgesAwarded = await checkAndAwardBadges(userId);
  }

  return {
    currentStreak,
    longestStreak,
    isNewDay,
    badgesAwarded,
  };
}

/**
 * Kiểm tra xem user có nguy cơ mất streak không.
 * Trả về true nếu đã hơn 20 giờ kể từ hoạt động cuối.
 *
 * @param userId - ID người dùng
 * @returns true nếu cần gửi nhắc nhở
 */
export async function isStreakAtRisk(userId: string | number): Promise<boolean> {
  const { data: streak } = await supabaseAdmin
    .from('streaks')
    .select('last_activity_date')
    .eq('user_id', userId)
    .single();

  if (!streak) return false;

  const today = getTodayVietnam();
  const lastActivity = streak.last_activity_date;

  // Nếu đã hoạt động hôm nay thì không có nguy cơ
  if (lastActivity === today) return false;

  // Nếu last_activity là hôm qua, kiểm tra thời gian
  const now = new Date();
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const vietnamNow = new Date(now.getTime() + vietnamOffset);

  // Tính thời gian từ đầu ngày hôm nay (Vietnam time)
  const startOfToday = new Date(today + 'T00:00:00');
  const hoursSinceStartOfDay = (vietnamNow.getTime() - startOfToday.getTime()) / (1000 * 60 * 60);

  // Nếu đã qua 20 giờ trong ngày mà chưa hoạt động
  return hoursSinceStartOfDay >= 20;
}
