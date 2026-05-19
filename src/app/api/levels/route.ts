import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/levels
 * Returns all levels (courses) with chapter info and user progress.
 * - Public access: returns level structure without progress
 * - Authenticated: includes progress percentage and locked/unlocked status
 * - Level 1 (order_index = 1) is always unlocked
 * - Subsequent levels unlock when previous level is 100% complete
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    // Fetch all published courses (levels) ordered by order_index
    const { data: levels, error: levelsError } = await supabaseAdmin
      .from('courses')
      .select('id, title, slug, description, icon, color, order_index, is_published')
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (levelsError) {
      console.error('Error fetching levels:', levelsError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách cấp độ. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (!levels || levels.length === 0) {
      return NextResponse.json({ levels: [] });
    }

    // Fetch all modules (chapters) with lesson counts
    const { data: modules, error: modulesError } = await supabaseAdmin
      .from('modules')
      .select('id, course_id, title, slug, description, order_index')
      .order('order_index', { ascending: true });

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách chương. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Fetch all lessons to count per module and per level
    const { data: lessons, error: lessonsError } = await supabaseAdmin
      .from('lessons')
      .select('id, module_id, is_published')
      .eq('is_published', true);

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách bài học. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Fetch all exercises to count per level
    const { data: exercises, error: exercisesError } = await supabaseAdmin
      .from('exercises')
      .select('id, lesson_id');

    if (exercisesError) {
      console.error('Error fetching exercises:', exercisesError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách bài tập. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Build lookup maps
    const lessonsByModule: Record<number, number[]> = {};
    for (const lesson of lessons ?? []) {
      if (!lessonsByModule[lesson.module_id]) {
        lessonsByModule[lesson.module_id] = [];
      }
      lessonsByModule[lesson.module_id].push(lesson.id);
    }

    const modulesByCourse: Record<number, typeof modules> = {};
    for (const mod of modules ?? []) {
      if (!modulesByCourse[mod.course_id]) {
        modulesByCourse[mod.course_id] = [];
      }
      modulesByCourse[mod.course_id].push(mod);
    }

    // Build lesson-to-course mapping for exercises
    const lessonToCourse: Record<number, number> = {};
    for (const mod of modules ?? []) {
      const modLessons = lessonsByModule[mod.id] ?? [];
      for (const lessonId of modLessons) {
        lessonToCourse[lessonId] = mod.course_id;
      }
    }

    // Count exercises per level
    const exercisesByLevel: Record<number, number> = {};
    for (const exercise of exercises ?? []) {
      const courseId = lessonToCourse[exercise.lesson_id];
      if (courseId !== undefined) {
        exercisesByLevel[courseId] = (exercisesByLevel[courseId] ?? 0) + 1;
      }
    }

    // Fetch user progress if authenticated
    let userProgress: Record<number, boolean> = {};
    let userExerciseCompletions: Record<number, boolean> = {};

    if (userId) {
      // Fetch completed lessons
      const { data: progressData } = await supabaseAdmin
        .from('user_progress')
        .select('lesson_id, is_completed')
        .eq('user_id', userId)
        .eq('is_completed', true);

      if (progressData) {
        for (const p of progressData) {
          userProgress[p.lesson_id] = true;
        }
      }

      // Fetch completed exercises (score = 100)
      const { data: submissionsData } = await supabaseAdmin
        .from('submissions')
        .select('exercise_id, score')
        .eq('user_id', userId)
        .eq('score', 100);

      if (submissionsData) {
        for (const s of submissionsData) {
          userExerciseCompletions[s.exercise_id] = true;
        }
      }
    }

    // Calculate progress for each level
    const levelProgressMap: Record<number, number> = {};

    for (const level of levels) {
      const levelModules = modulesByCourse[level.id] ?? [];
      let totalLessons = 0;
      let completedLessons = 0;
      let totalExercises = exercisesByLevel[level.id] ?? 0;
      let completedExercises = 0;

      for (const mod of levelModules) {
        const modLessonIds = lessonsByModule[mod.id] ?? [];
        totalLessons += modLessonIds.length;

        if (userId) {
          for (const lessonId of modLessonIds) {
            if (userProgress[lessonId]) {
              completedLessons++;
            }
          }
        }
      }

      // Count completed exercises for this level
      if (userId) {
        for (const exercise of exercises ?? []) {
          const courseId = lessonToCourse[exercise.lesson_id];
          if (courseId === level.id && userExerciseCompletions[exercise.id]) {
            completedExercises++;
          }
        }
      }

      const totalItems = totalLessons + totalExercises;
      const completedItems = completedLessons + completedExercises;
      const progressPercentage = totalItems > 0
        ? Math.round((completedItems / totalItems) * 100)
        : 0;

      levelProgressMap[level.id] = progressPercentage;
    }

    // Determine unlock status for each level
    // Level 1 is always unlocked; subsequent levels unlock when previous is 100%
    const sortedLevels = [...levels].sort((a, b) => a.order_index - b.order_index);

    const unlockStatus: Record<number, boolean> = {};
    for (let i = 0; i < sortedLevels.length; i++) {
      const level = sortedLevels[i];
      if (i === 0) {
        // First level is always unlocked
        unlockStatus[level.id] = true;
      } else if (!userId) {
        // Not authenticated: only first level is unlocked
        unlockStatus[level.id] = false;
      } else {
        // Unlock if previous level is 100% complete
        const prevLevel = sortedLevels[i - 1];
        unlockStatus[level.id] = levelProgressMap[prevLevel.id] === 100;
      }
    }

    // Build response
    const response = sortedLevels.map((level) => {
      const levelModules = modulesByCourse[level.id] ?? [];
      let totalLessons = 0;
      let totalExercises = exercisesByLevel[level.id] ?? 0;

      const chapters = levelModules
        .sort((a, b) => a.order_index - b.order_index)
        .map((mod) => {
          const lessonCount = (lessonsByModule[mod.id] ?? []).length;
          totalLessons += lessonCount;
          return {
            id: mod.id,
            title: mod.title,
            slug: mod.slug,
            description: mod.description,
            order: mod.order_index,
            lessonCount,
          };
        });

      return {
        id: level.id,
        title: level.title,
        slug: level.slug,
        description: level.description,
        icon: level.icon,
        color: level.color,
        order: level.order_index,
        isUnlocked: unlockStatus[level.id] ?? false,
        progressPercentage: userId ? levelProgressMap[level.id] ?? 0 : null,
        totalLessons,
        totalExercises,
        chapters,
      };
    });

    return NextResponse.json({ levels: response });
  } catch (error) {
    console.error('Error in GET /api/levels:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách cấp độ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
