import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/lessons/[lessonId]/complete
 * Marks a lesson as completed for the authenticated user.
 * - Marks lesson as completed in user_progress table
 * - Awards 50 XP (only if not previously completed)
 * - Logs XP transaction in xp_logs
 * - Updates user's total XP and recalculates level
 * - Returns updated progress and XP info
 * - Requires authentication
 * - Vietnamese error messages
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để hoàn thành bài học' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const lessonId = parseInt(params.lessonId, 10);

    if (isNaN(lessonId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ' },
        { status: 400 }
      );
    }

    // Verify the lesson exists and is published
    const { data: lesson, error: lessonError } = await supabaseAdmin
      .from('lessons')
      .select('id, title, xp_reward, is_published')
      .eq('id', lessonId)
      .eq('is_published', true)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học này' },
        { status: 404 }
      );
    }

    // Check if already completed
    const { data: existingProgress } = await supabaseAdmin
      .from('user_progress')
      .select('id, is_completed, completed_at')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();

    const alreadyCompleted = existingProgress?.is_completed === true;
    const now = new Date().toISOString();
    const xpToAward = alreadyCompleted ? 0 : 50;

    // Upsert user_progress record
    if (existingProgress) {
      // Update existing progress
      if (!alreadyCompleted) {
        const { error: updateError } = await supabaseAdmin
          .from('user_progress')
          .update({
            is_completed: true,
            completed_at: now,
          })
          .eq('id', existingProgress.id);

        if (updateError) {
          console.error('Error updating user_progress:', updateError);
          return NextResponse.json(
            { error: 'Không thể cập nhật tiến độ. Vui lòng thử lại sau.' },
            { status: 500 }
          );
        }
      }
    } else {
      // Insert new progress record
      const { error: insertError } = await supabaseAdmin
        .from('user_progress')
        .insert({
          user_id: userId,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: now,
          time_spent: 0,
        });

      if (insertError) {
        console.error('Error inserting user_progress:', insertError);
        return NextResponse.json(
          { error: 'Không thể lưu tiến độ. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }
    }

    // Award XP only if not previously completed
    let newTotalXp = 0;
    let newLevel = 0;
    let levelUp = false;

    if (xpToAward > 0) {
      // Log XP transaction
      const { error: xpLogError } = await supabaseAdmin
        .from('xp_logs')
        .insert({
          user_id: userId,
          amount: xpToAward,
          reason: `Hoàn thành bài học: ${lesson.title}`,
        });

      if (xpLogError) {
        console.error('Error logging XP:', xpLogError);
      }

      // Fetch current user XP and level
      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('xp, level')
        .eq('id', userId)
        .single();

      if (userError || !userData) {
        return NextResponse.json(
          { error: 'Không thể tải thông tin người dùng' },
          { status: 500 }
        );
      }

      // Calculate new XP and level
      newTotalXp = userData.xp + xpToAward;
      const previousLevel = userData.level;
      newLevel = Math.max(1, Math.floor(Math.sqrt(newTotalXp / 100)));
      levelUp = newLevel > previousLevel;

      // Update user's total XP and level
      const { error: updateUserError } = await supabaseAdmin
        .from('users')
        .update({
          xp: newTotalXp,
          level: newLevel,
        })
        .eq('id', userId);

      if (updateUserError) {
        console.error('Error updating user XP:', updateUserError);
        return NextResponse.json(
          { error: 'Không thể cập nhật điểm kinh nghiệm. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }
    } else {
      // Already completed - fetch current user data
      const { data: userData } = await supabaseAdmin
        .from('users')
        .select('xp, level')
        .eq('id', userId)
        .single();

      newTotalXp = userData?.xp ?? 0;
      newLevel = userData?.level ?? 1;
    }

    return NextResponse.json({
      message: alreadyCompleted
        ? 'Bài học đã được hoàn thành trước đó'
        : 'Hoàn thành bài học thành công!',
      xpEarned: xpToAward,
      newTotalXp,
      newLevel,
      levelUp,
      alreadyCompleted,
      lesson: {
        id: lesson.id,
        title: lesson.title,
      },
    });
  } catch (error) {
    console.error('Error in POST /api/lessons/[lessonId]/complete:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi hoàn thành bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
