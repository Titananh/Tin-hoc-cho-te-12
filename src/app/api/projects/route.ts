import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/projects
 * Returns list of all projects categorized by difficulty (Dễ, Trung Bình, Khó).
 * Each project includes: id, title, description, difficulty, estimated_hours,
 * prerequisite_levels, is_locked (based on user progress), checklist_items count.
 * For authenticated users: submission status, best score.
 */
export async function GET(request: NextRequest) {
  try {
    // Check for optional authentication
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    // Fetch all published projects
    const { data: projects, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('difficulty', { ascending: true })
      .order('title', { ascending: true });

    if (projectsError) {
      console.error('Lỗi truy vấn danh sách dự án:', projectsError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách dự án. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (!projects || projects.length === 0) {
      return NextResponse.json({
        projects: [],
        categorized: { easy: [], medium: [], hard: [] },
        total: 0,
      });
    }

    // Get user progress data if authenticated
    let completedLevelIds: number[] = [];
    let userSubmissions: Record<number, { count: number; bestScore: number; completed: boolean }> = {};

    if (userId) {
      // Get user's completed levels by checking user_progress
      // A level is considered completed if all lessons in that level are completed
      const { data: progressData } = await supabaseAdmin
        .from('user_progress')
        .select('lesson_id, is_completed')
        .eq('user_id', userId)
        .eq('is_completed', true);

      if (progressData && progressData.length > 0) {
        // Get all lessons grouped by course (level)
        const { data: lessons } = await supabaseAdmin
          .from('lessons')
          .select('id, module_id')
          .eq('is_published', true);

        const { data: modules } = await supabaseAdmin
          .from('modules')
          .select('id, course_id');

        if (lessons && modules) {
          // Build lesson -> course mapping
          const moduleToCourse: Record<number, number> = {};
          for (const mod of modules) {
            moduleToCourse[mod.id] = mod.course_id;
          }

          // Group lessons by course
          const lessonsByCourse: Record<number, number[]> = {};
          for (const lesson of lessons) {
            const courseId = moduleToCourse[lesson.module_id];
            if (courseId !== undefined) {
              if (!lessonsByCourse[courseId]) {
                lessonsByCourse[courseId] = [];
              }
              lessonsByCourse[courseId].push(lesson.id);
            }
          }

          // Check which courses are fully completed
          const completedLessonIds = new Set(progressData.map(p => p.lesson_id));
          for (const [courseId, courseLessons] of Object.entries(lessonsByCourse)) {
            const allCompleted = courseLessons.every(id => completedLessonIds.has(id));
            if (allCompleted && courseLessons.length > 0) {
              completedLevelIds.push(Number(courseId));
            }
          }
        }
      }

      // Get user's project submissions
      const { data: submissions } = await supabaseAdmin
        .from('project_submissions')
        .select('project_id, score')
        .eq('user_id', userId);

      if (submissions && submissions.length > 0) {
        for (const sub of submissions) {
          const projectId = sub.project_id;
          if (!userSubmissions[projectId]) {
            userSubmissions[projectId] = { count: 0, bestScore: 0, completed: false };
          }
          userSubmissions[projectId].count++;
          if (sub.score > userSubmissions[projectId].bestScore) {
            userSubmissions[projectId].bestScore = sub.score;
          }
          if (sub.score === 100) {
            userSubmissions[projectId].completed = true;
          }
        }
      }
    }

    // Map difficulty labels
    const difficultyMap: Record<string, string> = {
      easy: 'Dễ',
      medium: 'Trung Bình',
      hard: 'Khó',
    };

    // Build response with categorization
    const categorized: Record<string, unknown[]> = {
      easy: [],
      medium: [],
      hard: [],
    };

    for (const project of projects) {
      const prerequisiteLevelIds: number[] = Array.isArray(project.prerequisite_level_ids)
        ? project.prerequisite_level_ids
        : [];

      // Project is locked if user hasn't completed all prerequisite levels
      const isLocked = userId
        ? prerequisiteLevelIds.length > 0 &&
          !prerequisiteLevelIds.every((id: number) => completedLevelIds.includes(id))
        : true;

      // Count checklist items
      const checklist: unknown[] = Array.isArray(project.checklist) ? project.checklist : [];
      const checklistItemsCount = checklist.length;

      const projectData: Record<string, unknown> = {
        id: project.id,
        title: project.title,
        description: project.description,
        difficulty: project.difficulty,
        difficulty_label: difficultyMap[project.difficulty] ?? project.difficulty,
        estimated_hours: project.estimated_hours ?? null,
        // camelCase aliases used by /projects page
        estimatedHours: (project.estimated_hours ?? 2) as number,
        checklistCount: checklistItemsCount,
        completedChecklist: 0,
        xpReward: (project.xp_reward ?? 100) as number,
        minLevelRequired: (project.required_level ?? 1) as number,
        prerequisite_levels: prerequisiteLevelIds,
        is_locked: isLocked,
        isLocked,
        prerequisiteMessage: isLocked
          ? `Cần hoàn thành cấp độ ${prerequisiteLevelIds.join(', ')} trước`
          : undefined,
        checklist_items_count: checklistItemsCount,
      };

      // Add user-specific data if authenticated
      if (userId) {
        const sub = userSubmissions[project.id];
        projectData.submission_count = sub?.count ?? 0;
        projectData.best_score = sub?.bestScore ?? 0;
        projectData.bestScore = sub?.bestScore ?? null;
        projectData.is_completed = sub?.completed ?? false;
        projectData.isCompleted = sub?.completed ?? false;
      } else {
        projectData.bestScore = null;
        projectData.isCompleted = false;
      }

      const difficulty = project.difficulty as string;
      if (categorized[difficulty]) {
        categorized[difficulty].push(projectData);
      } else {
        categorized.easy.push(projectData);
      }
    }

    return NextResponse.json({
      projects: [...categorized.easy, ...categorized.medium, ...categorized.hard],
      categorized,
      total: projects.length,
    });
  } catch (error) {
    console.error('Lỗi khi tải danh sách dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách dự án. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
