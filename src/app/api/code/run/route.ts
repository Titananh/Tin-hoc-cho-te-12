import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { submitCode } from '@/lib/judge0';
import { validateCodeSecurity } from '@/lib/code-security';
import { checkRateLimit, recordRequest, getRateLimitMessage } from '@/lib/rate-limiter';
import type { CodeRunRequest, CodeRunResponse } from '@/types/judge0';

// Code length limit
const MAX_CODE_LENGTH = 10000;

/**
 * POST /api/code/run
 * Execute Python code in sandbox environment via Judge0 API
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để chạy code' },
        { status: 401 }
      );
    }

    // Check rate limit
    const rateLimitResult = checkRateLimit(session.user.id);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: getRateLimitMessage(rateLimitResult.resetTime),
          remainingRequests: 0,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body: CodeRunRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { code, stdin } = body;

    // Validate code is provided
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Vui lòng nhập code để chạy' },
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

    // Run consolidated security checks
    const securityResult = validateCodeSecurity(code);
    if (!securityResult.isValid) {
      return NextResponse.json(
        { error: securityResult.error },
        { status: 400 }
      );
    }

    // Validate stdin if provided
    if (stdin !== undefined && typeof stdin !== 'string') {
      return NextResponse.json(
        { error: 'Dữ liệu đầu vào (stdin) phải là chuỗi ký tự' },
        { status: 400 }
      );
    }

    // Record this request for rate limiting
    recordRequest(session.user.id);

    // Execute code via Judge0 API
    const result = await submitCode(code, stdin);

    // Build response
    const response: CodeRunResponse = {
      output: result.stdout,
      error: result.stderr || null,
      executionTime: result.time,
      status: result.status,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Code execution error:', error);

    // Return the error message if it's a known Judge0 error
    if (error instanceof Error && error.message.startsWith('Dịch vụ')) {
      return NextResponse.json(
        { error: error.message },
        { status: 503 }
      );
    }

    if (error instanceof Error && error.message.startsWith('Không thể')) {
      return NextResponse.json(
        { error: error.message },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi thực thi code. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
