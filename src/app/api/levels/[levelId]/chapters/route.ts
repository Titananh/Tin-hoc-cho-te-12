import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

interface RouteParams {
  params: { levelId: string };
}

/**
 * GET /api/levels/[levelId]/chapters
 * Returns all chapters for the specified level with their lessons.
 * For authenticated users, includes completion status and exercise progress.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { levelId } = params;

    // Validate levelId
    const levelIdNum = parseInt(levelId, 10);
    if (isNaN(levelIdNum) || levelIdNum <= 0) {
      return NextResponse.json(
        { error: 'ID cấp độ không hợp lệ' },
        { status: 400 }
      );
    }

    // Check if the level (course) exists
    const { data: level, error: levelError } = await supabaseAdmin
      .from('courses')
      .select('id, title, slug, description, order_index, is_published')
      .eq('id', levelIdNum)
      .single();

    if (levelError || !level) {
      return NextResponse.json(
        { error: 'Không tìm thấy cấp độ này' },
        { status: 404 }
      );
    }

    // Fetch all chapters (modules) for this level, ordered by order_index
    const { data: chapters, error: chaptersError } = await supabaseAdmin
      .from('modules')
      .select('id, title, slug, description, order_index')
      .eq('course_id', levelIdNum)
      .order('order_index', { ascending: true });

    if (chaptersError) {
      console.error('Error fetching chapters:', chaptersError);
      return NextResponse.json(
        { error: 'Đã xảy ra lỗi khi tải danh sách chương' },
        { status: 500 }
      );
    }

    if (!chapters || chapters.length === 0) {
      return NextResponse.json({
        level: {
          id: level.id,
          title: level.title,
          slug: level.slug,
          description: level.description,
        },
        chapters: [],
      });
    }

    // Fetch all lessons for these chapters
    const chapterIds = chapters.map((ch) => ch.id);
    const { data: lessons, error: lessonsError } = await supabaseAdmin
      .from('lessons')
      .select('id, module_id, title, slug, description, difficulty, estimated_minutes, xp_reward, order_index')
      .in('module_id', chapterIds)
      .order('order_index', { ascending: true });

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      return NextResponse.json(
        { error: 'Đã xảy ra lỗi khi tải danh sách bài học' },
        { status: 500 }
      );
    }

    // Get authenticated user session (optional - endpoint works for both auth and unauth)
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    // For authenticated users, fetch progress and exercise data
    let userProgressMap: Record<number, { is_completed: boolean; completed_at: string | null }> = {};
    let exerciseCountMap: Record<number, { total: number; completed: number }> = {};

    if (userId && lessons && lessons.length > 0) {
      const lessonIds = lessons.map((l) => l.id);

      // Fetch user progress for all lessons in this level
      const { data: progressData } = await supabaseAdmin
        .from('user_progress')
        .select('lesson_id, is_completed, completed_at')
        .eq('user_id', userId)
        .in('lesson_id', lessonIds);

      if (progressData) {
        for (const progress of progressData) {
          userProgressMap[progress.lesson_id] = {
            is_completed: progress.is_completed,
            completed_at: progress.completed_at,
          };
        }
      }

      // Fetch all exercises for these lessons
      const { data: exercises } = await supabaseAdmin
        .from('exercises')
        .select('id, lesson_id')
        .in('lesson_id', lessonIds);

      if (exercises && exercises.length > 0) {
        // Count exercises per lesson
        for (const exercise of exercises) {
          if (!exerciseCountMap[exercise.lesson_id]) {
            exerciseCountMap[exercise.lesson_id] = { total: 0, completed: 0 };
          }
          exerciseCountMap[exercise.lesson_id].total++;
        }

        // Fetch completed exercises (score = 100) for this user
        const exerciseIds = exercises.map((e) => e.id);
        const { data: completedSubmissions } = await supabaseAdmin
          .from('submissions')
          .select('exercise_id')
          .eq('user_id', userId)
          .eq('score', 100)
          .in('exercise_id', exerciseIds);

        if (completedSubmissions) {
          // Get unique completed exercise IDs
          const completedExerciseIds = new Set(
            completedSubmissions.map((s) => s.exercise_id)
          );

          // Map completed exercises back to lessons
          for (const exercise of exercises) {
            if (completedExerciseIds.has(exercise.id)) {
              if (exerciseCountMap[exercise.lesson_id]) {
                exerciseCountMap[exercise.lesson_id].completed++;
              }
            }
          }
        }
      }
    } else if (lessons && lessons.length > 0) {
      // For unauthenticated users, still fetch exercise counts (without completion)
      const lessonIds = lessons.map((l) => l.id);
      const { data: exercises } = await supabaseAdmin
        .from('exercises')
        .select('id, lesson_id')
        .in('lesson_id', lessonIds);

      if (exercises) {
        for (const exercise of exercises) {
          if (!exerciseCountMap[exercise.lesson_id]) {
            exerciseCountMap[exercise.lesson_id] = { total: 0, completed: 0 };
          }
          exerciseCountMap[exercise.lesson_id].total++;
        }
      }
    }

    // Build response: chapters with their lessons
    const chaptersWithLessons = chapters.map((chapter) => {
      const chapterLessons = (lessons ?? [])
        .filter((l) => l.module_id === chapter.id)
        .map((lesson) => {
          const progress = userProgressMap[lesson.id];
          const exerciseData = exerciseCountMap[lesson.id];

          const lessonResponse: Record<string, unknown> = {
            id: lesson.id,
            title: lesson.title,
            slug: lesson.slug,
            description: lesson.description,
            difficulty: lesson.difficulty,
            estimated_minutes: lesson.estimated_minutes,
            xp_reward: lesson.xp_reward,
            order_index: lesson.order_index,
          };

          // Include completion status for authenticated users
          if (userId) {
            lessonResponse.is_completed = progress?.is_completed ?? false;
            lessonResponse.completed_at = progress?.completed_at ?? null;
            lessonResponse.exercise_count = exerciseData?.total ?? 0;
            lessonResponse.completed_exercise_count = exerciseData?.completed ?? 0;
          }

          return lessonResponse;
        });

      return {
        id: chapter.id,
        title: chapter.title,
        slug: chapter.slug,
        description: chapter.description,
        order_index: chapter.order_index,
        lessons: chapterLessons,
      };
    });

    return NextResponse.json({
      level: {
        id: level.id,
        title: level.title,
        slug: level.slug,
        description: level.description,
      },
      chapters: chaptersWithLessons,
    });
  } catch (error) {
    console.error('Error fetching level chapters:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
