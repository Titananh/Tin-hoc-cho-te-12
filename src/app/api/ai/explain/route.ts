import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { chatCompletion, FALLBACK_MESSAGES } from '@/lib/openai';
import type { ChatMessage } from '@/lib/openai';
import { checkAiRateLimit, recordAiMessage, getRemainingMessages } from '@/lib/ai-rate-limiter';

// Giới hạn độ dài code
const MAX_CODE_LENGTH = 2000;

/** System prompt cho giải thích code */
const EXPLAIN_SYSTEM_PROMPT = `Bạn là PyMate, trợ lý AI giúp học sinh lớp 12 Việt Nam hiểu code Python (sách Cánh Diều, Tin học 12).

Khi giải thích code, hãy:
1. Giải thích mục đích tổng thể của đoạn code
2. Phân tích từng dòng hoặc từng khối code quan trọng
3. Giải thích các khái niệm Python được sử dụng
4. Nêu ví dụ minh họa nếu cần
5. Luôn trả lời bằng tiếng Việt, dễ hiểu cho học sinh lớp 12
6. Sử dụng format rõ ràng với bullet points hoặc đánh số`;

/** Request body interface */
interface ExplainRequestBody {
  code: string;
  question?: string;
}

/**
 * POST /api/ai/explain
 * Giải thích code Python step-by-step bằng tiếng Việt
 */
export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để sử dụng tính năng giải thích code' },
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
    let body: ExplainRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { code, question } = body;

    // Validate code
    if (!code || typeof code !== 'string' || code.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng cung cấp đoạn code cần giải thích' },
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

    // Xây dựng messages cho OpenAI
    const messages: ChatMessage[] = [
      { role: 'system', content: EXPLAIN_SYSTEM_PROMPT },
    ];

    // Xây dựng user prompt
    let userPrompt = `Hãy giải thích đoạn code Python sau step-by-step:\n\n\`\`\`python\n${code.trim()}\n\`\`\``;

    if (question && typeof question === 'string' && question.trim().length > 0) {
      userPrompt += `\n\nCâu hỏi cụ thể: ${question.trim()}`;
    }

    messages.push({ role: 'user', content: userPrompt });

    // Gọi OpenAI API
    let explanation: string;
    try {
      explanation = await chatCompletion(messages, {
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        maxTokens: 1500,
        timeoutMs: 30000,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : FALLBACK_MESSAGES.apiUnavailable;

      return NextResponse.json(
        {
          explanation: FALLBACK_MESSAGES.apiUnavailable,
          error: errorMessage,
        },
        { status: 200 }
      );
    }

    // Ghi nhận tin nhắn thành công
    recordAiMessage(userId);

    return NextResponse.json(
      {
        explanation,
        remainingMessages: getRemainingMessages(userId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('AI explain error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
