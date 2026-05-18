'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { exams } from '@/data/exams';
import { QuizQuestion } from '@/types';
import { Clock, CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';

type ExamState = 'intro' | 'doing' | 'result';

export default function ExamDoingPage() {
  const params = useParams();
  const examSlug = params.examId as string;

  const exam = exams.find(e => e.slug === examSlug || e.id === examSlug);

  const [state, setState] = useState<ExamState>('intro');
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  // Timer
  useEffect(() => {
    if (state !== 'doing' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  const startExam = useCallback(() => {
    if (!exam) return;
    setAnswers(new Array(exam.questions.length).fill(null));
    setTimeLeft(exam.duration_minutes * 60);
    setCurrentQ(0);
    setState('doing');
  }, [exam]);

  const selectAnswer = (qIdx: number, optIdx: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  const submitExam = () => {
    setState('result');
  };

  const resetExam = () => {
    setState('intro');
    setAnswers([]);
    setTimeLeft(0);
    setCurrentQ(0);
    setShowExplanation(null);
  };

  if (!exam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Không tìm thấy đề thi</h1>
          <Link href="/de-thi" className="text-primary hover:underline">← Quay lại danh sách đề</Link>
        </div>
      </div>
    );
  }

  // Tính điểm
  const correctCount = answers.reduce((acc, ans, idx) => {
    if (ans === exam.questions[idx].correct_index) return acc + 1;
    return acc;
  }, 0);
  const score = Math.round((correctCount / exam.questions.length) * 100);
  const passed = score >= exam.passing_score;

  // Format thời gian
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // === INTRO ===
  if (state === 'intro') {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/de-thi" className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6">
            <ArrowLeft size={16} /> Quay lại
          </Link>

          <div className="bg-surface rounded-2xl p-8 border border-border text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">{exam.title}</h1>
            <p className="text-muted mb-6">{exam.description}</p>

            <div className="flex justify-center gap-6 mb-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{exam.duration_minutes} phút</span>
              </div>
              <div>📝 {exam.questions.length} câu</div>
              <div>🎯 Đạt: ≥ {exam.passing_score}%</div>
            </div>

            <div className="bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 rounded-lg p-4 mb-6 text-sm text-left">
              <strong>⚠️ Lưu ý:</strong>
              <ul className="mt-2 space-y-1 ml-4 list-disc">
                <li>Bấm "Bắt đầu" sẽ bắt đầu đếm ngược thời gian.</li>
                <li>Hết giờ sẽ tự động nộp bài.</li>
                <li>Có thể quay lại câu trước để sửa đáp án.</li>
              </ul>
            </div>

            <button
              onClick={startExam}
              className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              🚀 Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>
    );
  }

  // === DOING ===
  if (state === 'doing') {
    const question = exam.questions[currentQ];
    const answeredCount = answers.filter(a => a !== null).length;

    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Timer bar */}
          <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-sm pb-4">
            <div className="flex items-center justify-between bg-surface rounded-xl p-3 border border-border">
              <span className="text-sm text-muted">
                Câu {currentQ + 1}/{exam.questions.length} • Đã trả lời: {answeredCount}
              </span>
              <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 300 ? 'text-red-500' : 'text-foreground'}`}>
                <Clock size={16} />
                {formatTime(timeLeft)}
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(answeredCount / exam.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface rounded-2xl p-6 border border-border mt-4"
          >
            <p className="text-lg font-semibold text-foreground mb-6">
              <span className="text-primary mr-2">Câu {currentQ + 1}.</span>
              {question.question}
            </p>

            <div className="space-y-3">
              {question.options.map((opt, optIdx) => {
                const selected = answers[currentQ] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(currentQ, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selected
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-border hover:border-primary/30 text-muted hover:text-foreground'
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-foreground disabled:opacity-30"
            >
              ← Câu trước
            </button>

            {currentQ < exam.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90"
              >
                Câu sau →
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="px-6 py-2 rounded-lg text-sm font-bold bg-green-600 text-white hover:bg-green-700"
              >
                ✅ Nộp bài
              </button>
            )}
          </div>

          {/* Quick nav */}
          <div className="mt-6 bg-surface rounded-xl p-4 border border-border">
            <p className="text-xs text-muted mb-2">Nhảy tới câu:</p>
            <div className="flex flex-wrap gap-1.5">
              {exam.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                    i === currentQ
                      ? 'bg-primary text-white'
                      : answers[i] !== null
                      ? 'bg-green-500/20 text-green-600'
                      : 'bg-border/50 text-muted hover:bg-border'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RESULT ===
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Score card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface rounded-2xl p-8 border border-border text-center mb-8"
        >
          <div className={`text-6xl font-bold mb-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>
            {score}%
          </div>
          <p className="text-lg text-foreground mb-1">
            {passed ? '🎉 Chúc mừng! Bạn đã ĐẠT!' : '😢 Chưa đạt. Hãy cố gắng thêm!'}
          </p>
          <p className="text-muted">
            Đúng {correctCount}/{exam.questions.length} câu
            {timeLeft > 0 && ` • Còn dư ${formatTime(timeLeft)}`}
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={resetExam}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium"
            >
              <RotateCcw size={16} /> Làm lại
            </button>
            <Link
              href="/de-thi"
              className="flex items-center gap-2 px-5 py-2 rounded-lg border border-border text-muted hover:text-foreground font-medium"
            >
              Chọn đề khác
            </Link>
          </div>
        </motion.div>

        {/* Review từng câu */}
        <h2 className="text-xl font-bold text-foreground mb-4">Xem lại đáp án</h2>
        <div className="space-y-4">
          {exam.questions.map((q: QuizQuestion, idx: number) => {
            const userAns = answers[idx];
            const isCorrect = userAns === q.correct_index;

            return (
              <div key={q.id} className={`bg-surface rounded-xl p-5 border ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                      Câu {idx + 1}: {q.question}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      Bạn chọn: <strong>{userAns !== null ? String.fromCharCode(65 + userAns) : '(bỏ trống)'}</strong>
                      {!isCorrect && (
                        <> • Đáp án đúng: <strong className="text-green-600">{String.fromCharCode(65 + q.correct_index)}</strong></>
                      )}
                    </p>

                    {/* Toggle explanation */}
                    <button
                      onClick={() => setShowExplanation(showExplanation === idx ? null : idx)}
                      className="text-xs text-primary hover:underline mt-1"
                    >
                      {showExplanation === idx ? 'Ẩn giải thích' : 'Xem giải thích'}
                    </button>
                    {showExplanation === idx && (
                      <p className="text-xs text-muted mt-2 p-2 bg-background rounded-lg">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
