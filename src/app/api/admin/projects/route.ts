import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/projects
 * Returns paginated list of all projects.
 *
 * Query params:
 * - page: number (default 1)
 * - search: string (search by title)
 * - difficulty: "easy" | "medium" | "hard"
 *
 * Returns 50 projects per page.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const difficulty = searchParams.get('difficulty');
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    let query = supabaseAdmin
      .from('projects')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    // Apply difficulty filter
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      query = query.eq('difficulty', difficulty);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data: projects, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn danh sách dự án:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách dự án. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      projects: projects ?? [],
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
    console.error('Lỗi khi tải danh sách dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách dự án. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/projects
 * Creates a new project.
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
      difficulty,
      starter_code,
      requirements,
      checklist,
      estimated_hours,
      prerequisite_level_ids,
      test_cases,
      xp_reward,
      is_published,
    } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tiêu đề dự án là bắt buộc.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mô tả dự án là bắt buộc.' },
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

    // Generate slug if not provided
    const projectSlug = slug?.trim() || title.trim().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Insert project
    const { data: project, error: insertError } = await supabaseAdmin
      .from('projects')
      .insert({
        title: title.trim(),
        slug: projectSlug,
        description: description.trim(),
        difficulty,
        starter_code: starter_code?.trim() ?? '',
        requirements: requirements ?? '',
        checklist: checklist ?? [],
        estimated_hours: estimated_hours ?? 0,
        prerequisite_level_ids: prerequisite_level_ids ?? [],
        test_cases: test_cases ?? [],
        xp_reward,
        is_published: is_published ?? false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Lỗi khi tạo dự án:', insertError);
      return NextResponse.json(
        { error: 'Không thể tạo dự án. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        project,
        message: 'Tạo dự án thành công.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lỗi khi tạo dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo dự án. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
