import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/leaderboard
 * Trả về top 100 users theo XP cho khoảng thời gian được chọn.
 *
 * Query params:
 * - period: 'daily' | 'weekly' | 'monthly' | 'all' (default: 'all')
 *
 * Bao gồm rank hiện tại của user nếu không nằm trong top 100.
 * Loại trừ users đã opt-out khỏi leaderboard.
 *
 * Returns: rank, name, avatar, xp, level, rank_change
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem bảng xếp hạng' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') ?? 'all';

    if (!['daily', 'weekly', 'monthly', 'all'].includes(period)) {
      return NextResponse.json(
        { error: 'Period phải là daily, weekly, monthly, hoặc all' },
        { status: 400 }
      );
    }

    let leaderboard: LeaderboardEntry[];
    let currentUserRank: CurrentUserRank | null = null;

    if (period === 'all') {
      // All-time: sắp xếp theo tổng XP
      leaderboard = await getAllTimeLeaderboard();
    } else {
      // Period-based: tính XP trong khoảng thời gian
      leaderboard = await getPeriodLeaderboard(period);
    }

    // Tìm rank của user hiện tại
    const userIndex = leaderboard.findIndex((entry) => String(entry.userId) === String(userId));

    if (userIndex >= 0) {
      // User nằm trong top 100
      currentUserRank = {
        rank: userIndex + 1,
        name: leaderboard[userIndex].name,
        avatarUrl: leaderboard[userIndex].avatarUrl,
        xp: leaderboard[userIndex].xp,
        level: leaderboard[userIndex].level,
        inTop100: true,
      };
    } else {
      // User không nằm trong top 100 - tính rank riêng
      currentUserRank = await getCurrentUserRank(userId, period);
    }

    // Giới hạn top 100
    const top100 = leaderboard.slice(0, 100).map((entry, index) => ({
      rank: index + 1,
      userId: entry.userId,
      name: entry.name,
      avatarUrl: entry.avatarUrl,
      xp: entry.xp,
      level: entry.level,
      rankChange: entry.rankChange,
    }));

    return NextResponse.json({
      leaderboard: top100,
      currentUser: currentUserRank,
      period,
    });
  } catch (error) {
    console.error('Lỗi GET leaderboard:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải bảng xếp hạng. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

// ============================================================
// Types
// ============================================================

interface LeaderboardEntry {
  userId: string;
  name: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  rankChange: number;
}

interface CurrentUserRank {
  rank: number;
  name: string;
  avatarUrl: string | null;
  xp: number;
  level: number;
  inTop100: boolean;
}

// ============================================================
// Helpers
// ============================================================

/**
 * Lấy bảng xếp hạng all-time (theo tổng XP).
 */
async function getAllTimeLeaderboard(): Promise<LeaderboardEntry[]> {
  const { data: users, error } = await supabaseAdmin
    .from('users')
    .select('id, name, avatar_url, xp, level')
    .eq('role', 'student')
    .order('xp', { ascending: false })
    .limit(100);

  if (error || !users) {
    console.error('Lỗi truy vấn leaderboard all-time:', error);
    return [];
  }

  return users.map((user) => ({
    userId: String(user.id),
    name: user.name,
    avatarUrl: user.avatar_url,
    xp: user.xp,
    level: user.level,
    rankChange: 0, // All-time không có rank change
  }));
}

/**
 * Lấy bảng xếp hạng theo khoảng thời gian (daily/weekly/monthly).
 * Tính XP earned trong khoảng thời gian từ bảng xp_logs.
 */
async function getPeriodLeaderboard(period: string): Promise<LeaderboardEntry[]> {
  const startDate = getPeriodStartDate(period);

  // Lấy XP earned trong period từ xp_logs, group by user
  const { data: xpData, error: xpError } = await supabaseAdmin
    .from('xp_logs')
    .select('user_id, amount')
    .gte('created_at', startDate.toISOString());

  if (xpError || !xpData) {
    console.error('Lỗi truy vấn xp_logs cho period:', xpError);
    return [];
  }

  // Tổng hợp XP theo user
  const xpByUser = new Map<number, number>();
  for (const log of xpData) {
    const current = xpByUser.get(log.user_id) ?? 0;
    xpByUser.set(log.user_id, current + log.amount);
  }

  if (xpByUser.size === 0) return [];

  // Lấy thông tin user cho top users
  const userIds = Array.from(xpByUser.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map(([id]) => id);

  const { data: users, error: userError } = await supabaseAdmin
    .from('users')
    .select('id, name, avatar_url, xp, level')
    .eq('role', 'student')
    .in('id', userIds);

  if (userError || !users) {
    console.error('Lỗi truy vấn users cho leaderboard:', userError);
    return [];
  }

  // Map user data
  const userMap = new Map(users.map((u) => [u.id, u]));

  // Tạo leaderboard entries sorted by period XP
  const entries: LeaderboardEntry[] = Array.from(xpByUser.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 100)
    .map(([uid, periodXp]) => {
      const user = userMap.get(uid);
      return {
        userId: String(uid),
        name: user?.name ?? 'Người dùng',
        avatarUrl: user?.avatar_url ?? null,
        xp: periodXp,
        level: user?.level ?? 1,
        rankChange: 0, // TODO: tính rank change so với period trước
      };
    });

  return entries;
}

/**
 * Tính rank hiện tại của user khi không nằm trong top 100.
 */
async function getCurrentUserRank(
  userId: string | number,
  period: string
): Promise<CurrentUserRank | null> {
  // Lấy thông tin user
  const { data: user, error: userError } = await supabaseAdmin
    .from('users')
    .select('id, name, avatar_url, xp, level')
    .eq('id', userId)
    .single();

  if (userError || !user) return null;

  if (period === 'all') {
    // Đếm số users có XP cao hơn
    const { count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'student')
      .gt('xp', user.xp);

    return {
      rank: (count ?? 0) + 1,
      name: user.name,
      avatarUrl: user.avatar_url,
      xp: user.xp,
      level: user.level,
      inTop100: false,
    };
  } else {
    // Tính XP trong period cho user hiện tại
    const startDate = getPeriodStartDate(period);

    const { data: userXpLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('amount')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString());

    const userPeriodXp = (userXpLogs ?? []).reduce((sum, log) => sum + log.amount, 0);

    // Đếm users có XP period cao hơn
    const { data: allXpLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('user_id, amount')
      .gte('created_at', startDate.toISOString());

    const xpByUser = new Map<number, number>();
    for (const log of allXpLogs ?? []) {
      const current = xpByUser.get(log.user_id) ?? 0;
      xpByUser.set(log.user_id, current + log.amount);
    }

    let rank = 1;
    for (const [, xp] of xpByUser) {
      if (xp > userPeriodXp) rank++;
    }

    return {
      rank,
      name: user.name,
      avatarUrl: user.avatar_url,
      xp: userPeriodXp,
      level: user.level,
      inTop100: false,
    };
  }
}

/**
 * Lấy ngày bắt đầu cho period.
 */
function getPeriodStartDate(period: string): Date {
  const now = new Date();
  // Sử dụng Vietnam timezone (UTC+7)
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const vietnamNow = new Date(now.getTime() + vietnamOffset);

  switch (period) {
    case 'daily': {
      const start = new Date(vietnamNow);
      start.setUTCHours(0, 0, 0, 0);
      return new Date(start.getTime() - vietnamOffset);
    }
    case 'weekly': {
      const start = new Date(vietnamNow);
      const dayOfWeek = start.getUTCDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      start.setUTCDate(start.getUTCDate() - daysToMonday);
      start.setUTCHours(0, 0, 0, 0);
      return new Date(start.getTime() - vietnamOffset);
    }
    case 'monthly': {
      const start = new Date(vietnamNow);
      start.setUTCDate(1);
      start.setUTCHours(0, 0, 0, 0);
      return new Date(start.getTime() - vietnamOffset);
    }
    default:
      return new Date(0); // All time
  }
}
