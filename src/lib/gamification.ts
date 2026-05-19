import { supabaseAdmin } from './supabase';

/**
 * Gamification System - XP Award & Badge Management
 * Hệ thống trao thưởng XP và huy hiệu cho Python Master 12
 */

// ============================================================
// XP Level Calculation
// ============================================================

/**
 * Tính level dựa trên tổng XP.
 * Formula: level = floor(sqrt(totalXP / 100))
 * Level tối thiểu là 1.
 */
export function calculateLevel(totalXP: number): number {
  if (totalXP <= 0) return 1;
  const level = Math.floor(Math.sqrt(totalXP / 100));
  return Math.max(1, level);
}

/**
 * Tính XP cần thiết để đạt level tiếp theo.
 * Từ formula: level = floor(sqrt(XP / 100))
 * => XP cần cho level n+1 = (n+1)^2 * 100
 */
export function getXPForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  return nextLevel * nextLevel * 100;
}

// ============================================================
// XP Award System
// ============================================================

export interface AwardXPResult {
  newTotalXP: number;
  previousLevel: number;
  newLevel: number;
  leveledUp: boolean;
  xpAwarded: number;
}

/**
 * Trao XP cho người dùng, cập nhật tổng XP và level.
 * Ghi log vào bảng xp_logs.
 *
 * @param userId - ID người dùng
 * @param amount - Số XP trao thưởng (phải > 0)
 * @param reason - Lý do trao XP (tiếng Việt)
 * @returns Kết quả trao XP bao gồm level mới
 */
export async function awardXP(
  userId: string | number,
  amount: number,
  reason: string
): Promise<AwardXPResult> {
  if (amount <= 0) {
    throw new Error('Số XP trao thưởng phải lớn hơn 0');
  }

  // Lấy thông tin XP hiện tại của user
  const { data: user, error: userError } = await supabaseAdmin
    .from('users')
    .select('xp, level')
    .eq('id', userId)
    .single();

  if (userError || !user) {
    throw new Error('Không tìm thấy người dùng');
  }

  const previousXP = user.xp ?? 0;
  const previousLevel = user.level ?? 1;
  const newTotalXP = previousXP + amount;
  const newLevel = calculateLevel(newTotalXP);

  // Ghi log XP transaction
  const { error: logError } = await supabaseAdmin
    .from('xp_logs')
    .insert({
      user_id: userId,
      amount,
      reason,
    });

  if (logError) {
    console.error('Lỗi ghi log XP:', logError);
  }

  // Cập nhật tổng XP và level cho user
  const { error: updateError } = await supabaseAdmin
    .from('users')
    .update({
      xp: newTotalXP,
      level: newLevel,
    })
    .eq('id', userId);

  if (updateError) {
    throw new Error('Không thể cập nhật XP cho người dùng');
  }

  const leveledUp = newLevel > previousLevel;

  // Nếu lên level, tạo thông báo
  if (leveledUp) {
    await supabaseAdmin.from('notifications').insert({
      user_id: userId,
      title: '🎉 Lên cấp!',
      content: `Chúc mừng! Bạn đã đạt cấp độ ${newLevel}!`,
      type: 'level_up',
      is_read: false,
    });
  }

  return {
    newTotalXP,
    previousLevel,
    newLevel,
    leveledUp,
    xpAwarded: amount,
  };
}

// ============================================================
// Badge System
// ============================================================

interface BadgeCriteria {
  slug: string;
  check: (userId: string | number) => Promise<boolean>;
}

/**
 * Danh sách tiêu chí kiểm tra huy hiệu.
 * Mỗi badge có một hàm check trả về true nếu user đủ điều kiện.
 */
