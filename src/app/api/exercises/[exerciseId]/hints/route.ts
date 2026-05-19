import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/exercises/[exerciseId]/hints
 * Returns progressive hints for the exercise:
 * - Up to 3 hints per exercise
 * - Tracks which hints the user has already viewed
 * - Each request reveals the next hint in sequence
 * - Requires authentication
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập để xem gợi ý' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const exerciseId = parseInt(params.exerciseId, 10);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ' },
        { status: 400 }
      );
    }

    // Fetch exercise hints
    const { data: exercise, error: exerciseError } = await supabaseAdmin
      .from('exercises')
      .select('id, hints')
      .eq('id', exerciseId)
      .single();

    if (exerciseError || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập này' },
        { status: 404 }
      );
    }

    // Parse hints from JSON
    const allHints = (exercise.hints as string[]) ?? [];

    if (allHints.length === 0) {
      return NextResponse.json({
        exerciseId: exercise.id,
        hints: [],
        totalHints: 0,
        viewedCount: 0,
        hasMoreHints: false,
        message: 'Bài tập này không có gợi ý',
      });
    }

    // Limit to maximum 3 hints
    const availableHints = allHints.slice(0, 3);

    // Fetch or create user hint view record
    const { data: hintView, error: hintViewError } = await supabaseAdmin
      .from('user_hint_views')
      .select('id, hints_viewed')
      .eq('user_id', userId)
      .eq('exercise_id', exerciseId)
      .single();

    let currentViewedCount = 0;

    if (hintViewError && hintViewError.code === 'PGRST116') {
      // No record exists - create one and reveal first hint
      const { error: insertError } = await supabaseAdmin
        .from('user_hint_views')
        .insert({
          user_id: userId,
          exercise_id: exerciseId,
          hints_viewed: 1,
        });

      if (insertError) {
        console.error('Error creating hint view record:', insertError);
        // If table doesn't exist, still return the first hint gracefully
        return NextResponse.json({
          exerciseId: exercise.id,
          hints: [{ order: 1, content: availableHints[0] }],
          totalHints: availableHints.length,
          viewedCount: 1,
          hasMoreHints: availableHints.length > 1,
        });
      }

      currentViewedCount = 1;
    } else if (hintView) {
      // Record exists - reveal next hint
      currentViewedCount = hintView.hints_viewed;

      if (currentViewedCount < availableHints.length) {
        // Reveal next hint
        currentViewedCount += 1;

        const { error: updateError } = await supabaseAdmin
          .from('user_hint_views')
          .update({ hints_viewed: currentViewedCount })
          .eq('id', hintView.id);

        if (updateError) {
          console.error('Error updating hint view count:', updateError);
        }
      }
      // If all hints already viewed, just return them all
    } else {
      // Unexpected error
      console.error('Error fetching hint views:', hintViewError);
      currentViewedCount = 1;
    }

    // Build revealed hints array
    const revealedHints = availableHints
      .slice(0, currentViewedCount)
      .map((hint, index) => ({
        order: index + 1,
        content: hint,
      }));

    return NextResponse.json({
      exerciseId: exercise.id,
      hints: revealedHints,
      totalHints: availableHints.length,
      viewedCount: currentViewedCount,
      hasMoreHints: currentViewedCount < availableHints.length,
    });
  } catch (error) {
    console.error('Error in GET /api/exercises/[exerciseId]/hints:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải gợi ý. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
