import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/users
 * Returns paginated list of users with search and role filter.
 *
 * Query params:
 * - page: number (default 1)
 * - search: string (search by name or email)
 * - role: "student" | "admin" (filter by role)
 *
 * Returns 50 users per page with: id, name, email, role, xp, level, streak_count, created_at, last_active
 */
export async function GET(request: NextRequest) {
  try {
    // Admin authorization check
    const guard = await requireAdmin();
    if (guard) return guard;

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const search = searchParams.get('search')?.trim() ?? '';
    const role = searchParams.get('role') ?? '';
    const pageSize = 50;
    const offset = (page - 1) * pageSize;

    // Build query
    let query = supabaseAdmin
      .from('users')
      .select('id, name, email, role, xp, level, streak_count, created_at, last_active', {
        count: 'exact',
      });

    // Apply search filter (name or email)
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // Apply role filter
    if (role === 'student' || role === 'admin') {
      query = query.eq('role', role);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    const { data: users, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn danh sách người dùng:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách người dùng. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((count ?? 0) / pageSize);

    return NextResponse.json({
      users: users ?? [],
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
    console.error('Lỗi khi tải danh sách người dùng:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách người dùng. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
