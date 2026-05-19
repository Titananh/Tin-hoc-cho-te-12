import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/certificates
 * Trả về danh sách chứng chỉ của người dùng hiện tại.
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem chứng chỉ' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const { data: certificates, error } = await supabaseAdmin
      .from('certificates')
      .select('id, verification_code, course_title, completion_date, created_at')
      .eq('user_id', userId)
      .order('completion_date', { ascending: false });

    if (error) {
      console.error('Lỗi truy vấn certificates:', error);
      return NextResponse.json(
        { error: 'Không thể tải danh sách chứng chỉ' },
        { status: 500 }
      );
    }

    // Lấy thông tin user để gắn vào certificate
    const userName = session.user.name;

    const formattedCertificates = (certificates ?? []).map((cert) => ({
      id: cert.id,
      user_name: userName,
      completion_date: cert.completion_date,
      verification_code: cert.verification_code,
      course_title: cert.course_title,
      level: cert.course_title, // course_title chứa thông tin level
    }));

    return NextResponse.json({
      certificates: formattedCertificates,
      total: formattedCertificates.length,
    });
  } catch (error) {
    console.error('Lỗi API certificates:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải chứng chỉ. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
