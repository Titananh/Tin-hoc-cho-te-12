/**
 * OpenAI client wrapper cho AI Tutor (PyMate).
 *
 * - Tạo OpenAI client từ OPENAI_API_KEY env var
 * - Helper function chatCompletion với timeout handling
 * - Fallback messages tiếng Việt khi API lỗi
 */

import OpenAI from 'openai';

// Tạo OpenAI client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? '',
});

export { openai };

/** Options cho chatCompletion */
export interface ChatCompletionOptions {
  /** Model sử dụng (default: gpt-3.5-turbo) */
  model?: string;
  /** Nhiệt độ (0-2, default: 0.7) */
  temperature?: number;
  /** Số token tối đa cho response */
  maxTokens?: number;
  /** Timeout tính bằng ms (default: 30000) */
  timeoutMs?: number;
}

/** Message format cho OpenAI */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** Fallback messages tiếng Việt */
export const FALLBACK_MESSAGES = {
  apiUnavailable:
    'Xin lỗi, PyMate hiện không thể trả lời. Vui lòng thử lại sau hoặc xem lại nội dung bài học.',
  timeout:
    'Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại với câu hỏi ngắn hơn.',
  invalidKey:
    'Dịch vụ AI chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
  generalError:
    'Đã xảy ra lỗi khi xử lý yêu cầu. Vui lòng thử lại sau.',
} as const;

/**
 * Gọi OpenAI Chat Completion API với timeout handling.
 *
 * @param messages - Danh sách messages (system, user, assistant)
 * @param options - Tùy chọn (model, temperature, maxTokens, timeoutMs)
 * @returns Nội dung response từ AI
 * @throws Error với message tiếng Việt nếu có lỗi
 */
export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<string> {
  const {
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    maxTokens = 1024,
    timeoutMs = 30000,
  } = options;

  // Kiểm tra API key
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(FALLBACK_MESSAGES.invalidKey);
  }

  // Tạo AbortController cho timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await openai.chat.completions.create(
      {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      },
      {
        signal: controller.signal,
      }
    );

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error(FALLBACK_MESSAGES.generalError);
    }

    return content.trim();
  } catch (error: unknown) {
    // Xử lý timeout (AbortError)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(FALLBACK_MESSAGES.timeout);
    }

    // Xử lý lỗi từ OpenAI SDK
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        throw new Error(FALLBACK_MESSAGES.invalidKey);
      }
      if (error.status === 429) {
        throw new Error(
          'PyMate đang quá tải. Vui lòng thử lại sau vài phút.'
        );
      }
      if (error.status === 503 || error.status === 500) {
        throw new Error(FALLBACK_MESSAGES.apiUnavailable);
      }
    }

    // Nếu error đã có message tiếng Việt (từ các throw ở trên), giữ nguyên
    if (error instanceof Error && error.message.startsWith('Xin lỗi')) {
      throw error;
    }
    if (error instanceof Error && error.message.startsWith('PyMate')) {
      throw error;
    }
    if (error instanceof Error && error.message.startsWith('Dịch vụ')) {
      throw error;
    }
    if (error instanceof Error && error.message.startsWith('Yêu cầu')) {
      throw error;
    }
    if (error instanceof Error && error.message.startsWith('Đã xảy ra')) {
      throw error;
    }

    // Fallback cho mọi lỗi khác
    throw new Error(FALLBACK_MESSAGES.apiUnavailable);
  } finally {
    clearTimeout(timeoutId);
  }
}
