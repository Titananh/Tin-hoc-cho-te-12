import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { chatCompletion, FALLBACK_MESSAGES } from '@/lib/openai';
import type { ChatMessage } from '@/lib/openai';
import { checkAiRateLimit, recordAiMessage, getRemainingMessages } from '@/lib/ai-rate-limiter';

// Giới hạn độ dài code và error
const MAX_CODE_LENGTH = 2000;
const MAX_ERROR_LENGTH = 1000;

/** System prompt cho debugging */
const DEBUG_SYSTEM_PROMPT = `Bạn là PyMate, trợ lý AI giúp học sinh lớp 12 Việt Nam debug code Python (sách Cánh Diều, Tin học 12).

Khi giúp debug code, hãy:
1. Phân tích lỗi và xác định nguyên nhân
2. Giải thích tại sao lỗi xảy ra bằng tiếng Việt dễ hiểu
3. Đưa ra gợi ý cách sửa (KHÔNG đưa ra lời giải hoàn chỉnh)
4. Hướng dẫn học sinh tự sửa lỗi
5. Nếu có nhiều lỗi, liệt kê theo thứ tự ưu tiên
6. Luôn trả lời bằng tiếng Việt
7. Khuyến khích học sinh hiểu lỗi thay vì chỉ copy-paste code sửa

QUAN TRỌNG: Trả lời theo format JSON sau:
{
  "suggestions": ["gợi ý 1", "gợi ý 2", ...],
  "fixedCode": "code đã sửa (nếu lỗi đơn giản)" hoặc null
}
Chỉ trả về JSON, không thêm text nào khác.`;

/** Request body interface */
interface DebugRequestBody {
  code: string;
  error?: string;
}

/**
 * POST /api/ai/debug
 * Giúp debug code Python - xác định lỗi và gợi ý cách sửa
 */
export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để sử dụng tính năng debug' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Kiểm tra AI rate limit
    const rateLimitResult = checkAiRateLimit(userId);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: rateLimitResult.message,
          remainingMessages: 0,
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body: DebugRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { code, error: errorMessage } = body;

    // Validate code
    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đoạn code cần debug' },
        { status: 400 }
      );
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        {
          error: `Code không được vượt quá ${MAX_CODE_LENGTH} ký tự. Hiện tại: ${code.length} ký tự.`,
        },
        { status: 400 }
      );
    }

    // Validate error message (optional)
    if (errorMessage && typeof errorMessage === 'string' && errorMessage.length > MAX_ERROR_LENGTH) {
      return NextResponse.json(
        {
          error: `Mô tả lỗi không được vượt quá ${MAX_ERROR_LENGTH} ký tự.`,
        },
        { status: 400 }
      );
    }

    // Xây dựng messages cho OpenAI
    const messages: ChatMessage[] = [
      { role: 'system', content: DEBUG_SYSTEM_PROMPT },
    ];

    let userPrompt = `Đoạn code Python sau có vấn đề:\n\n\`\`\`python\n${code.trim()}\n\`\`\``;

    if (errorMessage && typeof errorMessage === 'string' && errorMessage.trim().length > 0) {
      userPrompt += `\n\nLỗi nhận được:\n\`\`\`\n${errorMessage.trim()}\n\`\`\``;
    } else {
      userPrompt += `\n\nHãy phân tích code và tìm các lỗi tiềm ẩn.`;
    }

    userPrompt += `\n\nHãy phân tích lỗi và gợi ý cách sửa.`;

    messages.push({ role: 'user', content: userPrompt });

    // Gọi OpenAI API
    let rawResponse: string;
    try {
      rawResponse = await chatCompletion(messages, {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        maxTokens: 1200,
        timeoutMs: 30000,
      });
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error ? error.message : FALLBACK_MESSAGES.apiUnavailable;

      return NextResponse.json(
        {
          suggestions: [FALLBACK_MESSAGES.apiUnavailable],
          error: errMsg,
        },
        { status: 200 }
      );
    }

    // Parse JSON response từ AI
    let suggestions: string[] = [];
    let fixedCode: string | undefined;

    try {
      // Thử parse JSON từ response
      const cleanResponse = rawResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanResponse);
      if (Array.isArray(parsed.suggestions)) {
        suggestions = parsed.suggestions;
      }
      if (parsed.fixedCode && typeof parsed.fixedCode === 'string') {
        fixedCode = parsed.fixedCode;
      }
    } catch {
      // Nếu không parse được JSON, tách response thành suggestions
      suggestions = rawResponse
        .split('\n')
        .filter((line) => line.trim().length > 0)
        .map((line) => line.replace(/^[-•*]\s*/, '').trim())
        .filter((line) => line.length > 0);

      if (suggestions.length === 0) {
        suggestions = [rawResponse];
      }
    }

    // Ghi nhận tin nhắn thành công
    recordAiMessage(userId);

    return NextResponse.json(
      {
        suggestions,
        ...(fixedCode && { fixedCode }),
        remainingMessages: getRemainingMessages(userId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('AI debug error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
