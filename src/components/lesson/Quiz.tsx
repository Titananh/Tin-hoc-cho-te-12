'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  X as XIcon,
  RotateCcw,
  Trophy,
  Target
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

// ============================================================================
// ANIMATIONS
// ============================================================================

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const optionVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  selected: { scale: 1 },
  correct: { scale: 1.02 },
  wrong: { scale: 1.02 },
};

// ============================================================================
// CONFETTI PARTICLES
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

  React.useEffect(() => {
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
        setParticles(prev => 
          prev.map(p => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            rotation: p.rotation + 5,
          })).filter(p => p.y < 120)
        );
      }, 50);

      setTimeout(() => clearInterval(interval), 3000);
      return () => clearInterval(interval);
    }
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map(p => (
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
// PROGRESS RING
// ============================================================================

function AnimatedProgressRing({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  showPercentage = true 
}: { 
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - clampedProgress / 100) }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="50%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>

      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// OPTION BUTTON
// ============================================================================

interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null;
  isRevealed: boolean;
  onClick: () => void;
}

function OptionButton({ 
  option, 
  index, 
  isSelected, 
  isCorrect, 
  isRevealed, 
  onClick 
}: OptionButtonProps) {
  const letters = ['A', 'B', 'C', 'D'];

  const getStyles = () => {
    if (isRevealed) {
      if (isCorrect) {
        return 'bg-success/10 border-success text-success';
      }
      if (isSelected && !isCorrect) {
        return 'bg-error/10 border-error text-error';
      }
    }
    if (isSelected) {
      return 'bg-primary/10 border-primary text-primary';
    }
    return 'bg-transparent border-border text-foreground hover:border-primary hover:bg-primary/5';
  };

  return (
    <motion.button
      variants={optionVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isRevealed}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
        disabled:cursor-default
        ${getStyles()}
      `}
    >
      {/* Letter badge */}
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
        ${isRevealed && isCorrect ? 'bg-success text-white' : 
          isRevealed && isSelected && !isCorrect ? 'bg-error text-white' :
          isSelected ? 'bg-primary text-white' : 'bg-muted/20 text-muted'}
      `}>
        {letters[index]}
      </div>

      {/* Option text */}
      <span className="flex-1 text-left font-medium">{option}</span>

      {/* Icon */}
      {isRevealed && isCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <Check className="w-6 h-6 text-success" />
        </motion.div>
      )}
      {isRevealed && isSelected && !isCorrect && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
        >
          <XIcon className="w-6 h-6 text-error" />
        </motion.div>
      )}
      {!isRevealed && isSelected && (
        <div className="w-6 h-6 rounded-full border-2 border-primary" />
      )}
    </motion.button>
  );
}

// ============================================================================
// QUESTION CARD
// ============================================================================

