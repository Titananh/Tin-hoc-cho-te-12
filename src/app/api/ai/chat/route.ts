import { NextRequest, NextResponse } from 'next/server';
import { generateTutorResponse, getSuggestions } from '@/lib/tutor';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Tin nhắn không được để trống.' },
        { status: 400 }
      );
    }

    // Gọi tutor rule-based
    const response = generateTutorResponse(message.trim());

    return NextResponse.json({
      reply: response.content,
      topic_code: response.topic_code || null,
      related_lesson_slug: response.related_lesson_slug || null,
      suggestions: getSuggestions(),
    });
  } catch {
    return NextResponse.json({ error: 'Lỗi server.' }, { status: 500 });
  }
}
