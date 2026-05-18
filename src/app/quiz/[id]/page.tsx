'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  X as XIcon,
  RotateCcw,
  ArrowLeft,
  Target,
  AlertTriangle,
  Eye,
  BookOpen,
  Timer,
  Zap,
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndexes: number[];
  explanation?: string;
  type?: 'single' | 'multiple';
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  timeLimit?: number;
  questions: QuizQuestion[];
  passingScore?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: (number | null | number[])[];
  startedAt: string;
  completedAt: string;
  timeSpent: number;
  isPassed: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockQuiz: Quiz = {
  id: 'quiz-1',
  title: 'Kiểm tra Python cơ bản',
  description: 'Ôn tập các khái niệm Python căn bản',
  timeLimit: 600,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'Kết quả của print(type(3.14)) là gì?',
      options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'bool\'>'],
      correctIndexes: [1],
      explanation: '3.14 là số thập phân (float) trong Python.',
      type: 'single',
    },
    {
      id: 'q2',
      question: 'Which of the following are valid ways to create a list in Python?',
      options: ['[1, 2, 3]', 'list()', '{1, 2, 3}', 'list((1, 2, 3))'],
      correctIndexes: [0, 1, 3],
      explanation: '[1, 2, 3] là list literal, list() tạo empty list, list((1, 2, 3)) chuyển tuple thành list. {1, 2, 3} tạo set, không phải list.',
      type: 'multiple',
    },
    {
      id: 'q3',
      question: 'What is the output of: bool("False")?',
      options: ['True', 'False', 'Error', 'None'],
      correctIndexes: [0],
      explanation: '"False" là một string không rỗng, nên bool("False") trả về True.',
      type: 'single',
    },
    {
      id: 'q4',
      question: 'Python supports multiple inheritance.',
      options: ['True', 'False'],
      correctIndexes: [0],
      explanation: 'Python cho phép một class kế thừa từ nhiều class khác (multiple inheritance).',
      type: 'single',
    },
    {
      id: 'q5',
      question: 'Which methods can modify a list in-place?',
      options: ['append()', 'extend()', 'slice assignment', 'index()'],
      correctIndexes: [0, 1, 2],
      explanation: 'append() thêm phần tử, extend() thêm nhiều phần tử, slice assignment thay thế một phần của list. index() chỉ trả về vị trí, không sửa đổi list.',
      type: 'multiple',
    },
  ],
};

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const STORAGE_KEY = 'python-master-quiz-attempts';

function getStoredAttempts(): Record<string, QuizAttempt[]> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveAttempt(quizId: string, attempt: QuizAttempt): void {
  const attempts = getStoredAttempts();
  if (!attempts[quizId]) {
    attempts[quizId] = [];
  }
  attempts[quizId].unshift(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

// ============================================================================
// ANIMATIONS
// ============================================================================

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ============================================================================
// CONFETTI COMPONENT
// ============================================================================

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
      }));
      setParticles(newParticles);

      const interval = setInterval(() => {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.velocityX,
              y: p.y + p.velocityY,
              rotation: p.rotation + 5,
            }))
            .filter((p) => p.y < 120)
        );
      }, 50);

      setTimeout(() => clearInterval(interval), 3000);
      return () => clearInterval(interval);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, y: -20 }}
          animate={{
            opacity: 0,
            y: '100vh',
            rotate: p.rotation + 360,
          }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}vh`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// PROGRESS BAR COMPONENT
// ============================================================================

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Câu {current + 1} / {total}
        </span>
        <span className="text-sm font-medium">{Math.round(percentage)}% hoàn thành</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// TIMER COMPONENT
// ============================================================================

interface QuizTimerProps {
  seconds: number;
  onWarning: boolean;
  onTimeUp: boolean;
}

function QuizTimer({ seconds, onWarning, onTimeUp }: QuizTimerProps) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const timerClasses = onTimeUp
    ? 'bg-error/10 text-error border-error'
    : onWarning
    ? 'bg-warning/10 text-warning border-warning animate-pulse'
    : 'bg-muted text-foreground border-border';

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-mono font-bold ${timerClasses}`}
    >
      <Clock className="w-5 h-5" />
      <span>
        {minutes.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </motion.div>
  );
}

