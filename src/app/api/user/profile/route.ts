import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Name validation constants
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;
const NAME_REGEX = /^[a-zA-ZÀ-ỹ0-9\s\-]+$/;

/**
 * GET /api/user/profile
 * Returns current user's profile information
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem thông tin cá nhân' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Fetch user data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, avatar_url, role, xp, level, streak_count, created_at')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      );
    }

    // Fetch badges earned count
    const { count: badgesCount } = await supabaseAdmin
      .from('user_badges')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Fetch lessons completed count
    const { count: lessonsCompleted } = await supabaseAdmin
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_completed', true);

    // Fetch exercises solved count (submissions with score = 100)
    const { count: exercisesSolved } = await supabaseAdmin
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('score', 100);

    return NextResponse.json({
      user: {
        id: String(user.id),
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        xp: user.xp,
        level: user.level,
        streak_count: user.streak_count,
        created_at: user.created_at,
        badges_earned: badgesCount ?? 0,
        lessons_completed: lessonsCompleted ?? 0,
        exercises_solved: exercisesSolved ?? 0,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông tin cá nhân. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/user/profile
 * Updates user profile (name, avatar_url)
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để cập nhật thông tin cá nhân' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, avatar_url } = body;

    // Build update object with only provided fields
    const updateData: Record<string, string> = {};

    // Validate name if provided
    if (name !== undefined) {
      if (typeof name !== 'string') {
        return NextResponse.json(
          { error: 'Tên phải là chuỗi ký tự' },
          { status: 400 }
        );
      }

      const trimmedName = name.trim();

      if (trimmedName.length < NAME_MIN_LENGTH || trimmedName.length > NAME_MAX_LENGTH) {
        return NextResponse.json(
          { error: `Tên phải từ ${NAME_MIN_LENGTH} đến ${NAME_MAX_LENGTH} ký tự` },
          { status: 400 }
        );
      }

      if (!NAME_REGEX.test(trimmedName)) {
        return NextResponse.json(
          { error: 'Tên chỉ được chứa chữ cái, số, khoảng trắng và dấu gạch ngang' },
          { status: 400 }
        );
      }

      updateData.name = trimmedName;
    }

    // Validate avatar_url if provided
    if (avatar_url !== undefined) {
      if (avatar_url !== null && typeof avatar_url !== 'string') {
        return NextResponse.json(
          { error: 'URL ảnh đại diện không hợp lệ' },
          { status: 400 }
        );
      }

      if (avatar_url !== null && avatar_url.length > 500) {
        return NextResponse.json(
          { error: 'URL ảnh đại diện quá dài (tối đa 500 ký tự)' },
          { status: 400 }
        );
      }

      updateData.avatar_url = avatar_url;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Không có thông tin nào để cập nhật' },
        { status: 400 }
      );
    }

    // Update user in database
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select('id, name, email, avatar_url, role, xp, level, streak_count, created_at')
      .single();

    if (updateError) {
      console.error('Error updating user profile:', updateError);
      return NextResponse.json(
        { error: 'Không thể cập nhật thông tin. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        id: String(updatedUser.id),
        name: updatedUser.name,
        email: updatedUser.email,
        avatar_url: updatedUser.avatar_url,
        role: updatedUser.role,
        xp: updatedUser.xp,
        level: updatedUser.level,
        streak_count: updatedUser.streak_count,
        created_at: updatedUser.created_at,
      },
      message: 'Cập nhật thông tin thành công',
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
