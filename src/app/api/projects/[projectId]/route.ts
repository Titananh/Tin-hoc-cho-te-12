import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/projects/[projectId]
 * Returns full project details: title, description, requirements, evaluation criteria,
 * starter_code, estimated_hours, checklist (features to implement).
 * For authenticated users: submission history, best score, completion status.
 * Checks if user has completed prerequisite levels.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { projectId: string } }
) {
  try {
    const projectId = parseInt(params.projectId, 10);

    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID dự án không hợp lệ.' },
        { status: 400 }
      );
    }

    // Fetch project details
    const { data: project, error: projectError } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .eq('is_published', true)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        { error: 'Không tìm thấy dự án này.' },
        { status: 404 }
      );
    }

    // Map difficulty label
    const difficultyMap: Record<string, string> = {
      easy: 'Dễ',
      medium: 'Trung Bình',
      hard: 'Khó',
    };

    // Parse JSON fields
    const requirements: unknown[] = Array.isArray(project.requirements)
      ? project.requirements
      : [];
    const checklist: unknown[] = Array.isArray(project.checklist)
      ? project.checklist
      : [];
    const prerequisiteLevelIds: number[] = Array.isArray(project.prerequisite_level_ids)
      ? project.prerequisite_level_ids
      : [];
    const testCases: unknown[] = Array.isArray(project.test_cases)
      ? project.test_cases
      : [];

    // Build base response
    const response: Record<string, unknown> = {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      difficulty: project.difficulty,
      difficulty_label: difficultyMap[project.difficulty] ?? project.difficulty,
      requirements,
      checklist,
      starter_code: project.starter_code ?? '',
      estimated_hours: project.estimated_hours ?? null,
      prerequisite_level_ids: prerequisiteLevelIds,
      test_cases_count: testCases.length,
      xp_reward: project.xp_reward ?? 500,
    };

    // Check for optional authentication
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;

    if (userId) {
      // Check if user has completed prerequisite levels
      let prerequisitesMet = true;

      if (prerequisiteLevelIds.length > 0) {
        // Get user's completed levels
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

            // Check which prerequisite courses are fully completed
            const completedLessonIds = new Set(progressData.map(p => p.lesson_id));
            for (const levelId of prerequisiteLevelIds) {
              const courseLessons = lessonsByCourse[levelId] ?? [];
              if (courseLessons.length === 0) {
                // If no lessons exist for this level, consider it not met
                prerequisitesMet = false;
                break;
              }
              const allCompleted = courseLessons.every(id => completedLessonIds.has(id));
              if (!allCompleted) {
                prerequisitesMet = false;
                break;
              }
            }
          } else {
            prerequisitesMet = false;
          }
        } else {
          prerequisitesMet = false;
        }
      }

      response.is_locked = !prerequisitesMet;
      response.prerequisites_met = prerequisitesMet;

      // Fetch user's submissions for this project
      const { data: submissions } = await supabaseAdmin
        .from('project_submissions')
        .select('id, code, score, ai_feedback, created_at')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      response.submissions = submissions ?? [];
      response.submission_count = submissions?.length ?? 0;

      // Calculate best score and completion status
      let bestScore = 0;
      if (submissions && submissions.length > 0) {
        for (const sub of submissions) {
          if (sub.score > bestScore) {
            bestScore = sub.score;
          }
        }
      }
      response.best_score = bestScore;
      response.is_completed = bestScore === 100;
    } else {
      response.is_locked = true;
      response.prerequisites_met = false;
      response.submissions = [];
      response.submission_count = 0;
      response.best_score = 0;
      response.is_completed = false;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Lỗi khi tải chi tiết dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải chi tiết dự án. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
