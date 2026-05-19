import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/lessons/[lessonId]/quiz
 * Returns quiz questions for a lesson (from lesson.content.quiz).
 * - Each question includes: id, question text, 4 options
 * - Does NOT include correct_index (to prevent cheating)
 * - For authenticated users: returns previous best score and attempt count
 * - Vietnamese error messages
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

    // Parse lesson content and extract quiz
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

    // Build questions without correct_index (prevent cheating)
    const questions = quizData.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    // Fetch user's quiz progress if authenticated
    let bestScore: number | null = null;
    let attemptCount = 0;

    if (userId) {
      const { data: progress } = await supabaseAdmin
        .from('user_progress')
        .select('score, quiz_attempts')
        .eq('user_id', userId)
        .eq('lesson_id', lessonId)
        .single();

      if (progress) {
        bestScore = progress.score ?? null;
        attemptCount = progress.quiz_attempts ?? 0;
      }
    }

    return NextResponse.json({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      totalQuestions: questions.length,
      questions,
      userProgress: userId
        ? {
            bestScore,
            attemptCount,
            passed: bestScore !== null && bestScore >= 80,
          }
        : null,
    });
  } catch (error) {
    console.error('Error in GET /api/lessons/[lessonId]/quiz:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải quiz. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