// ============================================================================
// OPTION BUTTON COMPONENT
// ============================================================================

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isRevealed: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function OptionButton({
  option,
  index,
  isSelected,
  isCorrect,
  isWrong,
  isRevealed,
  onClick,
  disabled,
}: OptionButtonProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getStyles = () => {
    if (isRevealed) {
      if (isCorrect) return 'bg-success/10 border-success text-success';
      if (isWrong) return 'bg-error/10 border-error text-error';
    }
    if (isSelected) return 'bg-primary/10 border-primary text-primary';
    return 'bg-transparent border-border hover:border-primary/50 hover:bg-primary/5';
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || isRevealed}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
        disabled:cursor-default text-left
        ${getStyles()}
      `}
    >
      <div
        className={`
          w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
          ${isRevealed && isCorrect ? 'bg-success text-white' :
            isRevealed && isWrong ? 'bg-error text-white' :
            isSelected ? 'bg-primary text-white' : 'bg-muted/20 text-muted-foreground'}
        `}
      >
        {letters[index]}
      </div>
      <span className="flex-1 font-medium">{option}</span>
      {isRevealed && isCorrect && <Check className="w-5 h-5 text-success" />}
      {isRevealed && isWrong && <XIcon className="w-5 h-5 text-error" />}
      {!isRevealed && isSelected && (
        <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary" />
      )}
    </motion.button>
  );
}

// ============================================================================
// CHECKBOX OPTION COMPONENT
// ============================================================================

interface CheckboxOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isRevealed: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

function CheckboxOption({
  option,
  index,
  isSelected,
  isCorrect,
  isWrong,
  isRevealed,
  onToggle,
  disabled,
}: CheckboxOptionProps) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getStyles = () => {
    if (isRevealed) {
      if (isCorrect) return 'bg-success/10 border-success';
      if (isWrong) return 'bg-error/10 border-error';
    }
    if (isSelected) return 'bg-primary/10 border-primary';
    return 'bg-transparent border-border hover:border-primary/50 hover:bg-primary/5';
  };

  const indicatorClasses = isRevealed && isCorrect
    ? 'bg-success border-success'
    : isRevealed && isWrong
    ? 'bg-error border-error'
    : isSelected
    ? 'bg-primary border-primary'
    : 'bg-transparent border-2 border-muted-foreground';

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      disabled={disabled || isRevealed}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
        disabled:cursor-default text-left
        ${getStyles()}
      `}
    >
      <div className="relative w-6 h-6 shrink-0">
        <div className={`absolute inset-0 rounded-md ${indicatorClasses}`}>
          {isSelected && <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
        </div>
      </div>
      <div className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center font-bold text-sm shrink-0 text-muted-foreground">
        {letters[index]}
      </div>
      <span className="flex-1 font-medium">{option}</span>
    </motion.button>
  );
}

