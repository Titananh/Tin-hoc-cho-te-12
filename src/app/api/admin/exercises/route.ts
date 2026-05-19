import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/exercises
 * Returns paginated list of all exercises with lesson info.
 *
 * Query params:
 * - page: number (default 1)
 * - search: string (search by title)
 * - difficulty: "easy" | "medium" | "hard"
 * - lesson_id: number (filter by lesson)
 *
 * Returns 50 exercises per page.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const difficulty = searchParams.get('difficulty');
    const lessonId = searchParams.get('lesson_id');
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    let query = supabaseAdmin
      .from('exercises')
      .select(
        `id, title, description, difficulty, xp_reward, is_published, created_at, lesson_id,
         lessons!inner(id, title, slug)`,
        { count: 'exact' }
      );

    // Apply search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply difficulty filter
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      query = query.eq('difficulty', difficulty);
    }

    // Apply lesson filter
    if (lessonId) {
      const parsedLessonId = parseInt(lessonId, 10);
      if (!isNaN(parsedLessonId)) {
        query = query.eq('lesson_id', parsedLessonId);
      }
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data: exercises, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn danh sách bài tập:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách bài tập. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      exercises: exercises ?? [],
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
    console.error('Lỗi khi tải danh sách bài tập:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/exercises
 * Creates a new exercise with test cases.
 */
export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const body = await request.json();
    const {
      title,
      description,
      starter_code,
      solution_code,
      difficulty,
      xp_reward,
      lesson_id,
      hints,
      test_cases,
      is_published,
    } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tiêu đề bài tập là bắt buộc.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mô tả bài tập là bắt buộc.' },
        { status: 400 }
      );
    }

    // Validate difficulty
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!difficulty || !validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Độ khó không hợp lệ. Chỉ chấp nhận: easy, medium, hard.' },
        { status: 400 }
      );
    }

    // Validate xp_reward
    if (xp_reward === undefined || typeof xp_reward !== 'number' || xp_reward < 0) {
      return NextResponse.json(
        { error: 'Điểm XP thưởng phải là số lớn hơn hoặc bằng 0.' },
        { status: 400 }
      );
    }

    // Validate lesson_id
    if (!lesson_id || typeof lesson_id !== 'number') {
      return NextResponse.json(
        { error: 'Bài học là bắt buộc.' },
        { status: 400 }
      );
    }

    // Check lesson exists
    const { data: lessonData, error: lessonError } = await supabaseAdmin
      .from('lessons')
      .select('id')
      .eq('id', lesson_id)
      .single();

    if (lessonError || !lessonData) {
      return NextResponse.json(
        { error: 'Bài học không tồn tại. Vui lòng chọn bài học hợp lệ.' },
        { status: 400 }
      );
    }

    // Validate test_cases
    if (!test_cases || !Array.isArray(test_cases) || test_cases.length === 0) {
      return NextResponse.json(
        { error: 'Bài tập phải có ít nhất một test case.' },
        { status: 400 }
      );
    }

    // Insert exercise
    const { data: exercise, error: insertError } = await supabaseAdmin
      .from('exercises')
      .insert({
        title: title.trim(),
        description: description.trim(),
        starter_code: starter_code?.trim() ?? '',
        solution_code: solution_code?.trim() ?? '',
        difficulty,
        xp_reward,
        lesson_id,
        hints: hints ?? [],
        is_published: is_published ?? false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Lỗi khi tạo bài tập:', insertError);
      return NextResponse.json(
        { error: 'Không thể tạo bài tập. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Insert test cases
    const testCaseRecords = test_cases.map((tc: { input: string; expected_output: string; is_hidden: boolean }, index: number) => ({
      exercise_id: exercise.id,
      input: tc.input ?? '',
      expected_output: tc.expected_output ?? '',
      is_hidden: tc.is_hidden ?? false,
      order_index: index,
    }));

    const { error: tcError } = await supabaseAdmin
      .from('test_cases')
      .insert(testCaseRecords);

    if (tcError) {
      console.error('Lỗi khi tạo test cases:', tcError);
      // Rollback exercise creation
      await supabaseAdmin.from('exercises').delete().eq('id', exercise.id);
      return NextResponse.json(
        { error: 'Không thể tạo test cases. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        exercise,
        message: 'Tạo bài tập thành công.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lỗi khi tạo bài tập:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
