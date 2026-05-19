import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/notifications
 * Trả về danh sách thông báo của user (phân trang, 20 mỗi trang, sắp xếp mới nhất).
 *
 * Query params:
 * - page: số trang (default: 1)
 * - unreadOnly: chỉ lấy chưa đọc (default: false)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem thông báo' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const limit = 20;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('notifications')
      .select('id, title, content, type, is_read, created_at', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data: notifications, count, error } = await query;

    if (error) {
      console.error('Lỗi truy vấn notifications:', error);
      return NextResponse.json(
        { error: 'Không thể tải thông báo' },
        { status: 500 }
      );
    }

    // Đếm số thông báo chưa đọc
    const { count: unreadCount, error: unreadError } = await supabaseAdmin
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (unreadError) {
      console.error('Lỗi đếm unread:', unreadError);
    }

    return NextResponse.json({
      notifications: (notifications ?? []).map((n) => ({
        id: n.id,
        title: n.title,
        message: n.content,
        type: n.type,
        isRead: n.is_read,
        createdAt: n.created_at,
      })),
      total: count ?? 0,
      unreadCount: unreadCount ?? 0,
      page,
      totalPages: Math.ceil((count ?? 0) / limit),
    });
  } catch (error) {
    console.error('Lỗi GET notifications:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông báo. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/notifications
 * Đánh dấu thông báo đã đọc.
 *
 * Body: { notificationIds: number[] }
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để cập nhật thông báo' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { notificationIds } = body;

    if (!notificationIds || !Array.isArray(notificationIds) || notificationIds.length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp danh sách ID thông báo' },
        { status: 400 }
      );
    }

    // Đánh dấu đã đọc (chỉ cho notifications thuộc user hiện tại)
    const { error: updateError, count } = await supabaseAdmin
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .in('id', notificationIds)
      .select('id', { count: 'exact', head: true });

    if (updateError) {
      console.error('Lỗi cập nhật notifications:', updateError);
      return NextResponse.json(
        { error: 'Không thể đánh dấu thông báo đã đọc' },
        { status: 500 }
      );
    }

    // Đếm lại số chưa đọc
    const { count: unreadCount } = await supabaseAdmin
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    return NextResponse.json({
      message: 'Đã đánh dấu thông báo đã đọc',
      updatedCount: count ?? notificationIds.length,
      unreadCount: unreadCount ?? 0,
    });
  } catch (error) {
    console.error('Lỗi PATCH notifications:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật thông báo. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
