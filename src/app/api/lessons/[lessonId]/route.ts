import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/lessons/[lessonId]
 * Returns detailed lesson information including:
 * - Lesson details: id, title, slug, description, content (JSON with theory, examples, quiz),
 *   difficulty, estimated_minutes, xp_reward
 * - Module/chapter info (parent)
 * - Course/level info (grandparent)
 * - For authenticated users: completion status, time_spent
 * - Previous and next lesson IDs for navigation
 * - Exercise list for this lesson (id, title, difficulty, completion status)
 * - Quiz questions if lesson has a quiz
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;
    const lessonId = parseInt(params.lessonId, 10);

    if (isNaN(lessonId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ' },
        { status: 400 }
      );
    }

    // Fetch the lesson with its module (chapter) info
    const { data: lesson, error: lessonError } = await supabaseAdmin
      .from('lessons')
      .select(`
        id,
        module_id,
        title,
        slug,
        description,
        content,
        difficulty,
        estimated_minutes,
        order_index,
        xp_reward,
        is_published
      `)
      .eq('id', lessonId)
      .eq('is_published', true)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học này' },
        { status: 404 }
      );
    }

    // Fetch the parent module (chapter)
    const { data: module, error: moduleError } = await supabaseAdmin
      .from('modules')
      .select('id, course_id, title, slug, description, order_index')
      .eq('id', lesson.module_id)
      .single();

    if (moduleError || !module) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin chương học' },
        { status: 500 }
      );
    }

    // Fetch the grandparent course (level)
    const { data: course, error: courseError } = await supabaseAdmin
      .from('courses')
      .select('id, title, slug, description, icon, color, order_index')
      .eq('id', module.course_id)
      .single();

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin cấp độ' },
        { status: 500 }
      );
    }

    // Fetch all lessons in the same module for navigation (previous/next)
    const { data: moduleLessons, error: moduleLessonsError } = await supabaseAdmin
      .from('lessons')
      .select('id, title, slug, order_index')
      .eq('module_id', lesson.module_id)
      .eq('is_published', true)
      .order('order_index', { ascending: true });

    if (moduleLessonsError) {
      console.error('Error fetching module lessons:', moduleLessonsError);
    }

    // Determine previous and next lessons
    let previousLesson: { id: number; title: string; slug: string } | null = null;
    let nextLesson: { id: number; title: string; slug: string } | null = null;

    if (moduleLessons && moduleLessons.length > 0) {
      const currentIndex = moduleLessons.findIndex((l) => l.id === lessonId);

      if (currentIndex > 0) {
        const prev = moduleLessons[currentIndex - 1];
        previousLesson = { id: prev.id, title: prev.title, slug: prev.slug };
      }

      if (currentIndex < moduleLessons.length - 1) {
        const next = moduleLessons[currentIndex + 1];
        nextLesson = { id: next.id, title: next.title, slug: next.slug };
      }
    }

    // If no next lesson in current module, check next module in same course
    if (!nextLesson) {
      const { data: nextModules } = await supabaseAdmin
        .from('modules')
        .select('id')
        .eq('course_id', module.course_id)
        .gt('order_index', module.order_index)
        .order('order_index', { ascending: true })
        .limit(1);

      if (nextModules && nextModules.length > 0) {
        const { data: firstLessonNextModule } = await supabaseAdmin
          .from('lessons')
          .select('id, title, slug')
          .eq('module_id', nextModules[0].id)
          .eq('is_published', true)
          .order('order_index', { ascending: true })
          .limit(1);

        if (firstLessonNextModule && firstLessonNextModule.length > 0) {
          nextLesson = {
            id: firstLessonNextModule[0].id,
            title: firstLessonNextModule[0].title,
            slug: firstLessonNextModule[0].slug,
          };
        }
      }
    }

    // If no previous lesson in current module, check previous module in same course
    if (!previousLesson) {
      const { data: prevModules } = await supabaseAdmin
        .from('modules')
        .select('id')
        .eq('course_id', module.course_id)
        .lt('order_index', module.order_index)
        .order('order_index', { ascending: false })
        .limit(1);

      if (prevModules && prevModules.length > 0) {
        const { data: lastLessonPrevModule } = await supabaseAdmin
          .from('lessons')
          .select('id, title, slug')
          .eq('module_id', prevModules[0].id)
          .eq('is_published', true)
          .order('order_index', { ascending: false })
          .limit(1);

        if (lastLessonPrevModule && lastLessonPrevModule.length > 0) {
          previousLesson = {
            id: lastLessonPrevModule[0].id,
            title: lastLessonPrevModule[0].title,
            slug: lastLessonPrevModule[0].slug,
          };
        }
      }
    }

    // Fetch exercises for this lesson
    const { data: exercises, error: exercisesError } = await supabaseAdmin
      .from('exercises')
      .select('id, title, description, difficulty, xp_reward')
      .eq('lesson_id', lessonId)
      .order('id', { ascending: true });

    if (exercisesError) {
      console.error('Error fetching exercises:', exercisesError);
    }

    // Fetch user progress and exercise completion if authenticated
    let userProgress: {
      is_completed: boolean;
      completed_at: string | null;
      time_spent: number;
    } | null = null;
    let completedExerciseIds: Set<number> = new Set();

    if (userId) {
      // Fetch lesson progress
      const { data: progressData } = await supabaseAdmin
        .from('user_progress')
        .select('is_completed, completed_at, time_spent')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (progressData) {
        userProgress = progressData;
      }

      // Fetch exercise completion status
      if (exercises && exercises.length > 0) {
        const exerciseIds = exercises.map((e) => e.id);
        const { data: completedSubmissions } = await supabaseAdmin
          .from('submissions')
          .select('exercise_id')
          .eq('user_id', userId)
          .eq('score', 100)
          .in('exercise_id', exerciseIds);

        if (completedSubmissions) {
          for (const sub of completedSubmissions) {
            completedExerciseIds.add(sub.exercise_id);
          }
        }
      }
    }

    // Build exercise list with completion status
    const exerciseList = (exercises ?? []).map((ex) => ({
      id: ex.id,
      title: ex.title,
      description: ex.description,
      difficulty: ex.difficulty,
      xpReward: ex.xp_reward,
      isCompleted: userId ? completedExerciseIds.has(ex.id) : null,
    }));

    // Parse lesson content and extract quiz questions.
    // In dev mode the content is a markdown string. In production it may be JSON.
    let lessonContent: {
      objectives?: string[];
      theory?: string;
      examples?: Array<{ title: string; code: string; explanation: string; output?: string }>;
      quiz?: Array<{
        id: string;
        question: string;
        options: string[];
        correct_index: number;
        explanation: string;
      }>;
    };
    if (typeof lesson.content === 'string') {
      lessonContent = { theory: lesson.content };
    } else {
      lessonContent = (lesson.content as typeof lessonContent) ?? {};
    }

    // Build quiz data (hide correct_index for non-submitted quizzes)
    const quizQuestions = (lessonContent?.quiz ?? []).map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      explanation: q.explanation,
    }));

    return NextResponse.json({
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      description: lesson.description,
      content: lessonContent,
      difficulty: lesson.difficulty,
      estimatedMinutes: lesson.estimated_minutes,
      xpReward: lesson.xp_reward,
      order: lesson.order_index,
      module: {
        id: module.id,
        title: module.title,
        slug: module.slug,
        description: module.description,
        order: module.order_index,
      },
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        icon: course.icon,
        color: course.color,
        order: course.order_index,
      },
      userProgress: userId
        ? {
            isCompleted: userProgress?.is_completed ?? false,
            completedAt: userProgress?.completed_at ?? null,
            timeSpent: userProgress?.time_spent ?? 0,
          }
        : null,
      previousLesson,
      nextLesson,
      exercises: exerciseList,
      quiz: quizQuestions.length > 0 ? quizQuestions : null,
    });
  } catch (error) {
    console.error('Error in GET /api/lessons/[lessonId]:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
