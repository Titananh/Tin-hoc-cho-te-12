import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/quizzes
 * List all lessons that have quizzes (from lesson.content.quiz).
 * Returns lesson info along with quiz question count.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    // Fetch lessons that have quiz content
    let query = supabaseAdmin
      .from('lessons')
      .select(
        'id, title, slug, difficulty, module_id, is_published, content, created_at, updated_at',
        { count: 'exact' }
      )
      .not('content->quiz', 'is', null);

    // Apply search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply pagination and ordering
    query = query
      .order('updated_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data: lessons, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn danh sách quiz:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách quiz. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Map lessons to include quiz info
    const quizLessons = (lessons ?? []).map((lesson) => {
      const content = lesson.content as Record<string, unknown> | null;
      const quiz = content?.quiz as Array<unknown> | null;
      const questionCount = Array.isArray(quiz) ? quiz.length : 0;

      return {
        id: lesson.id,
        title: lesson.title,
        slug: lesson.slug,
        difficulty: lesson.difficulty,
        module_id: lesson.module_id,
        is_published: lesson.is_published,
        question_count: questionCount,
        created_at: lesson.created_at,
        updated_at: lesson.updated_at,
      };
    });

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      lessons: quizLessons,
      pagination: {
        page,
        pageSize,
        total: count ?? 0,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Lỗi khi tải danh sách quiz:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách quiz. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/quizzes
 * Update quiz questions for a lesson (updates lesson.content.quiz field).
 *
 * Request body:
 * - lesson_id: number (required)
 * - questions: Array<{
 *     question: string;
 *     options: [string, string, string, string];
 *     correct_answer: number; // 0-3 index
 *     explanation: string;
 *   }>
 */
export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const body = await request.json();
    const { lesson_id, questions } = body;

    // Validate lesson_id
    if (!lesson_id || typeof lesson_id !== 'number') {
      return NextResponse.json(
        { error: 'ID bài học là bắt buộc.' },
        { status: 400 }
      );
    }

    // Validate questions array
    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json(
        { error: 'Danh sách câu hỏi là bắt buộc và phải là một mảng.' },
        { status: 400 }
      );
    }

    if (questions.length === 0) {
      return NextResponse.json(
        { error: 'Quiz phải có ít nhất một câu hỏi.' },
        { status: 400 }
      );
    }

    // Validate each question
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];

      if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
        return NextResponse.json(
          { error: `Câu hỏi ${i + 1}: Nội dung câu hỏi là bắt buộc.` },
          { status: 400 }
        );
      }

      if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
        return NextResponse.json(
          { error: `Câu hỏi ${i + 1}: Phải có đúng 4 đáp án.` },
          { status: 400 }
        );
      }

      // Validate each option is a non-empty string
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j] || typeof q.options[j] !== 'string' || q.options[j].trim().length === 0) {
          return NextResponse.json(
            { error: `Câu hỏi ${i + 1}: Đáp án ${j + 1} không được để trống.` },
            { status: 400 }
          );
        }
      }

      if (q.correct_answer === undefined || typeof q.correct_answer !== 'number' || q.correct_answer < 0 || q.correct_answer > 3) {
        return NextResponse.json(
          { error: `Câu hỏi ${i + 1}: Đáp án đúng phải là số từ 0 đến 3.` },
          { status: 400 }
        );
      }

      if (!q.explanation || typeof q.explanation !== 'string') {
        return NextResponse.json(
          { error: `Câu hỏi ${i + 1}: Giải thích là bắt buộc.` },
          { status: 400 }
        );
      }
    }

    // Check lesson exists
    const { data: lesson, error: lessonError } = await supabaseAdmin
      .from('lessons')
      .select('id, content')
      .eq('id', lesson_id)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json(
        { error: 'Bài học không tồn tại. Vui lòng chọn bài học hợp lệ.' },
        { status: 404 }
      );
    }

    // Update lesson content with quiz data
    const existingContent = (lesson.content as Record<string, unknown>) ?? {};
    const updatedContent = {
      ...existingContent,
      quiz: questions.map((q: { question: string; options: string[]; correct_answer: number; explanation: string }) => ({
        question: q.question.trim(),
        options: q.options.map((opt: string) => opt.trim()),
        correct_answer: q.correct_answer,
        explanation: q.explanation.trim(),
      })),
    };

    const { error: updateError } = await supabaseAdmin
      .from('lessons')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString(),
      })
      .eq('id', lesson_id);

    if (updateError) {
      console.error('Lỗi khi cập nhật quiz:', updateError);
      return NextResponse.json(
        { error: 'Không thể cập nhật quiz. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Cập nhật quiz thành công.',
      lesson_id,
      question_count: questions.length,
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật quiz:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật quiz. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
