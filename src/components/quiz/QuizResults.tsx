'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Zap,
  Trophy,
  AlertCircle,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  userAnswer: number;
}

interface QuizResultsProps {
  score: number;
  passed: boolean;
  questions: QuizQuestion[];
  xpEarned: number;
  onRetake: () => void;
  onContinue: () => void;
}

// ─── Circular Progress Component ─────────────────────────────────────────────

function CircularProgress({ score, passed }: { score: number; passed: boolean }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = passed ? 'text-green-500' : 'text-red-500';
  const bgColor = passed
    ? 'text-green-100 dark:text-green-900/30'
    : 'text-red-100 dark:text-red-900/30';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          className={`stroke-current ${bgColor}`}
        />
        {/* Progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={`stroke-current ${color}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      {/* Score text in center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className={`text-3xl font-bold ${passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {score}%
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-xs text-slate-500 dark:text-slate-400 mt-0.5"
        >
          Điểm số
        </motion.span>
      </div>
    </div>
  );
}

// ─── Main QuizResults Component ──────────────────────────────────────────────

export default function QuizResults({
  score,
  passed,
  questions,
  xpEarned,
  onRetake,
  onContinue,
}: QuizResultsProps) {
  const correctCount = questions.filter(
    (q) => q.userAnswer === q.correctIndex
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Header: Score + Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={`rounded-2xl border p-6 sm:p-8 text-center mb-6 ${
          passed
            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
        }`}
      >
        {/* Pass/Fail Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="mb-4"
        >
          {passed ? (
            <Trophy className="w-12 h-12 text-green-500 mx-auto" />
          ) : (
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          )}
        </motion.div>

        {/* Status text */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-xl sm:text-2xl font-bold mb-2 ${
            passed
              ? 'text-green-700 dark:text-green-400'
              : 'text-red-700 dark:text-red-400'
          }`}
        >
          {passed ? 'Chúc mừng! Bạn đã vượt qua!' : 'Chưa đạt yêu cầu'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-slate-600 dark:text-slate-400 mb-5"
        >
          {passed
            ? 'Bạn đã nắm vững kiến thức bài học này.'
            : 'Cần đạt tối thiểu 80% để vượt qua. Hãy ôn lại và thử lại nhé!'}
        </motion.p>

        {/* Circular Progress */}
        <CircularProgress score={score} passed={passed} />

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-5"
        >
          <div className="text-center">
            <span className="block text-lg font-semibold text-slate-900 dark:text-white">
              {correctCount}/{questions.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Câu đúng
            </span>
          </div>
          {xpEarned > 0 && (
            <div className="text-center">
              <span className="flex items-center justify-center gap-1 text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                <Zap className="w-4 h-4" />
                +{xpEarned}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                XP nhận được
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Question Review List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="space-y-4 mb-8"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Chi tiết kết quả
        </h3>

        {questions.map((q, index) => {
          const isCorrect = q.userAnswer === q.correctIndex;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.08 }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm"
            >
              {/* Question header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="font-medium text-slate-900 dark:text-white text-sm leading-relaxed">
                  <span className="text-blue-500 mr-1.5">Câu {index + 1}.</span>
                  {q.question}
                </p>
              </div>

              {/* Answer options */}
              <div className="space-y-2 ml-8">
                {q.options.map((option, oIndex) => {
                  const isUserAnswer = q.userAnswer === oIndex;
                  const isCorrectAnswer = q.correctIndex === oIndex;

                  let optionStyle =
                    'border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400';

                  if (isCorrectAnswer) {
                    optionStyle =
                      'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
                  } else if (isUserAnswer && !isCorrect) {
                    optionStyle =
                      'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 line-through';
                  }

                  return (
                    <div
                      key={oIndex}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${optionStyle}`}
                    >
                      <span className="font-medium flex-shrink-0">
                        {String.fromCharCode(65 + oIndex)}.
                      </span>
                      <span>{option}</span>
                      {isCorrectAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />
                      )}
                      {isUserAnswer && !isCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="mt-3 ml-8 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  💡 {q.explanation}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        {!passed && (
          <button
            onClick={onRetake}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-orange-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại
          </button>
        )}
        {passed && (
          <button
            onClick={onContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-green-500/20"
          >
            Tiếp tục
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