const badgeCriteria: BadgeCriteria[] = [
  // Bài học
  {
    slug: 'first-lesson',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_completed', true);
      return (count ?? 0) >= 1;
    },
  },
  {
    slug: '10-lessons',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_completed', true);
      return (count ?? 0) >= 10;
    },
  },
  {
    slug: '50-lessons',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_completed', true);
      return (count ?? 0) >= 50;
    },
  },
  {
    slug: '100-lessons',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_completed', true);
      return (count ?? 0) >= 100;
    },
  },
  // Bài tập
  {
    slug: 'first-problem',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('score', 100);
      return (count ?? 0) >= 1;
    },
  },
  {
    slug: '10-problems',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('submissions')
        .select('exercise_id')
        .eq('user_id', userId)
        .eq('score', 100);
      const uniqueExercises = new Set(data?.map((s) => s.exercise_id));
      return uniqueExercises.size >= 10;
    },
  },
  {
    slug: '50-problems',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('submissions')
        .select('exercise_id')
        .eq('user_id', userId)
        .eq('score', 100);
      const uniqueExercises = new Set(data?.map((s) => s.exercise_id));
      return uniqueExercises.size >= 50;
    },
  },
  {
    slug: '100-problems',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('submissions')
        .select('exercise_id')
        .eq('user_id', userId)
        .eq('score', 100);
      const uniqueExercises = new Set(data?.map((s) => s.exercise_id));
      return uniqueExercises.size >= 100;
    },
  },
  // Streak
  {
    slug: 'streak-3',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();
      return (data?.current_streak ?? 0) >= 3;
    },
  },
  {
    slug: 'streak-7',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();
      return (data?.current_streak ?? 0) >= 7;
    },
  },
  {
    slug: 'streak-14',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();
      return (data?.current_streak ?? 0) >= 14;
    },
  },
  {
    slug: 'streak-30',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();
      return (data?.current_streak ?? 0) >= 30;
    },
  },
  {
    slug: 'streak-100',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('streaks')
        .select('current_streak')
        .eq('user_id', userId)
        .single();
      return (data?.current_streak ?? 0) >= 100;
    },
  },
  // Dự án
  {
    slug: 'first-project',
    check: async (userId) => {
      const { count } = await supabaseAdmin
        .from('project_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('score', 100);
      return (count ?? 0) >= 1;
    },
  },
  {
    slug: '5-projects',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('project_submissions')
        .select('project_id')
        .eq('user_id', userId)
        .eq('score', 100);
      const uniqueProjects = new Set(data?.map((s) => s.project_id));
      return uniqueProjects.size >= 5;
    },
  },
  {
    slug: '10-projects',
    check: async (userId) => {
      const { data } = await supabaseAdmin
        .from('project_submissions')
        .select('project_id')
        .eq('user_id', userId)
        .eq('score', 100);
      const uniqueProjects = new Set(data?.map((s) => s.project_id));
      return uniqueProjects.size >= 10;
    },
  },
];

/**
 * Kiểm tra và trao tất cả huy hiệu mà user đủ điều kiện nhưng chưa nhận.
 *
 * @param userId - ID người dùng
 * @returns Danh sách huy hiệu mới được trao
 */
export async function checkAndAwardBadges(
  userId: string | number
): Promise<{ id: number; name: string; slug: string; icon: string }[]> {
  // Lấy danh sách badge đã nhận
  const { data: earnedBadges } = await supabaseAdmin
    .from('user_badges')
    .select('badge_id, badges(slug)')
    .eq('user_id', userId);

  const earnedSlugs = new Set(
    earnedBadges?.map((ub) => {
      const badge = ub.badges as unknown as { slug: string } | null;
      return badge?.slug;
    }).filter(Boolean) ?? []
  );

  // Lấy tất cả badges từ database
  const { data: allBadges } = await supabaseAdmin
    .from('badges')
    .select('id, name, slug, icon, xp_reward');

  if (!allBadges || allBadges.length === 0) return [];

  const newlyAwarded: { id: number; name: string; slug: string; icon: string }[] = [];

  for (const criteria of badgeCriteria) {
    // Bỏ qua nếu đã nhận
    if (earnedSlugs.has(criteria.slug)) continue;

    // Tìm badge tương ứng trong database
    const badge = allBadges.find((b) => b.slug === criteria.slug);
    if (!badge) continue;

    // Kiểm tra điều kiện
    const eligible = await criteria.check(userId);
    if (!eligible) continue;

    // Trao badge
    const { error: insertError } = await supabaseAdmin
      .from('user_badges')
      .insert({
        user_id: userId,
        badge_id: badge.id,
      });

    if (insertError) {
      // Có thể do unique constraint (đã trao rồi), bỏ qua
      console.error(`Lỗi trao badge ${badge.slug}:`, insertError);
      continue;
    }

    newlyAwarded.push({
      id: badge.id,
      name: badge.name,
      slug: badge.slug,
      icon: badge.icon,
    });

    // Trao XP thưởng cho badge (nếu có)
    if (badge.xp_reward > 0) {
      await awardXP(userId, badge.xp_reward, `Nhận huy hiệu "${badge.name}"`);
    }

    // Tạo thông báo
    await supabaseAdmin.from('notifications').insert({
      user_id: userId,
      title: `${badge.icon} Huy hiệu mới!`,
      content: `Chúc mừng! Bạn đã nhận huy hiệu "${badge.name}" - ${badge.slug}`,
      type: 'badge',
      is_read: false,
    });
  }

  return newlyAwarded;
}
