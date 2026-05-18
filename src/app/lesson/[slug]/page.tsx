'use client';

import { useParams, notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import { courses } from '@/data/content';
import { Lesson, Module, Course, CodeExample, QuizQuestion } from '@/types';
import {
  ChevronRight,
  Clock,
  Star,
  Target,
  CheckCircle2,
  ChevronLeft,
  Menu,
  X,
  BookOpen,
  Bot,
  ArrowRight,
  Trophy,
  Lightbulb,
  Play
} from 'lucide-react';

// Find lesson by slug from all courses
function findLesson(slug: string): { lesson: Lesson; module: Module; course: Course } | null {
  for (const course of courses) {
    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.slug === slug);
      if (lesson) {
        return { lesson, module, course };
      }
    }
  }
  return null;
}

// Get all lessons for sidebar
function getAllLessons(course: Course): { lesson: Lesson; module: Module }[] {
  const lessons: { lesson: Lesson; module: Module }[] = [];
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      lessons.push({ lesson, module });
    }
  }
  return lessons;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const difficultyLabels = {
  easy: 'Dễ',
  medium: 'Trung bình',
  hard: 'Khó',
};

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { theme } = useTheme();
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const found = findLesson(slug);

  useEffect(() => {
    if (found) {
      const completed = localStorage.getItem(`lesson-completed-${found.lesson.id}`);
      setIsCompleted(completed === 'true');
    }
  }, [found]);

  if (!found) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Không tìm thấy bài học</h1>
          <p className="text-muted mb-6">
            Bài học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Quay về trang chủ
          </a>
        </div>
      </div>
    );
  }

  const { lesson, module, course } = found;
  const allLessons = getAllLessons(course);
  const currentLessonIndex = allLessons.findIndex(l => l.lesson.id === lesson.id);
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const handleMarkComplete = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      setEarnedXP(lesson.xp_reward);
      setShowXPAnimation(true);
      localStorage.setItem(`lesson-completed-${lesson.id}`, 'true');
      setTimeout(() => setShowXPAnimation(false), 2000);
    }
  };

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    lesson.content.quiz.forEach(q => {
      if (selectedQuizAnswers[q.id] === q.correct_index) {
        correct++;
      }
    });
    return correct;
  };

  const CodeBlock = ({ example }: { example: CodeExample }) => {
    const isDark = theme === 'dark';
    return (
      <div className="my-6 rounded-xl overflow-hidden shadow-md">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 px-4 py-2 border-b border-border">
          <h4 className="font-semibold text-foreground">{example.title}</h4>
        </div>
        <div className={`relative ${isDark ? 'bg-slate-900' : 'bg-slate-100'}`}>
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
          <pre className="p-4 overflow-x-auto">
            <code className={`font-mono text-sm ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              {example.code}
            </code>
          </pre>
        </div>
        {example.explanation && (
          <div className="bg-primary/5 dark:bg-primary/10 px-4 py-3 border-t border-border">
            <p className="text-sm text-muted whitespace-pre-line">{example.explanation}</p>
          </div>
        )}
        {example.output && (
          <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} px-4 py-3 border-t border-border`}>
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-3 h-3 text-success" />
              <span className="text-xs font-medium text-muted uppercase tracking-wide">Kết quả</span>
            </div>
            <pre className={`font-mono text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {example.output}
            </pre>
          </div>
        )}
      </div>
    );
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => {
    const content = (
      <div className={`flex flex-col h-full ${mobile ? 'w-80' : 'w-72'}`}>
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground line-clamp-1">{course.title}</h2>
          <p className="text-sm text-muted mt-1 line-clamp-1">{module.title}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {allLessons.map(({ lesson: l, module: m }, index) => {
            const isActive = l.id === lesson.id;
            const isCompletedLesson = typeof window !== 'undefined' && localStorage.getItem(`lesson-completed-${l.id}`) === 'true';
            return (
              <a
                key={l.id}
                href={`/lesson/${l.slug}`}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted hover:bg-surface hover:text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompletedLesson
                    ? 'bg-success/20 text-success'
                    : 'bg-border text-muted'
                }`}>
                  {isCompletedLesson ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-primary' : ''}`}>
                    {m.title}
                  </p>
                  <p className="text-xs text-muted truncate">{l.title}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );

    if (mobile) {
      return (
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute left-0 top-0 bottom-0 bg-surface shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-border transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                {content}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    }

    return (
      <div className="hidden lg:flex flex-col h-screen sticky top-0 bg-surface border-r border-border">
        {content}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-surface shadow-lg border border-border"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <Sidebar />
      <Sidebar mobile />

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:ml-72 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8 pt-16 lg:pt-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted mb-6"
          >
            <a href="/" className="hover:text-foreground transition-colors">Trang chủ</a>
            <ChevronRight className="w-4 h-4" />
            <a href={`/course/${course.slug}`} className="hover:text-foreground transition-colors">{course.title}</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{lesson.title}</span>
          </motion.div>

          {/* Lesson header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-muted">
                <Clock className="w-4 h-4" />
                <span>{lesson.estimated_minutes} phút</span>
              </div>
              <div className="flex items-center gap-2 text-warning">
                <Trophy className="w-4 h-4" />
                <span>+{lesson.xp_reward} XP</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[lesson.difficulty]}`}>
                {difficultyLabels[lesson.difficulty]}
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-success">
                  <CheckCircle2 className="w-4 h-4" />
                  Đã hoàn thành
                </span>
              )}
            </div>
          </motion.div>

          {/* Learning Objectives */}
          {lesson.content.objectives.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-6 bg-surface rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Mục tiêu học tập</h2>
              </div>
              <ul className="space-y-3">
                {lesson.content.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Theory Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 prose prose-slate dark:prose-invert max-w-none"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground m-0">Lý thuyết</h2>
            </div>
            <div className="text-foreground leading-relaxed whitespace-pre-wrap">
              {lesson.content.theory.split('\n\n').map((paragraph, index) => {
                // Check if it's a header (starts with **)
                if (paragraph.startsWith('**') && paragraph.includes('**')) {
                  const match = paragraph.match(/^\*\*(.+?)\*\*\n?/);
                  if (match) {
                    const header = match[1];
                    const content = paragraph.slice(match[0].length);
                    return (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-bold text-foreground mt-6 mb-2">{header}</h3>
                        {content && <p className="text-foreground leading-relaxed whitespace-pre-wrap">{content}</p>}
                      </div>
                    );
                  }
                }
                // Check for inline code
                const parts = paragraph.split(/(`[^`]+`)/g);
                return (
                  <p key={index} className="mb-4">
                    {parts.map((part, i) => {
                      if (part.startsWith('`') && part.endsWith('`')) {
                        return (
                          <code key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded font-mono text-sm">
                            {part.slice(1, -1)}
                          </code>
                        );
                      }
                      // Handle bold text within paragraph
                      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
                      return boldParts.map((bp, j) => {
                        if (bp.startsWith('**') && bp.endsWith('**')) {
                          return <strong key={`${i}-${j}`} className="font-semibold">{bp.slice(2, -2)}</strong>;
                        }
                        return bp;
                      });
                    })}
                  </p>
                );
              })}
            </div>
          </motion.div>

          {/* Code Examples */}
          {lesson.content.examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Ví dụ mã nguồn</h2>
              </div>
              {lesson.content.examples.map((example, index) => (
                <CodeBlock key={index} example={example} />
              ))}
            </motion.div>
          )}

          {/* Quiz Section */}
          {lesson.content.quiz.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 p-6 bg-surface rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Kiểm tra kiến thức</h2>
              </div>
              <div className="space-y-6">
                {lesson.content.quiz.map((quiz, quizIndex) => (
                  <div key={quiz.id} className="border border-border rounded-lg p-4">
                    <p className="font-medium text-foreground mb-4">
                      Câu {quizIndex + 1}: {quiz.question}
                    </p>
                    <div className="space-y-3">
                      {quiz.options.map((option, optionIndex) => {
                        const isSelected = selectedQuizAnswers[quiz.id] === optionIndex;
                        const isCorrect = showQuizResults && optionIndex === quiz.correct_index;
                        const isWrong = showQuizResults && isSelected && optionIndex !== quiz.correct_index;
                        return (
                          <label
                            key={optionIndex}
                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              isCorrect
                                ? 'border-success bg-success/10'
                                : isWrong
                                ? 'border-error bg-error/10'
                                : isSelected
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50 hover:bg-primary/5'
                            }`}
                          >
                            <input
                              type="radio"
                              name={quiz.id}
                              checked={isSelected}
                              onChange={() => !showQuizResults && handleQuizAnswer(quiz.id, optionIndex)}
                              disabled={showQuizResults}
                              className="w-4 h-4 text-primary"
                            />
                            <span className={isCorrect ? 'text-success font-medium' : isWrong ? 'text-error font-medium' : 'text-foreground'}>
                              {option}
                            </span>
                            {showQuizResults && isCorrect && <CheckCircle2 className="w-4 h-4 text-success ml-auto" />}
                          </label>
                        );
                      })}
                    </div>
                    {showQuizResults && (
                      <div className={`mt-4 p-3 rounded-lg text-sm ${
                        selectedQuizAnswers[quiz.id] === quiz.correct_index
                          ? 'bg-success/10 text-success'
                          : 'bg-error/10 text-error'
                      }`}>
                        <p className="font-medium mb-1">
                          {selectedQuizAnswers[quiz.id] === quiz.correct_index ? '✓ Chính xác!' : '✗ Chưa đúng'}
                        </p>
                        <p>{quiz.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {!showQuizResults ? (
                <button
                  onClick={() => setShowQuizResults(true)}
                  disabled={Object.keys(selectedQuizAnswers).length !== lesson.content.quiz.length}
                  className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kiểm tra kết quả
                </button>
              ) : (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="font-bold text-foreground">
                    Kết quả: {calculateQuizScore()}/{lesson.content.quiz.length} câu đúng
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Practice Exercises */}
          {lesson.content.exercises.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-6 bg-surface rounded-xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Bài tập thực hành</h2>
              </div>
              <p className="text-muted">Coming soon...</p>
            </motion.div>
          )}

          {/* Spacer for sticky bottom bar */}
          <div className="h-24" />
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handleMarkComplete}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isCompleted
                ? 'bg-success/20 text-success cursor-default'
                : 'bg-primary text-white hover:bg-primary-hover'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border border-border hover:bg-primary/5 transition-colors">
            <Bot className="w-5 h-5" />
            Hỏi AI Tutor
          </button>
          {nextLesson ? (
            <a
              href={`/lesson/${nextLesson.lesson.slug}`}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity"
            >
              Bài tiếp theo
              <ArrowRight className="w-5 h-5" />
            </a>
          ) : (
            <a
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-opacity"
            >
              Quay về trang chủ
              <ArrowRight className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* XP Animation */}
      <AnimatePresence>
        {showXPAnimation && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -100, scale: 1 }}
            exit={{ opacity: 0, y: -200, scale: 0.5 }}
            transition={{ duration: 1.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="flex items-center gap-2 px-6 py-4 bg-success text-white rounded-xl shadow-2xl">
              <Trophy className="w-8 h-8" />
              <span className="text-2xl font-bold">+{earnedXP} XP</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}