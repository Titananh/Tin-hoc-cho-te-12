import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/lessons/[lessonId]
 * Returns full lesson details for editing, including module and course info.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { lessonId } = params;
    const parsedId = parseInt(lessonId, 10);

    if (!lessonId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ.' },
        { status: 400 }
      );
    }

    // Fetch lesson with module and course info
    const { data: lesson, error } = await supabaseAdmin
      .from('lessons')
      .select(
        `*, modules(id, title, slug, course_id, courses(id, title, slug))`
      )
      .eq('id', parsedId)
      .single();

    if (error || !lesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học.' },
        { status: 404 }
      );
    }

    // Fetch exercise count for this lesson
    const { count: exerciseCount } = await supabaseAdmin
      .from('exercises')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', parsedId);

    // Fetch user progress count for this lesson
    const { count: progressCount } = await supabaseAdmin
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', parsedId)
      .eq('is_completed', true);

    return NextResponse.json({
      lesson,
      stats: {
        exerciseCount: exerciseCount ?? 0,
        completedByUsers: progressCount ?? 0,
      },
    });
  } catch (error) {
    console.error('Lỗi khi tải chi tiết bài học:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải thông tin bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/lessons/[lessonId]
 * Updates lesson fields. Accepts any subset of updatable fields.
 *
 * Updatable fields:
 * - title: string
 * - slug: string (must be unique)
 * - description: string
 * - content: object (JSON)
 * - difficulty: "beginner" | "intermediate" | "advanced"
 * - estimated_minutes: number (> 0)
 * - xp_reward: number (>= 0)
 * - order_index: number
 * - is_published: boolean
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { lessonId } = params;
    const parsedId = parseInt(lessonId, 10);

    if (!lessonId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify lesson exists
    const { data: existingLesson, error: fetchError } = await supabaseAdmin
      .from('lessons')
      .select('id, slug')
      .eq('id', parsedId)
      .single();

    if (fetchError || !existingLesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học.' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    // Validate and collect title
    if (body.title !== undefined) {
      if (typeof body.title !== 'string' || body.title.trim().length === 0) {
        return NextResponse.json(
          { error: 'Tiêu đề bài học không được để trống.' },
          { status: 400 }
        );
      }
      updateData.title = body.title.trim();
    }

    // Validate and collect slug
    if (body.slug !== undefined) {
      if (typeof body.slug !== 'string' || body.slug.trim().length === 0) {
        return NextResponse.json(
          { error: 'Slug bài học không được để trống.' },
          { status: 400 }
        );
      }

      // Check slug uniqueness (exclude current lesson)
      const { data: slugConflict } = await supabaseAdmin
        .from('lessons')
        .select('id')
        .eq('slug', body.slug.trim())
        .neq('id', parsedId)
        .single();

      if (slugConflict) {
        return NextResponse.json(
          { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
          { status: 409 }
        );
      }
      updateData.slug = body.slug.trim();
    }

    // Validate and collect description
    if (body.description !== undefined) {
      updateData.description = body.description?.trim() ?? null;
    }

    // Validate and collect content (JSON)
    if (body.content !== undefined) {
      if (body.content !== null && typeof body.content !== 'object') {
        return NextResponse.json(
          { error: 'Nội dung bài học phải là đối tượng JSON hợp lệ.' },
          { status: 400 }
        );
      }
      updateData.content = body.content ?? {};
    }

    // Validate and collect difficulty
    if (body.difficulty !== undefined) {
      const validDifficulties = ['beginner', 'intermediate', 'advanced'];
      if (!validDifficulties.includes(body.difficulty)) {
        return NextResponse.json(
          { error: 'Độ khó không hợp lệ. Chỉ chấp nhận: beginner, intermediate, advanced.' },
          { status: 400 }
        );
      }
      updateData.difficulty = body.difficulty;
    }

    // Validate and collect estimated_minutes
    if (body.estimated_minutes !== undefined) {
      if (typeof body.estimated_minutes !== 'number' || body.estimated_minutes <= 0) {
        return NextResponse.json(
          { error: 'Thời gian ước tính phải là số lớn hơn 0.' },
          { status: 400 }
        );
      }
      updateData.estimated_minutes = body.estimated_minutes;
    }

    // Validate and collect xp_reward
    if (body.xp_reward !== undefined) {
      if (typeof body.xp_reward !== 'number' || body.xp_reward < 0) {
        return NextResponse.json(
          { error: 'Điểm XP thưởng phải là số lớn hơn hoặc bằng 0.' },
          { status: 400 }
        );
      }
      updateData.xp_reward = body.xp_reward;
    }

    // Validate and collect order_index
    if (body.order_index !== undefined) {
      if (typeof body.order_index !== 'number' || body.order_index < 0) {
        return NextResponse.json(
          { error: 'Thứ tự bài học phải là số lớn hơn hoặc bằng 0.' },
          { status: 400 }
        );
      }
      updateData.order_index = body.order_index;
    }

    // Validate and collect is_published
    if (body.is_published !== undefined) {
      if (typeof body.is_published !== 'boolean') {
        return NextResponse.json(
          { error: 'Trạng thái xuất bản phải là true hoặc false.' },
          { status: 400 }
        );
      }
      updateData.is_published = body.is_published;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'Không có trường nào để cập nhật.' },
        { status: 400 }
      );
    }

    // Perform update
    const { data: updatedLesson, error: updateError } = await supabaseAdmin
      .from('lessons')
      .update(updateData)
      .eq('id', parsedId)
      .select()
      .single();

    if (updateError) {
      console.error('Lỗi khi cập nhật bài học:', updateError);
      if (updateError.code === '23505') {
        return NextResponse.json(
          { error: 'Slug đã tồn tại. Vui lòng chọn slug khác.' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Không thể cập nhật bài học. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      lesson: updatedLesson,
      message: 'Cập nhật bài học thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật bài học:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/lessons/[lessonId]
 * Deletes a lesson. This cascades to exercises and user progress
 * due to ON DELETE CASCADE foreign key constraints.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const { lessonId } = params;
    const parsedId = parseInt(lessonId, 10);

    if (!lessonId || isNaN(parsedId)) {
      return NextResponse.json(
        { error: 'ID bài học không hợp lệ.' },
        { status: 400 }
      );
    }

    // Verify lesson exists and get info for response
    const { data: lesson, error: fetchError } = await supabaseAdmin
      .from('lessons')
      .select('id, title, slug')
      .eq('id', parsedId)
      .single();

    if (fetchError || !lesson) {
      return NextResponse.json(
        { error: 'Không tìm thấy bài học.' },
        { status: 404 }
      );
    }

    // Get cascade info for confirmation message
    const { count: exerciseCount } = await supabaseAdmin
      .from('exercises')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', parsedId);

    const { count: progressCount } = await supabaseAdmin
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('lesson_id', parsedId);

    // Delete lesson (cascades to exercises and user_progress)
    const { error: deleteError } = await supabaseAdmin
      .from('lessons')
      .delete()
      .eq('id', parsedId);

    if (deleteError) {
      console.error('Lỗi khi xóa bài học:', deleteError);
      return NextResponse.json(
        { error: 'Không thể xóa bài học. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Đã xóa bài học "${lesson.title}" thành công.`,
      cascaded: {
        exercisesDeleted: exerciseCount ?? 0,
        progressRecordsDeleted: progressCount ?? 0,
      },
    });
  } catch (error) {
    console.error('Lỗi khi xóa bài học:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xóa bài học. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
