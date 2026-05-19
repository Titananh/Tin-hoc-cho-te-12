import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { awardXP } from '@/lib/gamification';

/**
 * GET /api/flashcards/review
 * Trả về phiên ôn tập hôm nay (tối đa 50 thẻ đến hạn).
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để ôn tập flashcard' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const today = new Date().toISOString().split('T')[0];

    // Lấy flashcard đến hạn ôn tập (có review record)
    const { data: dueReviews, error: reviewError } = await supabaseAdmin
      .from('flashcard_reviews')
      .select(`
        id,
        flashcard_id,
        ease_factor,
        interval_days,
        next_review_date,
        review_count,
        last_reviewed_at,
        flashcards (
          id,
          term,
          definition,
          category,
          difficulty
        )
      `)
      .eq('user_id', userId)
      .lte('next_review_date', today)
      .order('next_review_date', { ascending: true })
      .limit(50);

    if (reviewError) {
      console.error('Lỗi truy vấn review session:', reviewError);
      return NextResponse.json(
        { error: 'Không thể tải phiên ôn tập' },
        { status: 500 }
      );
    }

    // Lấy flashcard mới chưa ôn lần nào
    const reviewedIds = (dueReviews ?? []).map((r) => r.flashcard_id);
    const remainingSlots = 50 - (dueReviews?.length ?? 0);

    let newCards: { id: number; term: string; definition: string; category: string | null; difficulty: string }[] = [];

    if (remainingSlots > 0) {
      // Lấy tất cả flashcard IDs đã có review record cho user này
      const { data: allReviewedIds } = await supabaseAdmin
        .from('flashcard_reviews')
        .select('flashcard_id')
        .eq('user_id', userId);

      const allReviewedSet = new Set(
        (allReviewedIds ?? []).map((r) => r.flashcard_id)
      );

      const { data: unreviewedCards } = await supabaseAdmin
        .from('flashcards')
        .select('id, term, definition, category, difficulty')
        .order('id', { ascending: true })
        .limit(remainingSlots);

      newCards = (unreviewedCards ?? []).filter(
        (fc) => !allReviewedSet.has(fc.id)
      ).slice(0, remainingSlots);
    }

    // Tạo session cards
    const sessionCards = [
      ...(dueReviews ?? []).map((review) => {
        const flashcard = review.flashcards as unknown as {
          id: number;
          term: string;
          definition: string;
          category: string | null;
          difficulty: string;
        };
        return {
          flashcardId: flashcard?.id ?? review.flashcard_id,
          term: flashcard?.term ?? '',
          definition: flashcard?.definition ?? '',
          category: flashcard?.category ?? 'Chung',
          difficulty: flashcard?.difficulty ?? 'beginner',
          isNew: false,
          reviewCount: review.review_count,
          currentInterval: review.interval_days,
        };
      }),
      ...newCards.map((fc) => ({
        flashcardId: fc.id,
        term: fc.term,
        definition: fc.definition,
        category: fc.category ?? 'Chung',
        difficulty: fc.difficulty,
        isNew: true,
        reviewCount: 0,
        currentInterval: 0,
      })),
    ];

    // Kiểm tra nếu không có thẻ nào cần ôn
    if (sessionCards.length === 0) {
      // Tìm ngày ôn tập tiếp theo
      const { data: nextReview } = await supabaseAdmin
        .from('flashcard_reviews')
        .select('next_review_date')
        .eq('user_id', userId)
        .gt('next_review_date', today)
        .order('next_review_date', { ascending: true })
        .limit(1);

      const nextDate = nextReview?.[0]?.next_review_date ?? null;

      return NextResponse.json({
        message: 'Không có thẻ nào cần ôn tập hôm nay',
        nextReviewDate: nextDate,
        cards: [],
        totalCards: 0,
      });
    }

    return NextResponse.json({
      cards: sessionCards,
      totalCards: sessionCards.length,
      newCards: newCards.length,
      reviewCards: (dueReviews?.length ?? 0),
    });
  } catch (error) {
    console.error('Lỗi GET review session:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải phiên ôn tập. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/flashcards/review
 * Ghi nhận kết quả ôn tập và tính toán interval tiếp theo.
 *
 * Body: { flashcardId: number, rating: 'easy' | 'medium' | 'hard' }
 *
 * Interval calculation:
 * - easy: interval × 2.5
 * - medium: interval × 1.5
 * - hard: reset to 1 day
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để ôn tập flashcard' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { flashcardId, rating } = body;

    if (!flashcardId || !rating) {
      return NextResponse.json(
        { error: 'Thiếu thông tin flashcardId hoặc rating' },
        { status: 400 }
      );
    }

    if (!['easy', 'medium', 'hard'].includes(rating)) {
      return NextResponse.json(
        { error: 'Rating phải là easy, medium, hoặc hard' },
        { status: 400 }
      );
    }

    // Kiểm tra flashcard tồn tại
    const { data: flashcard, error: fcError } = await supabaseAdmin
      .from('flashcards')
      .select('id')
      .eq('id', flashcardId)
      .single();

    if (fcError || !flashcard) {
      return NextResponse.json(
        { error: 'Không tìm thấy flashcard' },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    // Lấy review state hiện tại
    const { data: existingReview } = await supabaseAdmin
      .from('flashcard_reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('flashcard_id', flashcardId)
      .single();

    let newIntervalDays: number;
    let newEaseFactor: number;
    let newReviewCount: number;

    if (!existingReview) {
      // Lần đầu ôn tập
      newEaseFactor = 2.5;
      newReviewCount = 1;

      if (rating === 'easy') {
        newIntervalDays = Math.round(1 * 2.5);
      } else if (rating === 'medium') {
        newIntervalDays = Math.round(1 * 1.5);
      } else {
        newIntervalDays = 1;
      }

      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + newIntervalDays);

      await supabaseAdmin.from('flashcard_reviews').insert({
        user_id: userId,
        flashcard_id: flashcardId,
        ease_factor: newEaseFactor,
        interval_days: newIntervalDays,
        next_review_date: nextReviewDate.toISOString().split('T')[0],
        review_count: newReviewCount,
        last_reviewed_at: now,
      });
    } else {
      // Cập nhật review
      const currentInterval = existingReview.interval_days;
      newEaseFactor = existingReview.ease_factor;
      newReviewCount = existingReview.review_count + 1;

      if (rating === 'easy') {
        newIntervalDays = Math.min(Math.round(currentInterval * 2.5), 180);
        newEaseFactor = Math.min(newEaseFactor + 0.1, 5.0);
      } else if (rating === 'medium') {
        newIntervalDays = Math.min(Math.round(currentInterval * 1.5), 180);
      } else {
        newIntervalDays = 1;
        newEaseFactor = Math.max(newEaseFactor - 0.2, 1.3);
      }

      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + newIntervalDays);

      await supabaseAdmin
        .from('flashcard_reviews')
        .update({
          ease_factor: newEaseFactor,
          interval_days: newIntervalDays,
          next_review_date: nextReviewDate.toISOString().split('T')[0],
          review_count: newReviewCount,
          last_reviewed_at: now,
        })
        .eq('id', existingReview.id);
    }

    // Kiểm tra nếu đã ôn hết tất cả thẻ hôm nay -> trao 5 XP
    const today = new Date().toISOString().split('T')[0];
    const { count: remainingDue } = await supabaseAdmin
      .from('flashcard_reviews')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .lte('next_review_date', today);

    let sessionComplete = false;
    if ((remainingDue ?? 0) === 0) {
      // Tất cả thẻ đã ôn xong - trao XP
      sessionComplete = true;
      try {
        await awardXP(userId, 5, 'Hoàn thành phiên ôn tập flashcard');
      } catch {
        // Không block response nếu XP award thất bại
      }
    }

    return NextResponse.json({
      message: 'Đã ghi nhận kết quả ôn tập',
      flashcardId,
      rating,
      nextInterval: newIntervalDays,
      easeFactor: newEaseFactor,
      reviewCount: newReviewCount,
      sessionComplete,
    });
  } catch (error) {
    console.error('Lỗi POST review:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi ghi nhận kết quả. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