// ============================================================================
// QUESTION CARD COMPONENT
// ============================================================================

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswers: number[];
  direction: number;
  onSelectAnswer: (index: number) => void;
  onDeselectAnswer: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswers,
  direction,
  onSelectAnswer,
  onDeselectAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const handleOptionClick = (index: number) => {
    if (question.type === 'multiple') {
      if (selectedAnswers.includes(index)) {
        onDeselectAnswer(index);
      } else {
        onSelectAnswer(index);
      }
    } else {
      onSelectAnswer(index);
    }
  };

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {question.type === 'multiple' ? 'Nhiều đáp án' : 'Một đáp án'}
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) =>
            question.type === 'multiple' ? (
              <CheckboxOption
                key={index}
                option={option}
                index={index}
                isSelected={selectedAnswers.includes(index)}
                isCorrect={question.correctIndexes.includes(index)}
                isWrong={selectedAnswers.includes(index) && !question.correctIndexes.includes(index)}
                isRevealed={false}
                onToggle={() => handleOptionClick(index)}
              />
            ) : (
              <OptionButton
                key={index}
                option={option}
                index={index}
                isSelected={selectedAnswers.includes(index)}
                isCorrect={question.correctIndexes.includes(index)}
                isWrong={selectedAnswers.includes(index) && !question.correctIndexes.includes(index)}
                isRevealed={false}
                onClick={() => handleOptionClick(index)}
              />
            )
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
            ${isFirst ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'hover:bg-muted text-foreground'}
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Trước
        </button>

        <button
          onClick={onNext}
          disabled={isLast}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
            ${isLast ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'hover:bg-muted text-foreground'}
          `}
        >
          Sau
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// RESULTS SCREEN COMPONENT
// ============================================================================

interface ResultsScreenProps {
  quiz: Quiz;
  answers: (number | number[])[];
  timeSpent: number;
  onRetry: () => void;
  onReview: () => void;
  onBack: () => void;
}

function ResultsScreen({
  quiz,
  answers,
  timeSpent,
  onRetry,
  onReview,
  onBack,
}: ResultsScreenProps) {
  const score = quiz.questions.reduce((acc, q, idx) => {
    const userAnswer = answers[idx];
    if (Array.isArray(userAnswer)) {
      const correct = Array.isArray(q.correctIndexes) ? q.correctIndexes : [q.correctIndexes];
      return acc + (userAnswer.length === correct.length && userAnswer.every(a => correct.includes(a)) ? 1 : 0);
    }
    return acc;
  }, 0);
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const isPassed = percentage >= (quiz.passingScore || 70);
  const isPerfect = percentage === 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const correctCount = score;
  const incorrectCount = total - score;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Confetti active={isPerfect || isPassed} />

      {/* Score Card */}
      <div className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className={`
            w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-4
            ${isPassed ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}
          `}
        >
          {percentage}%
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold mb-2"
        >
          {isPerfect ? '🎉 Xuất sắc!' : isPassed ? '✅ Đạt rồi!' : '💪 Cố gắng hơn!'}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-6"
        >
          Bạn trả lời đúng {correctCount}/{total} câu
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-muted-foreground" />
            <span>Thời gian: {formatTime(timeSpent)}</span>
          </div>
          {quiz.timeLimit && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span>Giới hạn: {formatTime(quiz.timeLimit)}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        <div className="bg-success/5 border border-success/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-success">{correctCount}</div>
          <div className="text-sm text-muted-foreground">Câu đúng</div>
        </div>
        <div className="bg-error/5 border border-error/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-error">{incorrectCount}</div>
          <div className="text-sm text-muted-foreground">Câu sai</div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border font-medium hover:bg-muted/50 transition-all w-full sm:w-auto"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay về
        </button>
        <button
          onClick={onReview}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-all w-full sm:w-auto"
        >
          <Eye className="w-5 h-5" />
          Xem lại
        </button>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all w-full sm:w-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Làm lại
        </button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// REVIEW SCREEN COMPONENT
// ============================================================================

interface ReviewScreenProps {
  quiz: Quiz;
  answers: (number | number[])[];
  onBack: () => void;
  onRetry: () => void;
}

function ReviewScreen({ quiz, answers, onBack, onRetry }: ReviewScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const question = quiz.questions[currentIndex];
  const userAnswer = answers[currentIndex];
  const selectedAnswers = Array.isArray(userAnswer) ? userAnswer : userAnswer !== null ? [userAnswer] : [];

  const isCorrect = useMemo(() => {
    const correct = Array.isArray(question.correctIndexes) ? question.correctIndexes : [question.correctIndexes];
    return selectedAnswers.length === correct.length && selectedAnswers.every(a => correct.includes(a));
  }, [selectedAnswers, question.correctIndexes]);

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getIndicatorClass = (index: number) => {
    const q = quiz.questions[index];
    const ans = answers[index];
    const selected = Array.isArray(ans) ? ans : ans !== null ? [ans] : [];
    const correct = Array.isArray(q.correctIndexes) ? q.correctIndexes : [q.correctIndexes];
    const isQCorrect = selected.length === correct.length && selected.every(a => correct.includes(a));

    if (index === currentIndex) return 'bg-primary ring-2 ring-primary/50';
    if (isQCorrect) return 'bg-success';
    return 'bg-error';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại kết quả
        </button>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {quiz.questions.length}
        </div>
      </div>

      {/* Progress indicators */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {quiz.questions.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full shrink-0 ${getIndicatorClass(index)}`}
          />
        ))}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
              }`}
            >
              {isCorrect ? '✓ Đúng' : '✗ Sai'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              {question.type === 'multiple' ? 'Nhiều đáp án' : 'Một đáp án'}
            </span>
          </div>

          <h3 className="text-lg font-semibold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers.includes(index);
              const isCorrectAnswer = question.correctIndexes.includes(index);

              return (
                <div
                  key={index}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border-2
                    ${isCorrectAnswer ? 'bg-success/10 border-success' : ''}
                    ${isSelected && !isCorrectAnswer ? 'bg-error/10 border-error' : ''}
                    ${!isSelected && !isCorrectAnswer ? 'border-border' : ''}
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
                      ${isCorrectAnswer ? 'bg-success text-white' : 'bg-muted/20 text-muted-foreground'}
                    `}
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F'][index]}
                  </div>
                  <span className="flex-1 font-medium">{option}</span>
                  {isCorrectAnswer && <Check className="w-5 h-5 text-success" />}
                  {isSelected && !isCorrectAnswer && <XIcon className="w-5 h-5 text-error" />}
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {question.explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
            ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'hover:bg-muted text-foreground'}
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Trước
        </button>

        {currentIndex === quiz.questions.length - 1 ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
          >
            Quay về kết quả
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={currentIndex === quiz.questions.length - 1}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all
              ${currentIndex === quiz.questions.length - 1 ? 'opacity-50 cursor-not-allowed text-muted-foreground' : 'hover:bg-muted text-foreground'}
            `}
          >
            Sau
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN QUIZ PAGE COMPONENT
// ============================================================================

type QuizState = 'start' | 'taking' | 'results' | 'review';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [quiz] = useState<Quiz>(mockQuiz);
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<(number | number[])[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isWarning, setIsWarning] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === quiz.questions.length - 1;
  const currentQuestion = quiz.questions[currentIndex];
  const selectedAnswers = answers[currentIndex] || [];

  // Initialize answers when quiz starts
  useEffect(() => {
    if (quizState === 'start' || quizState === 'taking') {
      setAnswers(new Array(quiz.questions.length).fill(null));
      setTimeRemaining(quiz.timeLimit || 0);
      setTimeSpent(0);
      setCurrentIndex(0);
      setIsWarning(false);
      setIsTimeUp(false);
    }
  }, [quizState, quiz.timeLimit, quiz.questions.length]);

  // Timer effect
  useEffect(() => {
    if (quizState !== 'taking' || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          handleSubmit();
          return 0;
        }
        if (prev <= 300) {
          setIsWarning(true);
        }
        return prev - 1;
      });
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizState]);

  const handleStart = () => {
    setQuizState('taking');
  };

  const handleSelectAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = [index];
    setAnswers(newAnswers);
  };

  const handleDeselectAnswer = (index: number) => {
    const current = answers[currentIndex];
    if (Array.isArray(current)) {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = current.filter(a => a !== index);
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (isLast) return;
    setDirection(1);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentIndex(prev => prev - 1);
  };

  const handleSubmit = useCallback(() => {
    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      score: calculateScore(),
      totalQuestions: quiz.questions.length,
      answers: answers,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      timeSpent: timeSpent,
      isPassed: calculateScore() >= (quiz.passingScore || 70),
    };
    saveAttempt(quiz.id, attempt);
    setQuizState('results');
  }, [answers, quiz, timeSpent]);

  const calculateScore = () => {
    return quiz.questions.reduce((acc, q, idx) => {
      const userAnswer = answers[idx];
      if (Array.isArray(userAnswer) || userAnswer !== null) {
        const selected = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
        const correct = Array.isArray(q.correctIndexes) ? q.correctIndexes : [q.correctIndexes];
        return acc + (selected.length === correct.length && selected.every(a => correct.includes(a)) ? 1 : 0);
      }
      return acc;
    }, 0);
  };

  const handleRetry = () => {
    setQuizState('start');
    setCurrentIndex(0);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setTimeRemaining(quiz.timeLimit || 0);
    setTimeSpent(0);
    setIsWarning(false);
    setIsTimeUp(false);
  };

  const handleReview = () => {
    setQuizState('review');
  };

  const handleBackToResults = () => {
    setQuizState('results');
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  // Answered count
  const answeredCount = answers.filter(a => {
    if (a === null) return false;
    if (Array.isArray(a)) return a.length > 0;
    return true;
  }).length;

  const allAnswered = answeredCount === quiz.questions.length;

  // Start Screen
  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-8 max-w-md w-full shadow-xl border border-border text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
          {quiz.description && (
            <p className="text-muted-foreground mb-6">{quiz.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-primary">{quiz.questions.length}</div>
              <div className="text-muted-foreground">Câu hỏi</div>
            </div>
            {quiz.timeLimit && (
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(quiz.timeLimit / 60)} phút
                </div>
                <div className="text-muted-foreground">Thời gian</div>
              </div>
            )}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-success">{quiz.passingScore || 70}%</div>
              <div className="text-muted-foreground">Điểm đạt</div>
            </div>
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-warning">
                {quiz.questions.filter(q => q.type === 'multiple').length}
              </div>
              <div className="text-muted-foreground">Nhiều đáp án</div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Bắt đầu làm bài
          </button>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (quizState === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <ResultsScreen
            quiz={quiz}
            answers={answers}
            timeSpent={timeSpent}
            onRetry={handleRetry}
            onReview={handleReview}
            onBack={handleBack}
          />
        </div>
      </div>
    );
  }

  // Review Screen
  if (quizState === 'review') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <ReviewScreen
            quiz={quiz}
            answers={answers}
            onBack={handleBackToResults}
            onRetry={handleRetry}
          />
        </div>
      </div>
    );
  }

  // Taking Quiz
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-muted rounded-lg transition-colors md:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold truncate">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Câu {currentIndex + 1} / {quiz.questions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ProgressBar current={currentIndex} total={quiz.questions.length} />
            </div>
            {quiz.timeLimit && (
              <QuizTimer
                seconds={timeRemaining}
                onWarning={isWarning}
                onTimeUp={isTimeUp}
              />
            )}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="sm:hidden mt-3">
          <ProgressBar current={currentIndex} total={quiz.questions.length} />
        </div>
      </header>

      {/* Warning Banner */}
      {isWarning && !isTimeUp && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-warning/10 border-b border-warning/20 px-4 py-2"
        >
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-warning text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Còn {Math.floor(timeRemaining / 60)} phút {timeRemaining % 60} giây!</span>
          </div>
        </motion.div>
      )}

      {/* Question Area */}
      <main className="flex-1 py-8 px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={quiz.questions.length}
            selectedAnswers={selectedAnswers as number[]}
            direction={direction}
            onSelectAnswer={handleSelectAnswer}
            onDeselectAnswer={handleDeselectAnswer}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirst={isFirst}
            isLast={isLast}
          />
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-card/95 backdrop-blur border-t border-border px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Đã trả lời: <span className="font-medium text-foreground">{answeredCount}</span> / {quiz.questions.length}
          </div>

          {isLast && (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!allAnswered}
            >
              Nộp bài ({answeredCount}/{quiz.questions.length})
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}