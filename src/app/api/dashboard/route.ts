import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { isDevBypass } from '@/lib/dev-store';
import { getDevDashboardData } from '@/lib/dev-mock';

/**
 * GET /api/dashboard
 * Returns comprehensive dashboard data for the authenticated user:
 * - User profile (name, avatar, level, XP, streak)
 * - Progress overview per level (course)
 * - Next recommended lesson/exercise
 * - Recently earned badges (up to 5)
 * - Incomplete exercises sorted by level order
 * - Learning calendar (30-day activity)
 * - XP per day (past 7 days)
 * - Daily learning goals status
 * - Flashcards due for review today
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem bảng điều khiển' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // ===== DEV MODE: return mock dashboard data =====
    if (isDevBypass()) {
      return NextResponse.json(getDevDashboardData(userId, session.user.name ?? 'Học viên'));
    }

    // 1. Fetch user basic data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, avatar_url, role, xp, level, streak_count, created_at')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // 2. Fetch streak data
    const { data: streakData } = await supabaseAdmin
      .from('streaks')
      .select('current_streak, longest_streak, last_activity_date')
      .eq('user_id', userId)
      .single();

    // 3. Fetch all courses (levels) with their modules and exercises for progress calculation
    const { data: courses } = await supabaseAdmin
      .from('courses')
      .select('id, title, order_index')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    // 4. Fetch all exercises grouped by course for progress overview
    const { data: allExercises } = await supabaseAdmin
      .from('exercises')
      .select(`
        id,
        lesson_id,
        lessons!inner (
          id,
          module_id,
          order_index,
          modules!inner (
            id,
            course_id,
            order_index
          )
        )
      `)
      .order('id', { ascending: true });

    // 5. Fetch user's completed exercises (score = 100)
    const { data: completedSubmissions } = await supabaseAdmin
      .from('submissions')
      .select('exercise_id, score')
      .eq('user_id', userId)
      .eq('score', 100);

    const completedExerciseIds = new Set(
      completedSubmissions?.map((s) => s.exercise_id) ?? []
    );

    // 6. Calculate progress per level (course)
    const progressOverview = (courses ?? []).map((course) => {
      const courseExercises = (allExercises ?? []).filter((ex) => {
        const lesson = ex.lessons as unknown as { module_id: number; modules: { course_id: number } };
        return lesson?.modules?.course_id === course.id;
      });

      const totalExercises = courseExercises.length;
      const completedCount = courseExercises.filter((ex) =>
        completedExerciseIds.has(ex.id)
      ).length;

      const percentage = totalExercises > 0
        ? Math.round((completedCount / totalExercises) * 100)
        : 0;

      return {
        courseId: course.id,
        courseTitle: course.title,
        orderIndex: course.order_index,
        totalExercises,
        completedExercises: completedCount,
        progressPercentage: percentage,
      };
    });

    // 7. Find next recommended lesson/exercise (first incomplete in current level)
    const nextRecommended = await getNextRecommended(userId, allExercises, completedExerciseIds);

    // 8. Fetch recently earned badges (up to 5 most recent)
    const { data: recentBadges } = await supabaseAdmin
      .from('user_badges')
      .select(`
        id,
        earned_at,
        badges (
          id,
          name,
          slug,
          description,
          icon,
          color
        )
      `)
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
      .limit(5);

    // 9. Fetch incomplete exercises sorted by level sequence order
    const incompleteExercises = getIncompleteExercises(allExercises, completedExerciseIds);

    // 10. Learning calendar: days with activity in past 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: activityLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    const learningCalendar = buildLearningCalendar(activityLogs ?? []);

    // 11. XP earned per day over past 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: xpLogs7Days } = await supabaseAdmin
      .from('xp_logs')
      .select('amount, created_at')
      .eq('user_id', userId)
      .gte('created_at', sevenDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    const xpPerDay = buildXpPerDay(xpLogs7Days ?? []);

    // 12. Daily learning goals status
    const todayStart = getTodayStartVietnam();
    const todayEnd = getTodayEndVietnam();

    // Exercises completed today
    const { data: todaySubmissions } = await supabaseAdmin
      .from('submissions')
      .select('exercise_id')
      .eq('user_id', userId)
      .eq('score', 100)
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd);

    const uniqueExercisesToday = new Set(
      todaySubmissions?.map((s) => s.exercise_id) ?? []
    ).size;

    // XP earned today
    const { data: todayXpLogs } = await supabaseAdmin
      .from('xp_logs')
      .select('amount')
      .eq('user_id', userId)
      .gte('created_at', todayStart)
      .lte('created_at', todayEnd);

    const xpEarnedToday = (todayXpLogs ?? []).reduce((sum, log) => sum + log.amount, 0);

    const dailyGoals = {
      exercisesCompleted: uniqueExercisesToday,
      exercisesTarget: 3,
      xpEarned: xpEarnedToday,
      xpTarget: 50,
    };

    // 13. Flashcards due for review today
    // Since flashcard_reviews table doesn't exist yet, return total flashcard count as placeholder
    const { count: flashcardsDueCount } = await supabaseAdmin
      .from('flashcards')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      user: {
        id: String(user.id),
        name: user.name,
        avatarUrl: user.avatar_url,
        level: user.level,
        totalXp: user.xp,
        currentStreak: streakData?.current_streak ?? user.streak_count,
        longestStreak: streakData?.longest_streak ?? 0,
      },
      progressOverview,
      nextRecommended,
      recentBadges: (recentBadges ?? []).map((ub) => ({
        id: ub.id,
        earnedAt: ub.earned_at,
        badge: ub.badges,
      })),
      incompleteExercises: incompleteExercises.slice(0, 20),
      learningCalendar,
      xpPerDay,
      dailyGoals,
      flashcardsDueToday: flashcardsDueCount ?? 0,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải bảng điều khiển. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * Find the next recommended lesson or exercise for the user.
 * Returns the first incomplete exercise in the user's current level order.
 */
