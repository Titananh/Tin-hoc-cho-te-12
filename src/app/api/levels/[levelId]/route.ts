import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/levels/[levelId]
 * Returns detailed information for a single level including:
 * - Level info (title, description, icon, color)
 * - All chapters with their lessons
 * - Each lesson: title, description, estimated_minutes, difficulty, completion status
 * - Each chapter: title, description, lessons list
 * Requires authentication for progress data. Public access shows structure only.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { levelId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;
    const levelId = parseInt(params.levelId, 10);

    if (isNaN(levelId)) {
      return NextResponse.json(
        { error: 'ID cấp độ không hợp lệ' },
        { status: 400 }
      );
    }

    // Fetch the level (course)
    const { data: level, error: levelError } = await supabaseAdmin
      .from('courses')
      .select('id, title, slug, description, icon, color, order_index, is_published')
      .eq('id', levelId)
      .eq('is_published', true)
      .single();

    if (levelError || !level) {
      return NextResponse.json(
        { error: 'Không tìm thấy cấp độ này' },
        { status: 404 }
      );
    }

    // Fetch all modules (chapters) for this level
    const { data: modules, error: modulesError } = await supabaseAdmin
      .from('modules')
      .select('id, title, slug, description, order_index')
      .eq('course_id', levelId)
      .order('order_index', { ascending: true });

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách chương. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    const moduleIds = (modules ?? []).map((m) => m.id);

    // Fetch all lessons for these modules
    let lessons: Array<{
      id: number;
      module_id: number;
      title: string;
      slug: string;
      description: string | null;
      difficulty: string;
      estimated_minutes: number;
      order_index: number;
      xp_reward: number;
      is_published: boolean;
    }> = [];

    if (moduleIds.length > 0) {
      const { data: lessonsData, error: lessonsError } = await supabaseAdmin
        .from('lessons')
        .select('id, module_id, title, slug, description, difficulty, estimated_minutes, order_index, xp_reward, is_published')
        .in('module_id', moduleIds)
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
        return NextResponse.json(
          { error: 'Không thể tải danh sách bài học. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }

      lessons = lessonsData ?? [];
    }

    // Fetch user progress for lessons if authenticated
    let completedLessonIds: Set<number> = new Set();

    if (userId && lessons.length > 0) {
      const lessonIds = lessons.map((l) => l.id);
      const { data: progressData } = await supabaseAdmin
        .from('user_progress')
        .select('lesson_id')
        .eq('user_id', userId)
        .eq('is_completed', true)
        .in('lesson_id', lessonIds);

      if (progressData) {
        for (const p of progressData) {
          completedLessonIds.add(p.lesson_id);
        }
      }
    }

    // Determine unlock status for this level
    let isUnlocked = true;

    if (level.order_index > 1 && userId) {
      // Find the previous level
      const { data: prevLevel } = await supabaseAdmin
        .from('courses')
        .select('id')
        .eq('is_published', true)
        .lt('order_index', level.order_index)
        .order('order_index', { ascending: false })
        .limit(1)
        .single();

      if (prevLevel) {
        // Check if previous level is 100% complete
        const { data: prevModules } = await supabaseAdmin
          .from('modules')
          .select('id')
          .eq('course_id', prevLevel.id);

        if (prevModules && prevModules.length > 0) {
          const prevModuleIds = prevModules.map((m) => m.id);

          const { data: prevLessons } = await supabaseAdmin
            .from('lessons')
            .select('id')
            .in('module_id', prevModuleIds)
            .eq('is_published', true);

          const prevLessonIds = (prevLessons ?? []).map((l) => l.id);

          // Fetch exercises for previous level
          const { data: prevExercises } = await supabaseAdmin
            .from('exercises')
            .select('id')
            .in('lesson_id', prevLessonIds);

          const totalPrevItems = prevLessonIds.length + (prevExercises ?? []).length;

          if (totalPrevItems > 0) {
            // Count completed lessons in previous level
            const { count: completedPrevLessons } = await supabaseAdmin
              .from('user_progress')
              .select('*', { count: 'exact', head: true })
              .eq('user_id', userId)
              .eq('is_completed', true)
              .in('lesson_id', prevLessonIds);

            // Count completed exercises in previous level
            let completedPrevExercises = 0;
            if (prevExercises && prevExercises.length > 0) {
              const prevExerciseIds = prevExercises.map((e) => e.id);
              const { data: completedExData } = await supabaseAdmin
                .from('submissions')
                .select('exercise_id')
                .eq('user_id', userId)
                .eq('score', 100)
                .in('exercise_id', prevExerciseIds);

              // Count unique completed exercises
              const uniqueCompleted = new Set((completedExData ?? []).map((s) => s.exercise_id));
              completedPrevExercises = uniqueCompleted.size;
            }

            const completedPrevItems = (completedPrevLessons ?? 0) + completedPrevExercises;
            isUnlocked = completedPrevItems >= totalPrevItems;
          }
        }
      }
    } else if (level.order_index > 1 && !userId) {
      // Not authenticated and not first level
      isUnlocked = false;
    }

    // Build lessons grouped by module
    const lessonsByModule: Record<number, typeof lessons> = {};
    for (const lesson of lessons) {
      if (!lessonsByModule[lesson.module_id]) {
        lessonsByModule[lesson.module_id] = [];
      }
      lessonsByModule[lesson.module_id].push(lesson);
    }

    // Build chapters response
    const chapters = (modules ?? []).map((mod) => {
      const modLessons = (lessonsByModule[mod.id] ?? [])
        .sort((a, b) => a.order_index - b.order_index)
        .map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          description: lesson.description,
          estimatedMinutes: lesson.estimated_minutes,
          difficulty: lesson.difficulty,
          xpReward: lesson.xp_reward,
          order: lesson.order_index,
          isCompleted: userId ? completedLessonIds.has(lesson.id) : null,
        }));

      return {
        id: mod.id,
        title: mod.title,
        slug: mod.slug,
        description: mod.description,
        order: mod.order_index,
        lessons: modLessons,
        totalLessons: modLessons.length,
        completedLessons: userId
          ? modLessons.filter((l) => l.isCompleted).length
          : null,
      };
    });

    // Calculate overall level progress
    const totalLessons = lessons.length;
    const completedLessons = userId ? completedLessonIds.size : 0;
    const progressPercentage = userId && totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : null;

    return NextResponse.json({
      id: level.id,
      title: level.title,
      slug: level.slug,
      description: level.description,
      icon: level.icon,
      color: level.color,
      order: level.order_index,
      isUnlocked,
      progressPercentage,
      totalLessons,
      completedLessons: userId ? completedLessons : null,
      chapters,
    });
  } catch (error) {
    console.error('Error in GET /api/levels/[levelId]:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông tin cấp độ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
