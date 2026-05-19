import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/badges
 * Returns list of all badges with earned count per badge.
 */
export async function GET() {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    // Fetch all badges
    const { data: badges, error } = await supabaseAdmin
      .from('badges')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Lỗi truy vấn danh sách huy hiệu:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách huy hiệu. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Fetch earned count per badge
    const { data: earnedCounts, error: countError } = await supabaseAdmin
      .from('user_badges')
      .select('badge_id');

    if (countError) {
      console.error('Lỗi truy vấn số lượng huy hiệu đã nhận:', countError);
    }

    // Calculate earned count per badge
    const countMap: Record<number, number> = {};
    if (earnedCounts) {
      for (const record of earnedCounts) {
        countMap[record.badge_id] = (countMap[record.badge_id] || 0) + 1;
      }
    }

    const badgesWithCount = (badges ?? []).map((badge) => ({
      ...badge,
      earned_count: countMap[badge.id] || 0,
    }));

    return NextResponse.json({ badges: badgesWithCount });
  } catch (error) {
    console.error('Lỗi khi tải danh sách huy hiệu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải danh sách huy hiệu.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/badges
 * Creates a new badge.
 */
export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const body = await request.json();
    const {
      name,
      slug,
      description,
      icon,
      color,
      requirement,
      xp_reward,
    } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tên huy hiệu là bắt buộc.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mô tả huy hiệu là bắt buộc.' },
        { status: 400 }
      );
    }

    // Generate slug if not provided
    const badgeSlug = slug?.trim() || name.trim().toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    // Insert badge
    const { data: badge, error: insertError } = await supabaseAdmin
      .from('badges')
      .insert({
        name: name.trim(),
        slug: badgeSlug,
        description: description.trim(),
        icon: icon?.trim() ?? '🏆',
        color: color?.trim() ?? '#FFD700',
        requirement: requirement?.trim() ?? '',
        xp_reward: typeof xp_reward === 'number' && xp_reward >= 0 ? xp_reward : 0,
        is_active: true,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Lỗi khi tạo huy hiệu:', insertError);
      return NextResponse.json(
        { error: 'Không thể tạo huy hiệu. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        badge,
        message: 'Tạo huy hiệu thành công.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lỗi khi tạo huy hiệu:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo huy hiệu.' },
      { status: 500 }
    );
  }
}