async function getNextRecommended(
  userId: string,
  allExercises: unknown[] | null,
  completedExerciseIds: Set<number>
) {
  // Find first incomplete exercise sorted by course order -> module order -> lesson order
  if (!allExercises || allExercises.length === 0) {
    return null;
  }

  type ExerciseWithRelations = {
    id: number;
    lesson_id: number;
    lessons: {
      id: number;
      module_id: number;
      order_index: number;
      modules: {
        id: number;
        course_id: number;
        order_index: number;
      };
    };
  };

  const sortedExercises = (allExercises as ExerciseWithRelations[])
    .filter((ex) => ex.lessons && ex.lessons.modules)
    .sort((a, b) => {
      const courseOrderA = a.lessons.modules.order_index;
      const courseOrderB = b.lessons.modules.order_index;
      if (courseOrderA !== courseOrderB) return courseOrderA - courseOrderB;

      const moduleOrderA = a.lessons.order_index;
      const moduleOrderB = b.lessons.order_index;
      if (moduleOrderA !== moduleOrderB) return moduleOrderA - moduleOrderB;

      return a.id - b.id;
    });

  const nextIncomplete = sortedExercises.find(
    (ex) => !completedExerciseIds.has(ex.id)
  );

  if (!nextIncomplete) {
    // All exercises completed, check for incomplete lessons
    const { data: incompleteLessons } = await supabaseAdmin
      .from('lessons')
      .select(`
        id,
        title,
        order_index,
        modules!inner (
          id,
          order_index,
          course_id
        )
      `)
      .eq('is_published', true)
      .order('order_index', { ascending: true })
      .limit(1);

    if (incompleteLessons && incompleteLessons.length > 0) {
      return {
        type: 'lesson' as const,
        id: incompleteLessons[0].id,
        title: incompleteLessons[0].title,
      };
    }

    return null;
  }

  // Fetch exercise title
  const { data: exerciseDetail } = await supabaseAdmin
    .from('exercises')
    .select('id, title')
    .eq('id', nextIncomplete.id)
    .single();

  return {
    type: 'exercise' as const,
    id: nextIncomplete.id,
    title: exerciseDetail?.title ?? `Bài tập #${nextIncomplete.id}`,
    lessonId: nextIncomplete.lesson_id,
  };
}

/**
 * Get incomplete exercises sorted by level (course) sequence order.
 */
