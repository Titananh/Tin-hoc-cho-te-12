import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { supabaseAdmin } from '@/lib/supabase';

interface RouteParams {
  params: { projectId: string };
}

/**
 * GET /api/admin/projects/:projectId
 * Returns full project details for editing.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const projectId = parseInt(params.projectId, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID dự án không hợp lệ.' },
        { status: 400 }
      );
    }

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error || !project) {
      return NextResponse.json(
        { error: 'Không tìm thấy dự án.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Lỗi khi tải chi tiết dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải chi tiết dự án.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/projects/:projectId
 * Updates project fields.
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const projectId = parseInt(params.projectId, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID dự án không hợp lệ.' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const allowedFields = [
      'title', 'slug', 'description', 'difficulty', 'starter_code',
      'requirements', 'checklist', 'estimated_hours', 'prerequisite_level_ids',
      'test_cases', 'xp_reward', 'is_published',
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

    // Validate difficulty if provided
    if (updateData.difficulty) {
      const validDifficulties = ['easy', 'medium', 'hard'];
      if (!validDifficulties.includes(updateData.difficulty as string)) {
        return NextResponse.json(
          { error: 'Độ khó không hợp lệ. Chỉ chấp nhận: easy, medium, hard.' },
          { status: 400 }
        );
      }
    }

    updateData.updated_at = new Date().toISOString();

    const { data: project, error } = await supabaseAdmin
      .from('projects')
      .update(updateData)
      .eq('id', projectId)
      .select()
      .single();

    if (error) {
      console.error('Lỗi khi cập nhật dự án:', error);
      return NextResponse.json(
        { error: 'Không thể cập nhật dự án. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (!project) {
      return NextResponse.json(
        { error: 'Không tìm thấy dự án.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      project,
      message: 'Cập nhật dự án thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi cập nhật dự án.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/projects/:projectId
 * Deletes a project.
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const guard = await requireAdmin();
    if (guard) return guard;

    const projectId = parseInt(params.projectId, 10);
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'ID dự án không hợp lệ.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Lỗi khi xóa dự án:', error);
      return NextResponse.json(
        { error: 'Không thể xóa dự án. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Xóa dự án thành công.',
    });
  } catch (error) {
    console.error('Lỗi khi xóa dự án:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xóa dự án.' },
      { status: 500 }
    );
  }
}
