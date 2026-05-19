import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email is provided
    if (!email) {
      return NextResponse.json(
        { error: 'Vui lòng nhập địa chỉ email' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không đúng định dạng' },
        { status: 400 }
      );
    }

    // Check if user exists (but don't reveal this to the client for security)
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single();

    if (user) {
      // Generate a unique reset token
      const token = crypto.randomUUID();

      // Set expiry to 24 hours from now
      const expires = new Date();
      expires.setHours(expires.getHours() + 24);

      // Delete any existing tokens for this email
      await supabaseAdmin
        .from('verification_tokens')
        .delete()
        .eq('identifier', email);

      // Store token in verification_tokens table
      const { error: insertError } = await supabaseAdmin
        .from('verification_tokens')
        .insert({
          identifier: email,
          token,
          expires: expires.toISOString(),
        });

      if (insertError) {
        console.error('Error storing reset token:', insertError);
        return NextResponse.json(
          { error: 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.' },
          { status: 500 }
        );
      }

      // In production, send email with reset link via SendGrid/Resend
      // For now, log the token (in development)
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DEV] Password reset token for ${email}: ${token}`);
        console.log(`[DEV] Reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${token}`);
      }

      // TODO: Send email with reset link
      // await sendResetEmail(email, token);
    }

    // Always return success message regardless of whether email exists
    // This prevents email enumeration attacks
    return NextResponse.json(
      {
        message: 'Nếu email tồn tại trong hệ thống, bạn sẽ nhận được liên kết đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
