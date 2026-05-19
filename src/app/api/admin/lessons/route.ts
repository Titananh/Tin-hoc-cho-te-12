import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/lessons
 * Returns paginated list of all lessons with module/course info.
 *
 * Query params:
 * - page: number (default 1)
 * - search: string (search by title)
 * - course_id: number (filter by course)
 * - module_id: number (filter by module)
 * - is_published: "true" | "false" (filter by publish status)
 *
 * Returns 50 lessons per page.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const courseId = searchParams.get('course_id');
    const moduleId = searchParams.get('module_id');
    const isPublished = searchParams.get('is_published');
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    // Build query with module and course info
    let query = supabaseAdmin
      .from('lessons')
      .select(
        `id, title, slug, description, difficulty, estimated_minutes, order_index, xp_reward, is_published, created_at,
         modules!inner(id, title, slug, course_id, courses!inner(id, title, slug))`,
        { count: 'exact' }
      );

    // Apply search filter (by title)
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply module filter
    if (moduleId) {
      const parsedModuleId = parseInt(moduleId, 10);
      if (!isNaN(parsedModuleId)) {
        query = query.eq('module_id', parsedModuleId);
      }
    }

    // Apply course filter (via module relationship)
    if (courseId && !moduleId) {
      const parsedCourseId = parseInt(courseId, 10);
      if (!isNaN(parsedCourseId)) {
        query = query.eq('modules.course_id', parsedCourseId);
      }
    }

    // Apply publish status filter
    if (isPublished === 'true') {
      query = query.eq('is_published', true);
    } else if (isPublished === 'false') {
      query = query.eq('is_published', false);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data: lessons, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn danh sách bài học:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách bài học. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      lessons: lessons ?? [],
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
    console.error('Lỗi khi tải danh sách bài học:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/lessons
 * Creates a new lesson.
 *
 * Request body:
 * - title: string (required)
 * - slug: string (required, unique)
 * - description: string (optional)
 * - content: object (JSON content, optional, defaults to {})
 * - difficulty: "beginner" | "intermediate" | "advanced" (required)
 * - estimated_minutes: number (required, > 0)
 * - xp_reward: number (required, >= 0)
 * - module_id: number (required)
 * - is_published: boolean (optional, defaults to false)
 */
export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      difficulty,
      estimated_minutes,
      xp_reward,
      module_id,
      is_published,
    } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tiêu đề bài học là bắt buộc.' },
        { status: 400 }
      );
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json(
        { error: 'Slug bài học là bắt buộc.' },
        { status: 400 }
      );
    }

    // Validate difficulty
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (!difficulty || !validDifficulties.includes(difficulty)) {
      return NextResponse.json(
        { error: 'Độ khó không hợp lệ. Chỉ chấp nhận: beginner, intermediate, advanced.' },
        { status: 400 }
      );
    }

    // Validate estimated_minutes
    if (
      estimated_minutes === undefined ||
      typeof estimated_minutes !== 'number' ||
      estimated_minutes <= 0
    ) {
      return NextResponse.json(
        { error: 'Thời gian ước tính phải là số lớn hơn 0.' },
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

    // Validate module_id
    if (!module_id || typeof module_id !== 'number') {
      return NextResponse.json(
        { error: 'ID module là bắt buộc.' },
        { status: 400 }
      );
    }

    // Check module exists
    const { data: moduleData, error: moduleError } = await supabaseAdmin
      .from('modules')
      .select('id')
      .eq('id', module_id)
      .single();

    if (moduleError || !moduleData) {
      return NextResponse.json(
        { error: 'Module không tồn tại. Vui lòng chọn module hợp lệ.' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const { data: existingSlug } = await supabaseAdmin
      .from('lessons')
      .select('id')
      .eq('slug', slug.trim())
      .single();

    if (existingSlug) {
      return NextResponse.json(
        { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
        { status: 409 }
      );
    }

    // Determine order_index (place at end of module)
    const { data: lastLesson } = await supabaseAdmin
      .from('lessons')
      .select('order_index')
      .eq('module_id', module_id)
      .order('order_index', { ascending: false })
      .limit(1)
      .single();

    const orderIndex = lastLesson ? lastLesson.order_index + 1 : 0;

    // Insert lesson
    const { data: lesson, error: insertError } = await supabaseAdmin
      .from('lessons')
      .insert({
        title: title.trim(),
        slug: slug.trim(),
        description: description?.trim() ?? null,
        content: content ?? {},
        difficulty,
        estimated_minutes,
        xp_reward,
        module_id,
        order_index: orderIndex,
        is_published: is_published ?? false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Lỗi khi tạo bài học:', insertError);
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Không thể tạo bài học. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        lesson,
        message: 'Tạo bài học thành công.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lỗi khi tạo bài học:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
