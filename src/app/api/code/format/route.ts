import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { formatPythonCode } from '@/lib/python-formatter';

// Code length limit
const MAX_CODE_LENGTH = 10000;

/**
 * POST /api/code/format
 * Format Python code according to basic PEP 8 rules
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để sử dụng tính năng format code' },
        { status: 401 }
      );
    }

    // Parse request body
    let body: { code?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { code } = body;

    // Validate code is provided
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp code để format' },
        { status: 400 }
      );
    }

    // Validate code length
    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error: `Code không được vượt quá ${MAX_CODE_LENGTH.toLocaleString()} ký tự. Hiện tại: ${code.length.toLocaleString()} ký tự.`,
        },
        { status: 400 }
      );
    }

    // Format the code
    const { formattedCode } = formatPythonCode(code);

    return NextResponse.json({ formattedCode }, { status: 200 });
  } catch (error) {
    console.error('Code formatting error:', error);

    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi format code. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
