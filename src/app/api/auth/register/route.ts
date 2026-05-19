import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';
import { isDevBypass, devCreateUser } from '@/lib/dev-store';

// Password validation constants
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const BCRYPT_COST_FACTOR = 12;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Validate name
    if (name.length < NAME_MIN_LENGTH || name.length > NAME_MAX_LENGTH) {
      return NextResponse.json(
        { error: `Tên phải từ ${NAME_MIN_LENGTH} đến ${NAME_MAX_LENGTH} ký tự` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không đúng định dạng. Ví dụ: ten@email.com' },
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

    // ===== DEV MODE: Use in-memory store when Supabase is not configured =====
    if (isDevBypass()) {
      const result = await devCreateUser(name, email, password);
      if ('error' in result) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json(
        {
          user: {
            id: result.id,
            email: result.email,
            name: result.name,
            role: result.role,
          },
          message: 'Đăng ký thành công! (Dev Mode - dữ liệu chỉ lưu tạm trong bộ nhớ)',
        },
        { status: 201 }
      );
    }

    // ===== PRODUCTION MODE: Use Supabase =====
    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc đăng nhập.' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt (cost factor 12)
    const passwordHash = await bcrypt.hash(password, BCRYPT_COST_FACTOR);

    // Create user in database
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert({
        name,
        email,
        password_hash: passwordHash,
        role: 'student',
        xp: 0,
        level: 1,
        streak_count: 0,
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating user:', createError);
      return NextResponse.json(
        { error: 'Không thể tạo tài khoản. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    // Create streak record for new user
    await supabaseAdmin.from('streaks').insert({
      user_id: newUser.id,
      current_streak: 0,
      longest_streak: 0,
      last_activity_date: new Date().toISOString().split('T')[0],
    });

    return NextResponse.json(
      {
        user: {
          id: String(newUser.id),
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        message: 'Đăng ký thành công!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
