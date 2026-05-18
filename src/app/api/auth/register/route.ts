import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';

// In-memory store for registered users (shares with login route concept)
const registeredEmails = new Set<string>(['minh@example.com', 'admin@example.com']);

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Validate
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Tên, email và mật khẩu không được để trống.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Mật khẩu phải có ít nhất 6 ký tự.' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Email không hợp lệ.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (registeredEmails.has(email)) {
      return NextResponse.json(
        { error: 'Email này đã được đăng ký. Hãy đăng nhập.' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      avatar_url: '',
      role: 'student',
      xp: 0,
      level: 1,
      streak_count: 0,
      created_at: new Date().toISOString(),
      last_active: new Date().toISOString(),
    };

    registeredEmails.add(email);

    return NextResponse.json(
      { user: newUser, token: `mock-token-${newUser.id}`, message: 'Đăng ký thành công!' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Lỗi server.' }, { status: 500 });
  }
}
