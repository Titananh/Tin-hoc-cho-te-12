import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/lessons/[lessonId]/quiz/submit
 * Submits quiz answers and calculates score.
 * - Accepts { answers: Record<string, number> } (questionId → selected option index)
 * - Calculates score as (correct / total) × 100, rounded to nearest integer
 * - Returns: score, passed (≥80%), results per question
 * - If passed for first time: awards XP = score × 0.3, rounded (min 5, max 50)
 * - Stores quiz attempt in user_progress
 * - Requires authentication
 * - Vietnamese error messages
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để nộp bài quiz' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const lessonId = parseInt(params.lessonId, 10);

    if (isNaN(lessonId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { answers } = body as { answers?: Record<string, number> };

    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng trả lời ít nhất một câu hỏi' },
        { status: 400 }
      );
    }

    // Validate that answers values are numbers
    for (const [key, value] of Object.entries(answers)) {
      if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
        return NextResponse.json(
          { error: `Câu trả lời không hợp lệ cho câu hỏi "${key}"` },
          { status: 400 }
        );
      }
    }

    // Fetch the lesson content
    const { data: lesson, error: lessonError } = await supabaseAdmin
      .from('lessons')
      .select('id, title, content, is_published')
      .eq('id', lessonId)
      .eq('is_published', true)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học này' },
        { status: 404 }
      );
    }

    // Parse lesson content and extract quiz with correct answers
    const lessonContent = lesson.content as {
      quiz?: Array<{
        id: string;
        question: string;
        options: string[];
        correct_index: number;
        explanation: string;
      }>;
    };

    const quizData = lessonContent?.quiz;

    if (!quizData || quizData.length === 0) {
      return NextResponse.json(
        { error: 'Bài học này không có quiz' },
        { status: 404 }
      );
    }

    // Validate all questions are answered
    const totalQuestions = quizData.length;
    const unansweredQuestions = quizData.filter((q) => !(q.id in answers));

    if (unansweredQuestions.length > 0) {
      return NextResponse.json(
        {
          error: `Vui lòng trả lời tất cả các câu hỏi. Còn ${unansweredQuestions.length} câu chưa trả lời.`,
          unansweredIds: unansweredQuestions.map((q) => q.id),
        },
        { status: 400 }
      );
    }

    // Calculate score
    let correctCount = 0;

    const results = quizData.map((q) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct_index;

      if (isCorrect) {
        correctCount++;
      }

      return {
        questionId: q.id,
        userAnswer,
        correctAnswer: q.correct_index,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const passed = score >= 80;

    // Fetch existing progress to check if already passed
    const { data: existingProgress } = await supabaseAdmin
      .from('user_progress')
      .select('id, score, is_completed, quiz_attempts')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    const previousBestScore = existingProgress?.score ?? null;
    const previouslyPassed = previousBestScore !== null && previousBestScore >= 80;
    const currentAttempts = existingProgress?.quiz_attempts ?? 0;
    const newAttemptCount = currentAttempts + 1;
    const isNewBest = previousBestScore === null || score > previousBestScore;

    // Update or insert user_progress
    if (existingProgress) {
      const updateData: Record<string, unknown> = {
        quiz_attempts: newAttemptCount,
      };

      // Update best score if this is a new best
      if (isNewBest) {
        updateData.score = score;
      }

      // Mark as completed if passed for the first time
      if (passed && !existingProgress.is_completed) {
        updateData.is_completed = true;
        updateData.completed_at = new Date().toISOString();
      }

      const { error: updateError } = await supabaseAdmin
        .from('user_progress')
        .update(updateData)
        .eq('id', existingProgress.id);

      if (updateError) {
        console.error('Error updating user_progress:', updateError);
      }
    } else {
      // Insert new progress record
      const { error: insertError } = await supabaseAdmin
        .from('user_progress')
        .insert({
          user_id: userId,
          lesson_id: lessonId,
          is_completed: passed,
          completed_at: passed ? new Date().toISOString() : null,
          time_spent: 0,
          score,
          quiz_attempts: 1,
        });

      if (insertError) {
        console.error('Error inserting user_progress:', insertError);
      }
    }

    // Award XP if passed for the first time
    let xpEarned = 0;
    let newTotalXp = 0;
    let newLevel = 0;
    let levelUp = false;

    if (passed && !previouslyPassed) {
      // Calculate XP: score × 0.3, rounded, min 5, max 50
      xpEarned = Math.round(score * 0.3);
      xpEarned = Math.max(5, Math.min(50, xpEarned));

      // Log XP transaction
      const { error: xpLogError } = await supabaseAdmin
        .from('xp_logs')
        .insert({
          user_id: userId,
          amount: xpEarned,
          reason: `Hoàn thành quiz bài học: ${lesson.title}`,
        });

      if (xpLogError) {
        console.error('Error logging XP:', xpLogError);
      }

      // Fetch current user XP and level
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('xp, level')
        .eq('id', userId)
        .single();

      if (!userError && userData) {
        newTotalXp = userData.xp + xpEarned;
        const previousLevel = userData.level;
        newLevel = Math.max(1, Math.floor(Math.sqrt(newTotalXp / 100)));
        levelUp = newLevel > previousLevel;

        // Update user's total XP and level
        const { error: updateUserError } = await supabaseAdmin
          .from('users')
          .update({
            xp: newTotalXp,
            level: newLevel,
          })
          .eq('id', userId);

        if (updateUserError) {
          console.error('Error updating user XP:', updateUserError);
        }
      }
    } else {
      // Fetch current user data for response
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('xp, level')
        .eq('id', userId)
        .single();

      newTotalXp = userData?.xp ?? 0;
      newLevel = userData?.level ?? 1;
    }

    return NextResponse.json({
      score,
      passed,
      correctCount,
      totalQuestions,
      isNewBest,
      attemptCount: newAttemptCount,
      results,
      xp: {
        earned: xpEarned,
        totalXp: newTotalXp,
        level: newLevel,
        levelUp,
      },
    });
  } catch (error) {
    console.error('Error in POST /api/lessons/[lessonId]/quiz/submit:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi nộp bài quiz. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
