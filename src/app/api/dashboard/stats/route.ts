import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/dashboard/stats
 * Returns additional analytics data beyond the main dashboard:
 * - Total time spent learning (sum of time_spent from user_progress)
 * - Average quiz score across all quizzes taken
 * - Total submissions count
 * - Acceptance rate (submissions with score=100 / total submissions × 100)
 * - Most active day of the week (day with most XP earned)
 * - Current level progress (XP needed for next level)
 * - Comparison with previous week (XP this week vs last week)
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem thống kê chi tiết' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch user basic data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, xp, level')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // 1. Total time spent learning (sum of time_spent from user_progress, in minutes)
    const { data: progressData } = await supabaseAdmin
      .from('user_progress')
      .select('time_spent')
      .eq('user_id', userId);

    const totalTimeSpentMinutes = (progressData ?? []).reduce(
      (sum, record) => sum + (record.time_spent ?? 0),
      0
    );

    // 2. Average quiz score across all quizzes taken
    // Since quiz_attempts table doesn't exist yet, use submissions score as proxy
    const { data: allSubmissions } = await supabaseAdmin
      .from('submissions')
      .select('id, score, created_at')
      .eq('user_id', userId);

    const scoredSubmissions = (allSubmissions ?? []).filter(
      (s) => s.score !== null && s.score !== undefined
    );
    const averageQuizScore =
      scoredSubmissions.length > 0
        ? Math.round(
            scoredSubmissions.reduce((sum, s) => sum + (s.score ?? 0), 0) /
              scoredSubmissions.length
          )
        : 0;

    // 3. Total submissions count
    const totalSubmissions = allSubmissions?.length ?? 0;

    // 4. Acceptance rate (submissions with score=100 / total submissions × 100)
    const acceptedSubmissions = (allSubmissions ?? []).filter(
      (s) => s.score === 100
    ).length;
    const acceptanceRate =
      totalSubmissions > 0
        ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
        : 0;

    // 5. Most active day of the week (day with most XP earned)
    const { data: allXpLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('amount, created_at')
      .eq('user_id', userId);

    const xpByDayOfWeek = getMostActiveDayOfWeek(allXpLogs ?? []);

    // 6. Current level progress
    const totalXp = user.xp ?? 0;
    const currentLevel = Math.floor(Math.sqrt(totalXp / 100));
    const xpForCurrentLevel = currentLevel * currentLevel * 100;
    const nextLevel = currentLevel + 1;
    const xpForNextLevel = nextLevel * nextLevel * 100;
    const xpNeededForNextLevel = xpForNextLevel - totalXp;
    const levelProgressPercentage =
      xpForNextLevel - xpForCurrentLevel > 0
        ? Math.round(
            ((totalXp - xpForCurrentLevel) /
              (xpForNextLevel - xpForCurrentLevel)) *
              100
          )
        : 0;

    // 7. Comparison with previous week (XP this week vs last week)
    const weekComparison = getWeekComparison(allXpLogs ?? []);

    return NextResponse.json({
      totalTimeSpentMinutes,
      averageQuizScore,
      totalSubmissions,
      acceptanceRate,
      mostActiveDayOfWeek: xpByDayOfWeek,
      levelProgress: {
        currentLevel,
        nextLevel,
        totalXp,
        xpForCurrentLevel,
        xpForNextLevel,
        xpNeededForNextLevel,
        progressPercentage: levelProgressPercentage,
      },
      weekComparison,
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thống kê. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * Determine the most active day of the week based on XP earned.
 * Returns the day name in Vietnamese and XP totals per day.
 */
function getMostActiveDayOfWeek(xpLogs: { amount: number; created_at: string }[]) {
  const dayNames = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];

  const xpByDay: number[] = [0, 0, 0, 0, 0, 0, 0];

  for (const log of xpLogs) {
    // Convert to Vietnam timezone (UTC+7)
    const date = new Date(log.created_at);
    const vietnamDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const dayOfWeek = vietnamDate.getUTCDay();
    xpByDay[dayOfWeek] += log.amount;
  }

  // Find the day with the most XP
  let maxXp = 0;
  let mostActiveIndex = 0;
  for (let i = 0; i < 7; i++) {
    if (xpByDay[i] > maxXp) {
      maxXp = xpByDay[i];
      mostActiveIndex = i;
    }
  }

  return {
    dayName: dayNames[mostActiveIndex],
    dayIndex: mostActiveIndex,
    xp: maxXp,
    xpByDay: dayNames.map((name, index) => ({
      day: name,
      xp: xpByDay[index],
    })),
  };
}

/**
 * Compare XP earned this week vs last week.
 * Week starts on Monday (Vietnam timezone UTC+7).
 */
function getWeekComparison(xpLogs: { amount: number; created_at: string }[]) {
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const now = new Date();
  const vietnamNow = new Date(now.getTime() + vietnamOffset);

  // Get start of this week (Monday)
  const thisWeekStart = new Date(vietnamNow.getTime());
  const currentDay = vietnamNow.getUTCDay();
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
  thisWeekStart.setUTCDate(thisWeekStart.getUTCDate() - daysFromMonday);
  thisWeekStart.setUTCHours(0, 0, 0, 0);

  // Get start of last week
  const lastWeekStart = new Date(thisWeekStart.getTime());
  lastWeekStart.setUTCDate(lastWeekStart.getUTCDate() - 7);

  // Convert back to UTC for comparison
  const thisWeekStartUtc = new Date(thisWeekStart.getTime() - vietnamOffset);
  const lastWeekStartUtc = new Date(lastWeekStart.getTime() - vietnamOffset);

  let xpThisWeek = 0;
  let xpLastWeek = 0;

  for (const log of xpLogs) {
    const logDate = new Date(log.created_at);

    if (logDate >= thisWeekStartUtc) {
      xpThisWeek += log.amount;
    } else if (logDate >= lastWeekStartUtc && logDate < thisWeekStartUtc) {
      xpLastWeek += log.amount;
    }
  }

  // Calculate percentage change
  const percentageChange =
    xpLastWeek > 0
      ? Math.round(((xpThisWeek - xpLastWeek) / xpLastWeek) * 100)
      : xpThisWeek > 0
        ? 100
        : 0;

  return {
    xpThisWeek,
    xpLastWeek,
    percentageChange,
    trend: xpThisWeek > xpLastWeek ? 'up' : xpThisWeek < xpLastWeek ? 'down' : 'same',
  };
}
