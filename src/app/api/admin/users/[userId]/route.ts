import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/users/[userId]
 * Returns full user details including profile, stats, badges, and recent activity.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID người dùng không hợp lệ.' },
        { status: 400 }
      );
    }

    // Fetch user profile
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng.' },
        { status: 404 }
      );
    }

    // Fetch user statistics in parallel
    const [
      lessonsCompletedResult,
      exercisesSolvedResult,
      submissionsResult,
      badgesResult,
      recentActivityResult,
      streakResult,
    ] = await Promise.all([
      // Lessons completed
      supabaseAdmin
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('completed', true),
      // Exercises solved (distinct exercises with score = 100)
      supabaseAdmin
        .from('submissions')
        .select('exercise_id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('score', 100),
      // Total submissions
      supabaseAdmin
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId),
      // Badges earned
      supabaseAdmin
        .from('user_badges')
        .select('id, badge_id, earned_at, badges(name, description, icon_url, rarity)')
        .eq('user_id', userId)
        .order('earned_at', { ascending: false })
        .limit(10),
      // Recent activity (last 10 XP logs)
      supabaseAdmin
        .from('xp_logs')
        .select('id, amount, source, description, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10),
      // Streak data
      supabaseAdmin
        .from('user_streaks')
        .select('*')
        .eq('user_id', userId)
        .single(),
    ]);

    const stats = {
      lessonsCompleted: lessonsCompletedResult.count ?? 0,
      exercisesSolved: exercisesSolvedResult.count ?? 0,
      totalSubmissions: submissionsResult.count ?? 0,
    };

    const badges = badgesResult.data ?? [];
    const recentActivity = recentActivityResult.data ?? [];
    const streak = streakResult.data ?? { current_streak: 0, longest_streak: 0 };

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role,
        total_xp: user.total_xp ?? 0,
        current_level: user.current_level ?? 1,
        created_at: user.created_at,
        last_active: user.last_active,
        is_active: user.is_active !== false,
      },
      stats,
      streak,
      badges,
      recentActivity,
    });
  } catch (error) {
    console.error('Lỗi khi tải chi tiết người dùng:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông tin người dùng. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/users/[userId]
 * Updates user role, resets password, or adjusts XP.
 * Supported actions:
 * - { action: "changeRole", role: "admin" | "student" }
 * - { action: "resetPassword", newPassword: string }
 * - { action: "adjustXp", amount: number, reason: string }
 * - { action: "deactivate" }
 * - { action: "activate" }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { userId } = params;
    const body = await request.json();
    const { action } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID người dùng không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, role')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng.' },
        { status: 404 }
      );
    }

    switch (action) {
      case 'changeRole': {
        const { role } = body;
        if (!role || !['admin', 'student'].includes(role)) {
          return NextResponse.json(
            { error: 'Vai trò không hợp lệ. Chỉ chấp nhận "admin" hoặc "student".' },
            { status: 400 }
          );
        }

        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ role, updated_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          return NextResponse.json(
            { error: 'Không thể cập nhật vai trò. Vui lòng thử lại.' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: `Đã thay đổi vai trò của "${user.name}" thành "${role === 'admin' ? 'Quản trị viên' : 'Học sinh'}".`,
        });
      }

      case 'resetPassword': {
        const { newPassword } = body;
        if (!newPassword || newPassword.length < 8) {
          return NextResponse.json(
            { error: 'Mật khẩu mới phải có ít nhất 8 ký tự.' },
            { status: 400 }
          );
        }

        // Hash the new password using bcrypt
        const bcrypt = await import('bcryptjs');
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ password_hash: hashedPassword, updated_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          return NextResponse.json(
            { error: 'Không thể đặt lại mật khẩu. Vui lòng thử lại.' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: `Đã đặt lại mật khẩu cho "${user.name}" thành công.`,
        });
      }

      case 'adjustXp': {
        const { amount, reason } = body;
        if (typeof amount !== 'number' || amount === 0) {
          return NextResponse.json(
            { error: 'Số XP điều chỉnh phải là số khác 0.' },
            { status: 400 }
          );
        }

        // Get current XP
        const { data: currentUser } = await supabaseAdmin
          .from('users')
          .select('total_xp')
          .eq('id', userId)
          .single();

        const currentXp = currentUser?.total_xp ?? 0;
        const newXp = Math.max(0, currentXp + amount);
        const newLevel = Math.floor(Math.sqrt(newXp / 100));

        // Update user XP and level
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({
            total_xp: newXp,
            current_level: Math.max(1, newLevel),
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        if (updateError) {
          return NextResponse.json(
            { error: 'Không thể điều chỉnh XP. Vui lòng thử lại.' },
            { status: 500 }
          );
        }

        // Log XP transaction
        await supabaseAdmin.from('xp_logs').insert({
          user_id: userId,
          amount,
          source: 'admin_adjustment',
          description: reason || `Điều chỉnh XP bởi quản trị viên: ${amount > 0 ? '+' : ''}${amount}`,
          created_at: new Date().toISOString(),
        });

        return NextResponse.json({
          message: `Đã điều chỉnh ${amount > 0 ? '+' : ''}${amount} XP cho "${user.name}". XP hiện tại: ${newXp}.`,
          newXp,
          newLevel: Math.max(1, newLevel),
        });
      }

      case 'deactivate': {
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          return NextResponse.json(
            { error: 'Không thể vô hiệu hóa tài khoản. Vui lòng thử lại.' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: `Đã vô hiệu hóa tài khoản "${user.name}" thành công.`,
        });
      }

      case 'activate': {
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .eq('id', userId);

        if (updateError) {
          return NextResponse.json(
            { error: 'Không thể kích hoạt tài khoản. Vui lòng thử lại.' },
            { status: 500 }
          );
        }

        return NextResponse.json({
          message: `Đã kích hoạt lại tài khoản "${user.name}" thành công.`,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Hành động không hợp lệ. Các hành động hỗ trợ: changeRole, resetPassword, adjustXp, deactivate, activate.' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật người dùng:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/users/[userId]
 * Soft-deletes a user account by setting is_active to false.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { userId } = params;

    if (!userId) {
      return NextResponse.json(
        { error: 'ID người dùng không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email')
      .eq('id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy người dùng.' },
        { status: 404 }
      );
    }

    // Soft delete: set is_active to false and mark deletion timestamp
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        is_active: false,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json(
        { error: 'Không thể xóa tài khoản. Vui lòng thử lại.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Đã xóa tài khoản "${user.name}" (${user.email}) thành công. Tài khoản đã bị vô hiệu hóa.`,
    });
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xóa người dùng. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
