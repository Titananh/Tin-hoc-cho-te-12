import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/exercises/[exerciseId]
 * Returns exercise details including:
 * - Exercise info: id, title, description, difficulty, starter_code, hints, xp_reward
 * - Test cases: only non-hidden test cases for students (hides input/output of hidden ones)
 * - For authenticated users: submission history (last 5), best score, attempt count, completion status
 * - Hides solution_code from students
 * - Vietnamese error messages
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ?? null;
    const exerciseId = parseInt(params.exerciseId, 10);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ' },
        { status: 400 }
      );
    }

    // Fetch exercise details
    const { data: exercise, error: exerciseError } = await supabaseAdmin
      .from('exercises')
      .select(`
        id,
        lesson_id,
        title,
        description,
        difficulty,
        starter_code,
        solution_code,
        hints,
        xp_reward,
        test_cases
      `)
      .eq('id', exerciseId)
      .single();

    if (exerciseError || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập này' },
        { status: 404 }
      );
    }

    // Parse test_cases JSON - filter hidden test cases for students
    const allTestCases = (exercise.test_cases as Array<{
      input: string;
      expected_output: string;
      is_hidden: boolean;
    }>) ?? [];

    // For students: show visible test cases fully, hide input/output of hidden ones
    const visibleTestCases = allTestCases
      .filter((tc) => !tc.is_hidden)
      .map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
      }));

    const hiddenTestCaseCount = allTestCases.filter((tc) => tc.is_hidden).length;

    // Parse hints JSON
    const hints = (exercise.hints as string[]) ?? [];

    // Build base response (public data - no auth required)
    const responseData: Record<string, unknown> = {
      id: exercise.id,
      lessonId: exercise.lesson_id,
      title: exercise.title,
      description: exercise.description,
      difficulty: exercise.difficulty,
      starterCode: exercise.starter_code,
      hints: hints,
      xpReward: exercise.xp_reward,
      testCases: visibleTestCases,
      // Include ALL test cases for client-side Pyodide evaluation (hidden ones marked)
      allTestCases: allTestCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
        isHidden: tc.is_hidden,
      })),
      hiddenTestCaseCount,
      totalTestCases: allTestCases.length,
    };

    // For authenticated users: add submission history and progress data
    if (userId) {
      // Fetch last 5 submissions for this exercise
      const { data: submissions, error: submissionsError } = await supabaseAdmin
        .from('submissions')
        .select('id, code, status, runtime, score, created_at')
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (submissionsError) {
        console.error('Error fetching submissions:', submissionsError);
      }

      const submissionHistory = (submissions ?? []).map((sub) => ({
        id: sub.id,
        status: sub.status,
        runtime: sub.runtime,
        score: sub.score,
        submittedAt: sub.created_at,
      }));

      // Calculate best score
      const { data: bestScoreData } = await supabaseAdmin
        .from('submissions')
        .select('score')
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId)
        .not('score', 'is', null)
        .order('score', { ascending: false })
        .limit(1);

      const bestScore = bestScoreData && bestScoreData.length > 0
        ? bestScoreData[0].score
        : null;

      // Count total attempts
      const { count: attemptCount } = await supabaseAdmin
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId);

      // Check completion status (score = 100)
      const { data: completedSubmission } = await supabaseAdmin
        .from('submissions')
        .select('id')
        .eq('user_id', userId)
        .eq('exercise_id', exerciseId)
        .eq('score', 100)
        .limit(1);

      const isCompleted = completedSubmission !== null && completedSubmission.length > 0;

      responseData.userProgress = {
        submissionHistory,
        bestScore,
        attemptCount: attemptCount ?? 0,
        isCompleted,
      };
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error in GET /api/exercises/[exerciseId]:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