interface QuestionCardProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedIndex: number | null;
  isRevealed: boolean;
  direction: number;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedIndex,
  isRevealed,
  direction,
  onSelectAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
}: QuestionCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-muted">
          Câu hỏi {currentIndex + 1}/{totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`
                h-2 rounded-full transition-all duration-300
                ${i < currentIndex ? 'w-6 bg-primary' : 
                  i === currentIndex ? 'w-6 bg-primary/50' : 'w-2 bg-border'}
              `}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={question.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-surface rounded-2xl p-6 shadow-lg border border-border mb-6"
      >
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <OptionButton
              key={index}
              option={option}
              index={index}
              isSelected={selectedIndex === index}
              isCorrect={index === question.correctIndex}
              isRevealed={isRevealed}
              onClick={() => onSelectAnswer(index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Explanation (shown after reveal) */}
      <AnimatePresence>
        {isRevealed && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${isFirst ? 'opacity-50 cursor-not-allowed text-muted' : 'text-foreground hover:bg-muted/10'}
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Trước
        </button>

        {isLast && selectedIndex !== null && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {}}
            className="px-6 py-2 rounded-lg gradient-bg text-white font-medium shadow-lg"
          >
            Nộp bài
          </motion.button>
        )}

        <button
          onClick={onNext}
          disabled={isLast}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
            ${isLast ? 'opacity-50 cursor-not-allowed text-muted' : 'text-foreground hover:bg-muted/10'}
          `}
        >
          Sau
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// RESULTS SCREEN
// ============================================================================

interface ResultsScreenProps {
  score: number;
  total: number;
  questions: QuizQuestion[];
  answers: (number | null)[];
  onRetry: () => void;
  onClose: () => void;
}

function ResultsScreen({ 
  score, 
  total, 
  questions, 
  answers, 
  onRetry,
  onClose 
}: ResultsScreenProps) {
  const percentage = Math.round((score / total) * 100);
  const isPassing = percentage >= 80;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="w-full max-w-2xl mx-auto text-center"
    >
      {/* Score display */}
      <div className="mb-8">
        {isPassing && <Confetti active={true} />}
        
        <div className="flex justify-center mb-6">
          <AnimatedProgressRing progress={percentage} size={160} strokeWidth={10} />
        </div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {isPassing ? '🎉 Chúc mừng!' : '💪 Cố gắng hơn!'}
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted text-lg"
        >
          Bạn trả lời đúng {score}/{total} câu
        </motion.p>
      </div>

      {/* Review section */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-surface rounded-2xl p-6 shadow-lg border border-border text-left mb-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Chi tiết kết quả
        </h3>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div key={q.id} className="border border-border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                    ${isCorrect ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}
                  `}>
                    {isCorrect ? <Check className="w-4 h-4" /> : <XIcon className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium mb-1">{q.question}</p>
                    <p className="text-sm text-muted">
                      Đáp án của bạn: {userAnswer !== null ? q.options[userAnswer] : 'Chưa trả lời'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-success mt-1">
                        Đáp án đúng: {q.options[q.correctIndex]}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-xs text-muted mt-2 flex items-start gap-1">
                        <Lightbulb className="w-3 h-3 shrink-0 mt-0.5" />
                        {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-4"
      >
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-border font-medium hover:bg-muted/10 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Làm lại
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
        >
          Tiếp tục học
        </button>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN QUIZ COMPONENT
// ============================================================================

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const allAnswered = answers.every(a => a !== null);

  const handleSelectAnswer = (index: number) => {
    if (isRevealed) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
      // Check if next question already has an answer to determine reveal state
      setIsRevealed(answers[currentIndex + 1] !== null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
      setIsRevealed(answers[currentIndex - 1] !== null);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
    const score = answers.filter((answer, index) => 
      answer === questions[index].correctIndex
    ).length;
    onComplete?.(score, questions.length);
  };

  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentIndex(0);
    setIsRevealed(false);
    setIsCompleted(false);
  };

  // Show submit button when on last question and it's answered
  const showSubmit = currentIndex === questions.length - 1 && isAnswered && !isCompleted;

  return (
    <div className="w-full min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Kiểm tra nhanh</h2>
          <p className="text-sm text-muted">Ôn lại kiến thức đã học</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {!isCompleted ? (
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                selectedIndex={selectedAnswer}
                isRevealed={isRevealed}
                direction={direction}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isFirst={currentIndex === 0}
                isLast={currentIndex === questions.length - 1}
              />
            </AnimatePresence>

            {/* Submit button overlay for last question */}
            {showSubmit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`
                    px-8 py-3 rounded-xl font-bold shadow-lg transition-all
                    ${allAnswered 
                      ? 'gradient-bg text-white hover:opacity-90' 
                      : 'bg-muted text-muted cursor-not-allowed'}
                  `}
                >
                  Nộp bài ({answers.filter(a => a !== null).length}/{questions.length})
                </motion.button>
              </motion.div>
            )}
          </div>
        ) : (
          <ResultsScreen
            score={answers.filter((answer, index) => 
              answer === questions[index].correctIndex
            ).length}
            total={questions.length}
            questions={questions}
            answers={answers}
            onRetry={handleRetry}
            onClose={() => {}}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;