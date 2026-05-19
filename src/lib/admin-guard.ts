import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './auth';

/**
 * Server-side admin authorization guard.
 * Use in any admin API route to verify the current user has admin role.
 *
 * Usage:
 * ```ts
 * export async function GET() {
 *   const guard = await requireAdmin();
 *   if (guard) return guard;
 *   // ... admin-only logic
 * }
 * ```
 *
 * @returns NextResponse with 401/403 error if unauthorized, or null if authorized
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.' },
      { status: 401 }
    );
  }

  if (session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Bạn không có quyền truy cập. Chỉ quản trị viên mới được phép thực hiện thao tác này.' },
      { status: 403 }
    );
  }

  return null;
}
