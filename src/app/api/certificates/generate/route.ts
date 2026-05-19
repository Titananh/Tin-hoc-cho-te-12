import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * POST /api/certificates/generate
 * Tạo chứng chỉ khi người dùng hoàn thành tất cả 10 cấp độ.
 * Yêu cầu đăng nhập.
 */
export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để tạo chứng chỉ' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Kiểm tra người dùng đã hoàn thành tất cả 10 levels chưa
    const { data: levels, error: levelsError } = await supabaseAdmin
      .from('levels')
      .select('id')
      .eq('is_published', true);

    if (levelsError) {
      console.error('Lỗi truy vấn levels:', levelsError);
      return NextResponse.json(
        { error: 'Không thể kiểm tra tiến độ học tập' },
        { status: 500 }
      );
    }

    const totalLevels = levels?.length ?? 0;

    if (totalLevels === 0) {
      return NextResponse.json(
        { error: 'Chưa có cấp độ nào trong hệ thống' },
        { status: 400 }
      );
    }

    // Kiểm tra tiến độ hoàn thành cho mỗi level
    // Lấy tất cả lessons trong hệ thống
    const { data: allLessons } = await supabaseAdmin
      .from('lessons')
      .select('id, chapters!inner(level_id)')
      .eq('is_published', true);

    const totalLessons = allLessons?.length ?? 0;

    // Lấy lessons đã hoàn thành bởi user
    const { data: completedProgress } = await supabaseAdmin
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', userId)
      .eq('completed', true);

    const completedLessons = completedProgress?.length ?? 0;

    // Yêu cầu hoàn thành tất cả lessons (hoặc ít nhất 90% nếu có nhiều)
    if (totalLessons > 0 && completedLessons < totalLessons) {
      return NextResponse.json(
        {
          error: 'Bạn chưa hoàn thành tất cả bài học. Vui lòng hoàn thành toàn bộ lộ trình để nhận chứng chỉ.',
          progress: {
            completed: completedLessons,
            total: totalLessons,
            percentage: Math.round((completedLessons / totalLessons) * 100),
          },
        },
        { status: 400 }
      );
    }

    // Kiểm tra xem đã có chứng chỉ chưa (tránh tạo trùng)
    const { data: existingCert } = await supabaseAdmin
      .from('certificates')
      .select('id, verification_code')
      .eq('user_id', userId)
      .eq('course_title', 'Python Master 12 - Hoàn thành khóa học')
      .single();

    if (existingCert) {
      return NextResponse.json({
        message: 'Bạn đã có chứng chỉ hoàn thành khóa học',
        certificate: {
          id: existingCert.id,
          verification_code: existingCert.verification_code,
          already_exists: true,
        },
      });
    }

    // Tạo chứng chỉ mới
    const { data: newCert, error: insertError } = await supabaseAdmin
      .from('certificates')
      .insert({
        user_id: userId,
        course_title: 'Python Master 12 - Hoàn thành khóa học',
        completion_date: new Date().toISOString().split('T')[0],
      })
      .select('id, verification_code, course_title, completion_date, created_at')
      .single();

    if (insertError || !newCert) {
      console.error('Lỗi tạo chứng chỉ:', insertError);
      return NextResponse.json(
        { error: 'Không thể tạo chứng chỉ. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Chúc mừng! Chứng chỉ đã được tạo thành công.',
      certificate: {
        id: newCert.id,
        verification_code: newCert.verification_code,
        course_title: newCert.course_title,
        completion_date: newCert.completion_date,
        user_name: session.user.name,
        issued_at: newCert.created_at,
      },
    });
  } catch (error) {
    console.error('Lỗi tạo chứng chỉ:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tạo chứng chỉ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
