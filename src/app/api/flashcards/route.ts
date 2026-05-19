import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/flashcards
 * Trả về danh sách flashcard cần ôn tập hôm nay (dựa trên SM-2 algorithm),
 * được tổ chức theo chủ đề (category).
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Bạn cần đăng nhập để xem flashcard' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const today = new Date().toISOString().split('T')[0];

    // Lấy flashcard đã có review record và đến hạn ôn tập
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
      .order('next_review_date', { ascending: true });

    if (reviewError) {
      console.error('Lỗi truy vấn flashcard reviews:', reviewError);
      return NextResponse.json(
        { error: 'Không thể tải danh sách flashcard' },
        { status: 500 }
      );
    }

    // Lấy flashcard chưa có review record (flashcard mới chưa ôn lần nào)
    const reviewedFlashcardIds = (dueReviews ?? []).map((r) => r.flashcard_id);

    const { data: newFlashcards, error: newError } = await supabaseAdmin
      .from('flashcards')
      .select('id, term, definition, category, difficulty')
      .order('id', { ascending: true });

    if (newError) {
      console.error('Lỗi truy vấn flashcards:', newError);
    }

    // Lọc flashcard chưa có review record
    const unreviewedCards = (newFlashcards ?? []).filter(
      (fc) => !reviewedFlashcardIds.includes(fc.id)
    );

    // Tổ chức theo category
    type FlashcardItem = {
      id: number;
      term: string;
      definition: string;
      category: string | null;
      difficulty: string;
      reviewState: {
        easeFactor: number;
        intervalDays: number;
        nextReviewDate: string;
        reviewCount: number;
        lastReviewedAt: string | null;
      } | null;
    };

    const allDueCards: FlashcardItem[] = [];

    // Cards đến hạn ôn tập
    for (const review of dueReviews ?? []) {
      const flashcard = review.flashcards as unknown as {
        id: number;
        term: string;
        definition: string;
        category: string | null;
        difficulty: string;
      };
      if (!flashcard) continue;

      allDueCards.push({
        id: flashcard.id,
        term: flashcard.term,
        definition: flashcard.definition,
        category: flashcard.category,
        difficulty: flashcard.difficulty,
        reviewState: {
          easeFactor: review.ease_factor,
          intervalDays: review.interval_days,
          nextReviewDate: review.next_review_date,
          reviewCount: review.review_count,
          lastReviewedAt: review.last_reviewed_at,
        },
      });
    }

    // Cards mới (chưa ôn lần nào)
    for (const fc of unreviewedCards) {
      allDueCards.push({
        id: fc.id,
        term: fc.term,
        definition: fc.definition,
        category: fc.category,
        difficulty: fc.difficulty,
        reviewState: null,
      });
    }

    // Nhóm theo category
    const byCategory: Record<string, FlashcardItem[]> = {};
    for (const card of allDueCards) {
      const cat = card.category ?? 'Chung';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(card);
    }

    return NextResponse.json({
      totalDue: allDueCards.length,
      byCategory,
    });
  } catch (error) {
    console.error('Lỗi API flashcards:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi tải flashcard. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/flashcards
 * Ghi nhận kết quả ôn tập flashcard.
 * Cập nhật next_review_date dựa trên rating (easy/medium/hard).
 *
 * Body: { flashcardId: number, rating: 'easy' | 'medium' | 'hard' }
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

    // Lấy review state hiện tại
    const { data: existingReview } = await supabaseAdmin
      .from('flashcard_reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('flashcard_id', flashcardId)
      .single();

    const now = new Date().toISOString();
    let newIntervalDays: number;
    let newEaseFactor: number;

    if (!existingReview) {
      // Lần đầu ôn tập - tạo record mới
      newEaseFactor = 2.5;
      if (rating === 'easy') {
        newIntervalDays = Math.round(1 * 2.5); // 2-3 ngày
      } else if (rating === 'medium') {
        newIntervalDays = Math.round(1 * 1.5); // 1-2 ngày
      } else {
        newIntervalDays = 1; // Reset về 1 ngày
      }

      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + newIntervalDays);

      await supabaseAdmin.from('flashcard_reviews').insert({
        user_id: userId,
        flashcard_id: flashcardId,
        ease_factor: newEaseFactor,
        interval_days: newIntervalDays,
        next_review_date: nextReviewDate.toISOString().split('T')[0],
        review_count: 1,
        last_reviewed_at: now,
      });
    } else {
      // Cập nhật review state
      const currentInterval = existingReview.interval_days;
      newEaseFactor = existingReview.ease_factor;

      if (rating === 'easy') {
        newIntervalDays = Math.min(Math.round(currentInterval * 2.5), 180);
        newEaseFactor = Math.min(newEaseFactor + 0.1, 5.0);
      } else if (rating === 'medium') {
        newIntervalDays = Math.min(Math.round(currentInterval * 1.5), 180);
        // ease_factor không đổi
      } else {
        // hard - reset interval về 1 ngày
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
          review_count: existingReview.review_count + 1,
          last_reviewed_at: now,
        })
        .eq('id', existingReview.id);
    }

    return NextResponse.json({
      message: 'Đã ghi nhận kết quả ôn tập',
      flashcardId,
      rating,
      nextInterval: newIntervalDays,
      easeFactor: newEaseFactor,
    });
  } catch (error) {
    console.error('Lỗi POST flashcards:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi ghi nhận kết quả. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
