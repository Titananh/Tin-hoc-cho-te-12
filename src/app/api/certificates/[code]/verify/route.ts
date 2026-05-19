import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/certificates/[code]/verify
 * Xác thực chứng chỉ bằng mã verification code.
 * Endpoint công khai - không yêu cầu đăng nhập.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    if (!code) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp mã xác thực' },
        { status: 400 }
      );
    }

    // Tìm chứng chỉ theo verification_code
    const { data: certificate, error } = await supabaseAdmin
      .from('certificates')
      .select(`
        id,
        verification_code,
        course_title,
        completion_date,
        created_at,
        user_id,
        users (
          name,
          email
        )
      `)
      .eq('verification_code', code)
      .single();

    if (error || !certificate) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Không tìm thấy chứng chỉ với mã xác thực này',
        },
        { status: 404 }
      );
    }

    const user = certificate.users as unknown as { name: string; email: string } | null;

    return NextResponse.json({
      valid: true,
      certificate: {
        id: certificate.id,
        verification_code: certificate.verification_code,
        course_title: certificate.course_title,
        completion_date: certificate.completion_date,
        user_name: user?.name ?? 'Người dùng',
        issued_at: certificate.created_at,
      },
      message: 'Chứng chỉ hợp lệ',
    });
  } catch (error) {
    console.error('Lỗi xác thực chứng chỉ:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xác thực chứng chỉ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