function getIncompleteExercises(
  allExercises: unknown[] | null,
  completedExerciseIds: Set<number>
) {
  if (!allExercises || allExercises.length === 0) {
    return [];
  }

  type ExerciseWithRelations = {
    id: number;
    lesson_id: number;
    lessons: {
      id: number;
      module_id: number;
      order_index: number;
      modules: {
        id: number;
        course_id: number;
        order_index: number;
      };
    };
  };

  return (allExercises as ExerciseWithRelations[])
    .filter((ex) => !completedExerciseIds.has(ex.id) && ex.lessons && ex.lessons.modules)
    .sort((a, b) => {
      const courseOrderA = a.lessons.modules.order_index;
      const courseOrderB = b.lessons.modules.order_index;
      if (courseOrderA !== courseOrderB) return courseOrderA - courseOrderB;

      const moduleOrderA = a.lessons.order_index;
      const moduleOrderB = b.lessons.order_index;
      if (moduleOrderA !== moduleOrderB) return moduleOrderA - moduleOrderB;

      return a.id - b.id;
    })
    .map((ex) => ({
      exerciseId: ex.id,
      lessonId: ex.lesson_id,
      courseOrderIndex: ex.lessons.modules.order_index,
      moduleOrderIndex: ex.lessons.order_index,
    }));
}

/**
 * Build learning calendar showing active days in the past 30 days.
 */
function buildLearningCalendar(activityLogs: { created_at: string }[]) {
  const activeDays = new Set<string>();

  for (const log of activityLogs) {
    // Convert to Vietnam timezone (UTC+7)
    const date = new Date(log.created_at);
    const vietnamDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const dateStr = vietnamDate.toISOString().split('T')[0];
    activeDays.add(dateStr);
  }

  // Build 30-day calendar
  const calendar: { date: string; active: boolean }[] = [];
  const today = new Date();
  const vietnamToday = new Date(today.getTime() + 7 * 60 * 60 * 1000);

  for (let i = 29; i >= 0; i--) {
    const date = new Date(vietnamToday);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    calendar.push({
      date: dateStr,
      active: activeDays.has(dateStr),
    });
  }

  return calendar;
}

/**
 * Build XP earned per day for the past 7 days.
 */
function buildXpPerDay(xpLogs: { amount: number; created_at: string }[]) {
  const xpByDay = new Map<string, number>();

  for (const log of xpLogs) {
    // Convert to Vietnam timezone (UTC+7)
    const date = new Date(log.created_at);
    const vietnamDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    const dateStr = vietnamDate.toISOString().split('T')[0];
    xpByDay.set(dateStr, (xpByDay.get(dateStr) ?? 0) + log.amount);
  }

  // Build 7-day chart data
  const chartData: { date: string; xp: number }[] = [];
  const today = new Date();
  const vietnamToday = new Date(today.getTime() + 7 * 60 * 60 * 1000);

  for (let i = 6; i >= 0; i--) {
    const date = new Date(vietnamToday);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    chartData.push({
      date: dateStr,
      xp: xpByDay.get(dateStr) ?? 0,
    });
  }

  return chartData;
}

/**
 * Get today's start time in Vietnam timezone (UTC+7) as ISO string.
 */
function getTodayStartVietnam(): string {
  const now = new Date();
  // Get current time in Vietnam (UTC+7)
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const vietnamNow = new Date(now.getTime() + vietnamOffset);
  // Get start of day in Vietnam
  const startOfDay = new Date(vietnamNow);
  startOfDay.setUTCHours(0, 0, 0, 0);
  // Convert back to UTC
  const utcStart = new Date(startOfDay.getTime() - vietnamOffset);
  return utcStart.toISOString();
}

/**
 * Get today's end time in Vietnam timezone (UTC+7) as ISO string.
 */
function getTodayEndVietnam(): string {
  const now = new Date();
  // Get current time in Vietnam (UTC+7)
  const vietnamOffset = 7 * 60 * 60 * 1000;
  const vietnamNow = new Date(now.getTime() + vietnamOffset);
  // Get end of day in Vietnam
  const endOfDay = new Date(vietnamNow);
  endOfDay.setUTCHours(23, 59, 59, 999);
  // Convert back to UTC
  const utcEnd = new Date(endOfDay.getTime() - vietnamOffset);
  return utcEnd.toISOString();
}
