import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/search?q=query
 * Tìm kiếm nội dung trên toàn hệ thống.
 * Tìm trong: lessons (title, description), exercises (title, description), flashcards (term, definition).
 * Yêu cầu đăng nhập.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để tìm kiếm' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query || query.length === 0) {
      return NextResponse.json(
        { error: 'Vui lòng nhập từ khóa tìm kiếm' },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json(
        { error: 'Từ khóa tìm kiếm phải có ít nhất 2 ký tự' },
        { status: 400 }
      );
    }

    // Tìm kiếm song song trong các bảng
    const searchPattern = `%${query}%`;

    const [lessonsResult, exercisesResult, flashcardsResult] = await Promise.all([
      // Tìm trong lessons
      supabaseAdmin
        .from('lessons')
        .select('id, title, content, chapter_id, difficulty, xp_reward')
        .eq('is_published', true)
        .or(`title.ilike.${searchPattern},content.ilike.${searchPattern}`)
        .limit(10),

      // Tìm trong exercises
      supabaseAdmin
        .from('exercises')
        .select('id, title, description, difficulty, xp_reward, lesson_id')
        .eq('is_published', true)
        .or(`title.ilike.${searchPattern},description.ilike.${searchPattern}`)
        .limit(10),

      // Tìm trong flashcards
      supabaseAdmin
        .from('flashcards')
        .select('id, term, definition, category, difficulty')
        .or(`term.ilike.${searchPattern},definition.ilike.${searchPattern}`)
        .limit(10),
    ]);

    // Format kết quả theo category
    const lessons = (lessonsResult.data ?? []).map((lesson) => ({
      id: lesson.id,
      type: 'lesson' as const,
      title: lesson.title,
      description: lesson.content?.substring(0, 150) + '...',
      difficulty: lesson.difficulty,
      xp_reward: lesson.xp_reward,
      url: `/learn/${lesson.chapter_id}/lessons/${lesson.id}`,
    }));

    const exercises = (exercisesResult.data ?? []).map((exercise) => ({
      id: exercise.id,
      type: 'exercise' as const,
      title: exercise.title,
      description: exercise.description?.substring(0, 150) + '...',
      difficulty: exercise.difficulty,
      xp_reward: exercise.xp_reward,
      url: `/learn/exercises/${exercise.id}`,
    }));

    const flashcards = (flashcardsResult.data ?? []).map((card) => ({
      id: card.id,
      type: 'flashcard' as const,
      title: card.term,
      description: card.definition?.substring(0, 150) + '...',
      category: card.category,
      difficulty: card.difficulty,
    }));

    const totalResults = lessons.length + exercises.length + flashcards.length;

    return NextResponse.json({
      query,
      totalResults,
      results: {
        lessons,
        exercises,
        flashcards,
      },
      message: totalResults > 0
        ? `Tìm thấy ${totalResults} kết quả cho "${query}"`
        : `Không tìm thấy kết quả nào cho "${query}"`,
    });
  } catch (error) {
    console.error('Lỗi API search:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
