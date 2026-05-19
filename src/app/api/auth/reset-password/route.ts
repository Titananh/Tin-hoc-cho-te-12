import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

// Password validation constants
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const BCRYPT_COST_FACTOR = 12;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    // Validate required fields
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < PASSWORD_MIN_LENGTH) {
      return NextResponse.json(
        { error: `Mật khẩu phải có ít nhất ${PASSWORD_MIN_LENGTH} ký tự` },
        { status: 400 }
      );
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Mật khẩu không được quá ${PASSWORD_MAX_LENGTH} ký tự` },
        { status: 400 }
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: 'Mật khẩu phải chứa ít nhất 1 chữ hoa (A-Z)' },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: 'Mật khẩu phải chứa ít nhất 1 chữ thường (a-z)' },
        { status: 400 }
      );
    }

    if (!/\d/.test(password)) {
      return NextResponse.json(
        { error: 'Mật khẩu phải chứa ít nhất 1 chữ số (0-9)' },
        { status: 400 }
      );
    }

    // Look up the token in verification_tokens table
    const { data: tokenRecord, error: tokenError } = await supabaseAdmin
      .from('verification_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (tokenError || !tokenRecord) {
      return NextResponse.json(
        { error: 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã được sử dụng. Vui lòng yêu cầu liên kết mới.' },
        { status: 400 }
      );
    }

    // Check if token has expired
    const now = new Date();
    const expiresAt = new Date(tokenRecord.expires);

    if (now > expiresAt) {
      // Delete expired token
      await supabaseAdmin
        .from('verification_tokens')
        .delete()
        .eq('token', token);

      return NextResponse.json(
        { error: 'Liên kết đặt lại mật khẩu đã hết hạn. Vui lòng yêu cầu liên kết mới.' },
        { status: 400 }
      );
    }

    // Find the user by email (identifier)
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', tokenRecord.identifier)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Không tìm thấy tài khoản. Vui lòng yêu cầu liên kết mới.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST_FACTOR);

    // Update the user's password
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating password:', updateError);
      return NextResponse.json(
        { error: 'Không thể cập nhật mật khẩu. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Delete the used token
    await supabaseAdmin
      .from('verification_tokens')
      .delete()
      .eq('token', token);

    return NextResponse.json(
      { message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
