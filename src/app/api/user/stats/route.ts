import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/user/stats
 * Returns user statistics (total XP, current level, streak, badges count,
 * lessons completed, exercises solved, projects finished, join date)
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem thống kê' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch user basic data (XP, level, streak, join date)
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('xp, level, streak_count, created_at')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Fetch badges count
    const { count: badgesCount } = await supabaseAdmin
      .from('user_badges')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Fetch lessons completed count
    const { count: lessonsCompleted } = await supabaseAdmin
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_completed', true);

    // Fetch exercises solved count (unique exercises with score = 100)
    const { data: solvedExercises } = await supabaseAdmin
      .from('submissions')
      .select('exercise_id')
      .eq('user_id', userId)
      .eq('score', 100);

    // Count unique exercises solved
    const uniqueExercisesSolved = solvedExercises
      ? new Set(solvedExercises.map((s) => s.exercise_id)).size
      : 0;

    // Fetch streak data from streaks table
    const { data: streakData } = await supabaseAdmin
      .from('streaks')
      .select('current_streak, longest_streak')
      .eq('user_id', userId)
      .single();

    return NextResponse.json({
      stats: {
        total_xp: user.xp,
        current_level: user.level,
        current_streak: streakData?.current_streak ?? user.streak_count,
        longest_streak: streakData?.longest_streak ?? 0,
        badges_count: badgesCount ?? 0,
        lessons_completed: lessonsCompleted ?? 0,
        exercises_solved: uniqueExercisesSolved,
        projects_finished: 0, // Will be implemented when projects table is populated
        join_date: user.created_at,
      },
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thống kê. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
