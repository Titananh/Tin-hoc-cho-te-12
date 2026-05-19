import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

interface RouteParams {
  params: { badgeId: string };
}

/**
 * GET /api/admin/badges/:badgeId
 * Returns badge details.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const badgeId = parseInt(params.badgeId, 10);
    if (isNaN(badgeId)) {
      return NextResponse.json(
        { error: 'ID huy hiệu không hợp lệ.' },
        { status: 400 }
      );
    }

    const { data: badge, error } = await supabaseAdmin
      .from('badges')
      .select('*')
      .eq('id', badgeId)
      .single();

    if (error || !badge) {
      return NextResponse.json(
        { error: 'Không tìm thấy huy hiệu.' },
        { status: 404 }
      );
    }

    // Get earned count
    const { count } = await supabaseAdmin
      .from('user_badges')
      .select('*', { count: 'exact', head: true })
      .eq('badge_id', badgeId);

    return NextResponse.json({
      badge: {
        ...badge,
        earned_count: count ?? 0,
      },
    });
  } catch (error) {
    console.error('Lỗi khi tải chi tiết huy hiệu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải chi tiết huy hiệu.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/badges/:badgeId
 * Updates badge fields.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const badgeId = parseInt(params.badgeId, 10);
    if (isNaN(badgeId)) {
      return NextResponse.json(
        { error: 'ID huy hiệu không hợp lệ.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const allowedFields = [
      'name', 'slug', 'description', 'icon', 'color',
      'requirement', 'xp_reward', 'is_active',
    ];

    // Build update object with only allowed fields
    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Không có trường nào để cập nhật.' },
        { status: 400 }
      );
    }

    updateData.updated_at = new Date().toISOString();

    const { data: badge, error } = await supabaseAdmin
      .from('badges')
      .update(updateData)
      .eq('id', badgeId)
      .select()
      .single();

    if (error) {
      console.error('Lỗi khi cập nhật huy hiệu:', error);
      return NextResponse.json(
        { error: 'Không thể cập nhật huy hiệu. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (!badge) {
      return NextResponse.json(
        { error: 'Không tìm thấy huy hiệu.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      badge,
      message: 'Cập nhật huy hiệu thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật huy hiệu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật huy hiệu.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/badges/:badgeId
 * Soft-deletes (deactivates) a badge.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const badgeId = parseInt(params.badgeId, 10);
    if (isNaN(badgeId)) {
      return NextResponse.json(
        { error: 'ID huy hiệu không hợp lệ.' },
        { status: 400 }
      );
    }

    // Soft delete: set is_active to false
    const { error } = await supabaseAdmin
      .from('badges')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', badgeId);

    if (error) {
      console.error('Lỗi khi vô hiệu hóa huy hiệu:', error);
      return NextResponse.json(
        { error: 'Không thể vô hiệu hóa huy hiệu. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Vô hiệu hóa huy hiệu thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi vô hiệu hóa huy hiệu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi vô hiệu hóa huy hiệu.' },
      { status: 500 }
    );
  }
}
