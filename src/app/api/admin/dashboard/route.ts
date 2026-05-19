import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/dashboard
 * Returns comprehensive admin dashboard data:
 * - Statistics: total users, active users, content counts, submissions, badges
 * - Recent activity: last 10 user registrations
 * - Engagement metrics: DAU (30 days), lessons completed/day, exercises submitted/day
 * - Top performers: top 5 users by XP this week
 */
export async function GET() {
  try {
    // Admin authorization check
    const guard = await requireAdmin();
    if (guard) return guard;

    // --- 1. Statistics ---
    const [
      totalUsersResult,
      activeUsersWeekResult,
      totalLessonsResult,
      totalExercisesResult,
      totalSubmissionsResult,
      totalBadgesEarnedResult,
    ] = await Promise.all([
      // Total registered users
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true }),
      // Users active within last 7 days
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('last_active', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      // Total lessons
      supabaseAdmin
        .from('lessons')
        .select('*', { count: 'exact', head: true }),
      // Total exercises
      supabaseAdmin
        .from('exercises')
        .select('*', { count: 'exact', head: true }),
      // Total submissions
      supabaseAdmin
        .from('submissions')
        .select('*', { count: 'exact', head: true }),
      // Total badges earned
      supabaseAdmin
        .from('user_badges')
        .select('*', { count: 'exact', head: true }),
    ]);

    const statistics = {
      totalUsers: totalUsersResult.count ?? 0,
      activeUsersThisWeek: activeUsersWeekResult.count ?? 0,
      totalLessons: totalLessonsResult.count ?? 0,
      totalExercises: totalExercisesResult.count ?? 0,
      totalSubmissions: totalSubmissionsResult.count ?? 0,
      totalBadgesEarned: totalBadgesEarnedResult.count ?? 0,
    };

    // --- 2. Recent Activity: last 10 user registrations ---
    const { data: recentRegistrations } = await supabaseAdmin
      .from('users')
      .select('name, email, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    const recentActivity = (recentRegistrations ?? []).map((user) => ({
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
    }));

    // --- 3. Engagement Metrics ---

    // 3a. Daily active users for past 30 days (for chart)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const { data: activeUsersRaw } = await supabaseAdmin
      .from('users')
      .select('last_active')
      .gte('last_active', thirtyDaysAgo.toISOString())
      .not('last_active', 'is', null);

    const dailyActiveUsers = buildDailyActiveUsers(activeUsersRaw ?? [], 30);

    // 3b. Lessons completed per day for past 7 days (using xp_logs with source = lesson)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const { data: lessonsCompletedRaw } = await supabaseAdmin
      .from('xp_logs')
      .select('created_at')
      .eq('source', 'lesson')
      .gte('created_at', sevenDaysAgo.toISOString());

    const lessonsCompletedPerDay = buildCountPerDay(lessonsCompletedRaw ?? [], 7);

    // 3c. Exercises submitted per day for past 7 days
    const { data: exercisesSubmittedRaw } = await supabaseAdmin
      .from('submissions')
      .select('created_at')
      .gte('created_at', sevenDaysAgo.toISOString());

    const exercisesSubmittedPerDay = buildCountPerDay(exercisesSubmittedRaw ?? [], 7);

    const engagementMetrics = {
      dailyActiveUsers,
      lessonsCompletedPerDay,
      exercisesSubmittedPerDay,
    };

    // --- 4. Top Performers: Top 5 users by XP this week ---
    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const { data: topXpLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('user_id, amount')
      .gte('created_at', weekStart.toISOString());

    // Aggregate XP per user this week
    const xpByUser = new Map<number, number>();
    for (const log of topXpLogs ?? []) {
      xpByUser.set(log.user_id, (xpByUser.get(log.user_id) ?? 0) + log.amount);
    }

    // Sort and get top 5
    const topUserIds = [...xpByUser.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    let topPerformers: { userId: number; name: string; email: string; xpThisWeek: number }[] = [];

    if (topUserIds.length > 0) {
      const { data: topUsersData } = await supabaseAdmin
        .from('users')
        .select('id, name, email')
        .in('id', topUserIds.map(([id]) => id));

      const usersMap = new Map(
        (topUsersData ?? []).map((u) => [u.id, u])
      );

      topPerformers = topUserIds.map(([userId, xp]) => {
        const user = usersMap.get(userId);
        return {
          userId,
          name: user?.name ?? 'Không xác định',
          email: user?.email ?? '',
          xpThisWeek: xp,
        };
      });
    }

    return NextResponse.json({
      statistics,
      recentActivity,
      engagementMetrics,
      topPerformers,
    });
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu admin dashboard:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải dữ liệu bảng điều khiển quản trị. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * Build daily active users count for the past N days.
 * Groups users by the date of their last_active field (Vietnam timezone UTC+7).
 */
function buildDailyActiveUsers(
  users: { last_active: string }[],
  days: number
): { date: string; count: number }[] {
  const countByDay = new Map<string, Set<string>>();

  for (const user of users) {
    const date = new Date(user.last_active);
    const vietnamDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const dateStr = vietnamDate.toISOString().split('T')[0];
    if (!countByDay.has(dateStr)) {
      countByDay.set(dateStr, new Set());
    }
    // Use the last_active value as a unique identifier per user per day
    countByDay.get(dateStr)!.add(user.last_active);
  }

  const result: { date: string; count: number }[] = [];
  const today = new Date();
  const vietnamToday = new Date(today.getTime() + 7 * 60 * 60 * 1000);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(vietnamToday);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: countByDay.get(dateStr)?.size ?? 0,
    });
  }

  return result;
}

/**
 * Build count per day for the past N days from records with created_at field.
 * Uses Vietnam timezone (UTC+7).
 */
function buildCountPerDay(
  records: { created_at: string }[],
  days: number
): { date: string; count: number }[] {
  const countByDay = new Map<string, number>();

  for (const record of records) {
    const date = new Date(record.created_at);
    const vietnamDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const dateStr = vietnamDate.toISOString().split('T')[0];
    countByDay.set(dateStr, (countByDay.get(dateStr) ?? 0) + 1);
  }

  const result: { date: string; count: number }[] = [];
  const today = new Date();
  const vietnamToday = new Date(today.getTime() + 7 * 60 * 60 * 1000);

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(vietnamToday);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: countByDay.get(dateStr) ?? 0,
    });
  }

  return result;
}
