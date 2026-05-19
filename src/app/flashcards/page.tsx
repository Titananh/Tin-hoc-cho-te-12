'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import {
  RotateCcw,
  CheckCircle,
  Zap,
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface FlashcardData {
  flashcardId: number;
  term: string;
  definition: string;
  category: string;
  difficulty: string;
  isNew: boolean;
  reviewCount: number;
  currentInterval: number;
}

interface ReviewSession {
  cards: FlashcardData[];
  totalCards: number;
  newCards: number;
  reviewCards: number;
  message?: string;
  nextReviewDate?: string | null;
}

export default function FlashcardsPage() {
  const { theme } = useTheme();
  const [session, setSession] = useState<ReviewSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch review session
  const fetchSession = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/flashcards/review');
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setError('Bạn cần đăng nhập để ôn tập flashcard');
          return;
        }
        setError(data.error || 'Không thể tải phiên ôn tập');
        return;
      }

      setSession(data);
    } catch {
      setError('Đã xảy ra lỗi khi tải phiên ôn tập');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  // Handle card flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle rating
  const handleRate = async (rating: 'easy' | 'medium' | 'hard') => {
    if (!session || isSubmitting) return;

    const currentCard = session.cards[currentIndex];
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/flashcards/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flashcardId: currentCard.flashcardId,
          rating,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setReviewedCount((prev) => prev + 1);

        if (data.sessionComplete) {
          setXpEarned(5);
          setSessionComplete(true);
        } else if (currentIndex < session.cards.length - 1) {
          // Move to next card
          setCurrentIndex((prev) => prev + 1);
          setIsFlipped(false);
        } else {
          // All cards reviewed in this batch
          setSessionComplete(true);
          setXpEarned(5);
        }
      }
    } catch {
      // Silently handle error, user can retry
    } finally {
      setIsSubmitting(false);
    }
  };

  // Current card
  const currentCard = session?.cards?.[currentIndex];

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Brain
            className={`w-10 h-10 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}
          />
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}
      >
        <div className="text-center px-4">
          <p
            className={`text-lg mb-4 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {error}
          </p>
          <button
            onClick={fetchSession}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // No cards due
  if (session && session.cards.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 max-w-md"
        >
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 ${
              theme === 'dark'
                ? 'bg-green-500/20 border border-green-500/30'
                : 'bg-green-500/10 border border-green-200 shadow-xl'
            } backdrop-blur-xl`}
          >
            <CheckCircle
              className={`w-10 h-10 ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}
            />
          </div>
          <h2
            className={`text-2xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Không có thẻ cần ôn tập
          </h2>
          <p
            className={`text-base mb-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {session.message || 'Bạn đã ôn tập xong tất cả thẻ hôm nay!'}
          </p>
          {session.nextReviewDate && (
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
              }`}
            >
              Lần ôn tập tiếp theo: {new Date(session.nextReviewDate).toLocaleDateString('vi-VN')}
            </p>
          )}
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Về Dashboard
          </a>
        </motion.div>
      </div>
    );
  }

  // Session complete
  if (sessionComplete) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center px-4 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', delay: 0.2 }}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-6 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                : 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-200 shadow-xl'
            } backdrop-blur-xl`}
          >
            <Sparkles
              className={`w-12 h-12 ${
                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
              }`}
            />
          </motion.div>

          <h2
            className={`text-2xl font-bold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
          >
            Hoàn thành phiên ôn tập!
          </h2>
          <p
            className={`text-base mb-4 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Bạn đã ôn tập {reviewedCount} thẻ trong phiên này.
          </p>

          {xpEarned > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                theme === 'dark'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="font-semibold">+{xpEarned} XP</span>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Về Dashboard
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main review UI
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
      }`}
    >
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/20'
          }`}
        />
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/20'
          }`}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              Ôn tập Flashcard
            </h1>
            <p
              className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {currentCard?.category ?? 'Chung'}
            </p>
          </div>

          {/* Progress indicator */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              theme === 'dark'
                ? 'bg-white/10 text-slate-300'
                : 'bg-white/80 text-slate-700 shadow-sm border border-slate-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">
              {reviewedCount + 1}/{session?.totalCards ?? 0}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          className={`w-full h-2 rounded-full mb-8 ${
            theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'
          }`}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{
              width: `${((reviewedCount) / (session?.totalCards ?? 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Flashcard */}
        {currentCard && (
          <div className="perspective-1000 mb-8">
            <motion.div
              className="relative w-full cursor-pointer"
              onClick={handleFlip}
              style={{ minHeight: '300px' }}
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -180, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`w-full p-8 rounded-2xl flex flex-col items-center justify-center text-center backdrop-blur-xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10'
                        : 'bg-white/80 border border-white/20 shadow-xl'
                    }`}
                    style={{ minHeight: '300px' }}
                  >
                    <p
                      className={`text-xs uppercase tracking-wider mb-4 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Thuật ngữ
                    </p>
                    <p
                      className={`text-xl md:text-2xl font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {currentCard.term}
                    </p>
                    <p
                      className={`text-sm mt-6 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Nhấn để lật thẻ
                    </p>
                    {currentCard.isNew && (
                      <span
                        className={`absolute top-4 right-4 px-2 py-1 text-xs rounded-full ${
                          theme === 'dark'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        Mới
                      </span>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ rotateY: -180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 180, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`w-full p-8 rounded-2xl flex flex-col items-center justify-center text-center backdrop-blur-xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-white/10'
                        : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 shadow-xl'
                    }`}
                    style={{ minHeight: '300px' }}
                  >
                    <p
                      className={`text-xs uppercase tracking-wider mb-4 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Định nghĩa
                    </p>
                    <p
                      className={`text-lg md:text-xl leading-relaxed ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      {currentCard.definition}
                    </p>
                    <p
                      className={`text-sm mt-6 ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Nhấn để lật lại
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Rating Buttons - Only show when flipped */}
        <AnimatePresence>
          {isFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={() => handleRate('hard')}
                disabled={isSubmitting}
                className={`flex-1 max-w-[140px] px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                } disabled:opacity-50`}
              >
                <span className="text-lg">😓</span>
                <p className="text-sm mt-1">Khó</p>
              </button>

              <button
                onClick={() => handleRate('medium')}
                disabled={isSubmitting}
                className={`flex-1 max-w-[140px] px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
                } disabled:opacity-50`}
              >
                <span className="text-lg">🤔</span>
                <p className="text-sm mt-1">Trung Bình</p>
              </button>

              <button
                onClick={() => handleRate('easy')}
                disabled={isSubmitting}
                className={`flex-1 max-w-[140px] px-6 py-4 rounded-xl font-medium transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                    : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                } disabled:opacity-50`}
              >
                <span className="text-lg">😊</span>
                <p className="text-sm mt-1">Dễ</p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flip hint when not flipped */}
        {!isFlipped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-4"
          >
            <button
              onClick={handleFlip}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-white/10'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Lật thẻ để xem đáp án
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
