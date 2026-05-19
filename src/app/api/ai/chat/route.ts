import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { chatCompletion, FALLBACK_MESSAGES } from '@/lib/openai';
import type { ChatMessage } from '@/lib/openai';
import {
  checkAiRateLimit,
  recordAiMessage,
  getRemainingMessages,
} from '@/lib/ai-rate-limiter';

// Giới hạn độ dài tin nhắn
const MAX_MESSAGE_LENGTH = 1000;
// Số tin nhắn context tối đa
const MAX_CONVERSATION_HISTORY = 10;

/** System prompt cho PyMate */
const PYMATE_SYSTEM_PROMPT = `Bạn là PyMate, trợ lý AI hỗ trợ học Python cho học sinh lớp 12 Việt Nam theo sách Cánh Diều. Trả lời bằng tiếng Việt, thân thiện, khuyến khích. Không đưa đáp án trực tiếp cho bài tập, chỉ gợi ý hướng giải.`;

/** Request body interface */
interface ChatRequestBody {
  message: string;
  context?: {
    lessonId?: number;
    lessonTitle?: string;
    exerciseId?: number;
  };
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

/**
 * POST /api/ai/chat
 * Chat với AI Tutor (PyMate)
 */
export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để sử dụng PyMate' },
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
    let body: ChatRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Dữ liệu gửi lên không hợp lệ' },
        { status: 400 }
      );
    }

    const { message, context, conversationHistory } = body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng nhập tin nhắn' },
        { status: 400 }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: `Tin nhắn không được vượt quá ${MAX_MESSAGE_LENGTH} ký tự. Hiện tại: ${message.length} ký tự.`,
        },
        { status: 400 }
      );
    }

    // Xây dựng messages cho OpenAI
    const messages: ChatMessage[] = [];

    // System prompt
    let systemPrompt = PYMATE_SYSTEM_PROMPT;
    if (context) {
      systemPrompt += `\n\nNgữ cảnh hiện tại:`;
      if (context.lessonTitle) {
        systemPrompt += `\n- Bài học: ${context.lessonTitle}`;
      }
      if (context.lessonId) {
        systemPrompt += `\n- Mã bài học: ${context.lessonId}`;
      }
      if (context.exerciseId) {
        systemPrompt += `\n- Mã bài tập: ${context.exerciseId}`;
      }
    }
    messages.push({ role: 'system', content: systemPrompt });

    // Thêm conversation history (giới hạn 10 tin nhắn gần nhất)
    if (conversationHistory && Array.isArray(conversationHistory)) {
      const recentHistory = conversationHistory.slice(-MAX_CONVERSATION_HISTORY);
      for (const msg of recentHistory) {
        if (
          msg.role === 'user' ||
          msg.role === 'assistant'
        ) {
          messages.push({
            role: msg.role,
            content: msg.content,
          });
        }
      }
    }

    // Thêm tin nhắn hiện tại
    messages.push({ role: 'user', content: message.trim() });

    // Gọi OpenAI API
    let reply: string;
    try {
      reply = await chatCompletion(messages, {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 1024,
        timeoutMs: 30000,
      });
    } catch (error: unknown) {
      // Sử dụng fallback message nếu OpenAI không khả dụng
      const errorMessage =
        error instanceof Error ? error.message : FALLBACK_MESSAGES.apiUnavailable;

      return NextResponse.json(
        {
          reply: FALLBACK_MESSAGES.apiUnavailable,
          remainingMessages: getRemainingMessages(userId),
          error: errorMessage,
        },
        { status: 200 }
      );
    }

    // Ghi nhận tin nhắn thành công
    recordAiMessage(userId);

    return NextResponse.json(
      {
        reply,
        remainingMessages: getRemainingMessages(userId),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('AI chat error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
