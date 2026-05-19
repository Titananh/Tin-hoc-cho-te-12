import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/exercises/[exerciseId]
 * Returns full exercise details for editing, including test cases and lesson info.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { exerciseId } = params;
    const parsedId = parseInt(exerciseId, 10);

    if (!exerciseId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ.' },
        { status: 400 }
      );
    }

    // Fetch exercise with lesson info
    const { data: exercise, error } = await supabaseAdmin
      .from('exercises')
      .select(`*, lessons(id, title, slug)`)
      .eq('id', parsedId)
      .single();

    if (error || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập.' },
        { status: 404 }
      );
    }

    // Fetch test cases
    const { data: testCases, error: tcError } = await supabaseAdmin
      .from('test_cases')
      .select('*')
      .eq('exercise_id', parsedId)
      .order('order_index', { ascending: true });

    if (tcError) {
      console.error('Lỗi khi tải test cases:', tcError);
    }

    // Fetch submission count
    const { count: submissionCount } = await supabaseAdmin
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('exercise_id', parsedId);

    return NextResponse.json({
      exercise,
      test_cases: testCases ?? [],
      stats: {
        submissionCount: submissionCount ?? 0,
      },
    });
  } catch (error) {
    console.error('Lỗi khi tải chi tiết bài tập:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông tin bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/exercises/[exerciseId]
 * Updates exercise fields and test cases.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { exerciseId } = params;
    const parsedId = parseInt(exerciseId, 10);

    if (!exerciseId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify exercise exists
    const { data: existingExercise, error: fetchError } = await supabaseAdmin
      .from('exercises')
      .select('id')
      .eq('id', parsedId)
      .single();

    if (fetchError || !existingExercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập.' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    // Validate and collect fields
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim().length === 0) {
        return NextResponse.json(
          { error: 'Tiêu đề bài tập không được để trống.' },
          { status: 400 }
        );
      }
      updateData.title = body.title.trim();
    }

    if (body.description !== undefined) {
      updateData.description = body.description?.trim() ?? '';
    }

    if (body.starter_code !== undefined) {
      updateData.starter_code = body.starter_code ?? '';
    }

    if (body.solution_code !== undefined) {
      updateData.solution_code = body.solution_code ?? '';
    }

    if (body.difficulty !== undefined) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      if (!validDifficulties.includes(body.difficulty)) {
        return NextResponse.json(
          { error: 'Độ khó không hợp lệ. Chỉ chấp nhận: easy, medium, hard.' },
          { status: 400 }
        );
      }
      updateData.difficulty = body.difficulty;
    }

    if (body.xp_reward !== undefined) {
      if (typeof body.xp_reward !== 'number' || body.xp_reward < 0) {
        return NextResponse.json(
          { error: 'Điểm XP thưởng phải là số lớn hơn hoặc bằng 0.' },
          { status: 400 }
        );
      }
      updateData.xp_reward = body.xp_reward;
    }

    if (body.lesson_id !== undefined) {
      if (typeof body.lesson_id !== 'number') {
        return NextResponse.json(
          { error: 'ID bài học không hợp lệ.' },
          { status: 400 }
        );
      }
      // Check lesson exists
      const { data: lessonData } = await supabaseAdmin
        .from('lessons')
        .select('id')
        .eq('id', body.lesson_id)
        .single();

      if (!lessonData) {
        return NextResponse.json(
          { error: 'Bài học không tồn tại.' },
          { status: 400 }
        );
      }
      updateData.lesson_id = body.lesson_id;
    }

    if (body.hints !== undefined) {
      updateData.hints = body.hints ?? [];
    }

    if (body.is_published !== undefined) {
      updateData.is_published = !!body.is_published;
    }

    // Update exercise if there are fields to update
    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from('exercises')
        .update(updateData)
        .eq('id', parsedId);

      if (updateError) {
        console.error('Lỗi khi cập nhật bài tập:', updateError);
        return NextResponse.json(
          { error: 'Không thể cập nhật bài tập. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }
    }

    // Update test cases if provided
    if (body.test_cases !== undefined && Array.isArray(body.test_cases)) {
      if (body.test_cases.length === 0) {
        return NextResponse.json(
          { error: 'Bài tập phải có ít nhất một test case.' },
          { status: 400 }
        );
      }

      // Delete existing test cases
      await supabaseAdmin
        .from('test_cases')
        .delete()
        .eq('exercise_id', parsedId);

      // Insert new test cases
      const testCaseRecords = body.test_cases.map(
        (tc: { input: string; expected_output: string; is_hidden: boolean }, index: number) => ({
          exercise_id: parsedId,
          input: tc.input ?? '',
          expected_output: tc.expected_output ?? '',
          is_hidden: tc.is_hidden ?? false,
          order_index: index,
        })
      );

      const { error: tcError } = await supabaseAdmin
        .from('test_cases')
        .insert(testCaseRecords);

      if (tcError) {
        console.error('Lỗi khi cập nhật test cases:', tcError);
        return NextResponse.json(
          { error: 'Không thể cập nhật test cases. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }
    }

    // Fetch updated exercise
    const { data: updatedExercise } = await supabaseAdmin
      .from('exercises')
      .select('*')
      .eq('id', parsedId)
      .single();

    return NextResponse.json({
      exercise: updatedExercise,
      message: 'Cập nhật bài tập thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật bài tập:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/exercises/[exerciseId]
 * Deletes an exercise and its test cases.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { exerciseId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { exerciseId } = params;
    const parsedId = parseInt(exerciseId, 10);

    if (!exerciseId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài tập không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify exercise exists
    const { data: exercise, error: fetchError } = await supabaseAdmin
      .from('exercises')
      .select('id, title')
      .eq('id', parsedId)
      .single();

    if (fetchError || !exercise) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài tập.' },
        { status: 404 }
      );
    }

    // Get cascade info
    const { count: submissionCount } = await supabaseAdmin
      .from('submissions')
      .select('*', { count: 'exact', head: true })
      .eq('exercise_id', parsedId);

    // Delete exercise (cascades to test_cases and submissions)
    const { error: deleteError } = await supabaseAdmin
      .from('exercises')
      .delete()
      .eq('id', parsedId);

    if (deleteError) {
      console.error('Lỗi khi xóa bài tập:', deleteError);
      return NextResponse.json(
        { error: 'Không thể xóa bài tập. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Đã xóa bài tập "${exercise.title}" thành công.`,
      cascaded: {
        submissionsDeleted: submissionCount ?? 0,
      },
    });
  } catch (error) {
    console.error('Lỗi khi xóa bài tập:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xóa bài tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
