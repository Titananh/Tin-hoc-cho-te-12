import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';

// Mock users database — sẽ thay bằng DB thật ở Pha 5
const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: 'minh@example.com',
    password: 'password123',
    user: {
      id: 'user-1',
      name: 'Minh Nguyễn',
      email: 'minh@example.com',
      avatar_url: '',
      role: 'student',
      xp: 1250,
      level: 5,
      streak_count: 7,
      created_at: '2024-01-15',
      last_active: new Date().toISOString(),
    },
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: 'user-admin',
      name: 'Giáo viên',
      email: 'admin@example.com',
      avatar_url: '',
      role: 'admin',
      xp: 5000,
      level: 10,
      streak_count: 30,
      created_at: '2023-09-01',
      last_active: new Date().toISOString(),
    },
  },
];

// Danh sách user đã đăng ký trong session (in-memory)
const registeredUsers: typeof mockUsers = [];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu không được để trống.' },
        { status: 400 }
      );
    }

    // Tìm trong mock users + registered users
    const allUsers = [...mockUsers, ...registeredUsers];
    const found = allUsers.find(u => u.email === email && u.password === password);

    if (!found) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không đúng.' },
        { status: 401 }
      );
    }

    // Cập nhật last_active
    found.user.last_active = new Date().toISOString();

    return NextResponse.json({ user: found.user, token: `mock-token-${found.user.id}` });
  } catch {
    return NextResponse.json({ error: 'Lỗi server.' }, { status: 500 });
  }
}

// Export registeredUsers để register route có thể thêm vào
export { registeredUsers, mockUsers };
