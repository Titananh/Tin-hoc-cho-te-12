'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
  Zap,
  MessageCircle,
  Loader2,
  ChevronRight,
  ListChecks,
  Code2,
  FileQuestion,
  Trophy,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface CodeExample {
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  explanation: string;
}

interface ExerciseItem {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  isCompleted: boolean | null;
}

interface LessonData {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: {
    objectives?: string[];
    theory?: string;
    examples?: CodeExample[];
    quiz?: QuizQuestion[];
  };
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  xpReward: number;
  order: number;
  module: {
    id: number;
    title: string;
    slug: string;
    description: string;
    order: number;
  };
  course: {
    id: number;
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
  };
  userProgress: {
    isCompleted: boolean;
    completedAt: string | null;
    timeSpent: number;
  } | null;
  previousLesson: { id: number; title: string; slug: string } | null;
  nextLesson: { id: number; title: string; slug: string } | null;
  exercises: ExerciseItem[];
  quiz: QuizQuestion[] | null;
}


// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'Dễ';
    case 'medium':
      return 'Trung Bình';
    case 'hard':
      return 'Khó';
    default:
      return 'Trung Bình';
  }
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case 'hard':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  }
}

// ─── Simple Markdown Renderer ────────────────────────────────────────────────

function renderMarkdown(text: string): string {
  if (!text) return '';

  let html = text;

  // Escape HTML entities first (basic sanitization)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Code blocks (```...```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_match, _lang, code) =>
      `<pre class="bg-slate-900 dark:bg-slate-950 text-green-300 rounded-xl p-4 overflow-x-auto text-sm font-mono my-4 border border-slate-700"><code>${code.trim()}</code></pre>`
  );

  // Inline code (`...`)
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-slate-100 dark:bg-slate-700 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
  );

  // Headings
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-6 mb-3">$1</h3>'
  );
  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">$1</h2>'
  );
  html = html.replace(
    /^# (.+)$/gm,
    '<h1 class="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">$1</h1>'
  );

  // Bold and italic
  html = html.replace(
    /\*\*\*(.+?)\*\*\*/g,
    '<strong class="font-bold"><em>$1</em></strong>'
  );
  html = html.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>'
  );
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Unordered lists
  html = html.replace(
    /^- (.+)$/gm,
    '<li class="flex items-start gap-2 ml-4 mb-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span><span>$1</span></li>'
  );

  // Ordered lists
  html = html.replace(
    /^(\d+)\. (.+)$/gm,
    '<li class="flex items-start gap-2 ml-4 mb-1"><span class="text-blue-500 font-medium flex-shrink-0">$1.</span><span>$2</span></li>'
  );

  // Paragraphs (double newlines)
  html = html.replace(/\n\n/g, '</p><p class="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">');

  // Single newlines to <br>
  html = html.replace(/\n/g, '<br/>');

  // Wrap in paragraph
  html = `<p class="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">${html}</p>`;

  return html;
}


// ─── Code Block Component ────────────────────────────────────────────────────

function CodeBlock({ example }: { example: CodeExample }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = example.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  }, [example.code]);

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
      {/* Code block header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {example.title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            copied
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
          aria-label="Sao chép code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Đã sao chép
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Sao chép
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="bg-slate-900 dark:bg-slate-950 p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-green-300 leading-relaxed whitespace-pre">
          {example.code}
        </pre>
      </div>

      {/* Output (if available) */}
      {example.output && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3">
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
            Kết quả:
          </div>
          <pre className="text-sm font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
            {example.output}
          </pre>
        </div>
      )}

      {/* Explanation */}
      {example.explanation && (
        <div className="border-t border-slate-200 dark:border-slate-700 px-4 py-3 bg-blue-50/50 dark:bg-blue-900/10">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            💡 {example.explanation}
          </p>
        </div>
      )}
    </div>
  );
}


// ─── Loading Skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-6 animate-pulse" />

        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg mb-3 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
              style={{ width: `${85 - i * 5}%` }}
            />
          ))}
          <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse mt-6" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"
              style={{ width: `${90 - i * 10}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Quiz Section Component ──────────────────────────────────────────────────

function QuizSection({ questions }: { questions: QuizQuestion[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  function handleSelect(questionId: string, optionIndex: number) {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit() {
    setShowResults(true);
  }

  function handleReset() {
    setSelectedAnswers({});
    setShowResults(false);
  }

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <FileQuestion className="w-5 h-5 text-purple-500" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Câu hỏi ôn tập
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {questions.length} câu hỏi trắc nghiệm
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
          >
            <p className="font-medium text-slate-900 dark:text-white mb-3">
              <span className="text-blue-500 mr-2">Câu {qIndex + 1}.</span>
              {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[q.id] === oIndex;
                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelect(q.id, oIndex)}
                    disabled={showResults}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                      isSelected
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 dark:text-slate-300'
                    } ${showResults ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + oIndex)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            {showResults && selectedAnswers[q.id] !== undefined && (
              <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-sm text-slate-600 dark:text-slate-400">
                💡 {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quiz actions */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Đã trả lời: {answeredCount}/{questions.length}
        </span>
        <div className="flex gap-3">
          {showResults && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Làm lại
            </button>
          )}
          {!showResults && (
            <button
              onClick={handleSubmit}
              disabled={answeredCount < questions.length}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kiểm tra đáp án
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


// ─── Main Page Component ─────────────────────────────────────────────────────

export default function LessonPage() {
  const params = useParams();
  const levelId = params.levelId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  async function fetchLesson() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/lessons/${lessonId}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Không tìm thấy bài học này');
        }
        throw new Error('Không thể tải nội dung bài học');
      }

      const data: LessonData = await res.json();
      setLesson(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu'
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleComplete() {
    if (!lesson || isCompleting) return;

    setIsCompleting(true);
    setCompletionMessage(null);

    try {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Không thể hoàn thành bài học');
      }

      const data = await res.json();

      // Update local state
      setLesson((prev) =>
        prev
          ? {
              ...prev,
              userProgress: {
                isCompleted: true,
                completedAt: new Date().toISOString(),
                timeSpent: prev.userProgress?.timeSpent ?? 0,
              },
            }
          : prev
      );

      if (data.xpEarned > 0) {
        setCompletionMessage(
          `🎉 Hoàn thành! Bạn nhận được +${data.xpEarned} XP${data.levelUp ? ' và lên cấp!' : ''}`
        );
      } else {
        setCompletionMessage('✅ Bài học đã được hoàn thành trước đó');
      }

      // Auto-dismiss message
      setTimeout(() => setCompletionMessage(null), 5000);
    } catch (err) {
      setCompletionMessage(
        err instanceof Error ? `❌ ${err.message}` : '❌ Đã xảy ra lỗi'
      );
      setTimeout(() => setCompletionMessage(null), 5000);
    } finally {
      setIsCompleting(false);
    }
  }

  // ─── Loading State ─────────────────────────────────────────────────────────

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // ─── Error State ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Không thể tải bài học
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={fetchLesson}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
            <Link
              href={`/learn/${levelId}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Not Found ─────────────────────────────────────────────────────────────

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Không tìm thấy bài học
          </h2>
          <Link
            href={`/learn/${levelId}`}
            className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại cấp độ
          </Link>
        </div>
      </div>
    );
  }

  // ─── Main Render ───────────────────────────────────────────────────────────

  const isCompleted = lesson.userProgress?.isCompleted === true;
  const content = lesson.content;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/learn"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Lộ trình
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/learn/${levelId}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {lesson.course.title}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-400 dark:text-slate-500">
            {lesson.module.title}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-[200px]">
            {lesson.title}
          </span>
        </motion.nav>

        {/* Lesson Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start gap-3 mb-4">
            {isCompleted && (
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                lesson.difficulty
              )}`}
            >
              {getDifficultyLabel(lesson.difficulty)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="w-4 h-4" />
              {lesson.estimatedMinutes} phút
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-yellow-600 dark:text-yellow-400">
              <Zap className="w-4 h-4" />
              +{lesson.xpReward} XP
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Đã hoàn thành
              </span>
            )}
          </div>
        </motion.header>

        {/* Learning Objectives */}
        {content.objectives && content.objectives.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ListChecks className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Mục tiêu bài học
              </h2>
            </div>
            <ul className="space-y-2.5">
              {content.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {objective}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Theory Content */}
        {content.theory && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Nội dung lý thuyết
              </h2>
            </div>
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content.theory) }}
            />
          </motion.section>
        )}

        {/* Code Examples */}
        {content.examples && content.examples.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Ví dụ minh họa
              </h2>
            </div>
            {content.examples.map((example, index) => (
              <CodeBlock key={index} example={example} />
            ))}
          </motion.section>
        )}

        {/* Exercises Section */}
        {lesson.exercises && lesson.exercises.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Bài tập thực hành
              </h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                ({lesson.exercises.length} bài)
              </span>
            </div>
            <div className="space-y-3">
              {lesson.exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/learn/${levelId}/exercises/${exercise.id}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                >
                  <div className="flex-shrink-0">
                    {exercise.isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-slate-900 dark:text-white block truncate">
                      {exercise.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                          exercise.difficulty
                        )}`}
                      >
                        {getDifficultyLabel(exercise.difficulty)}
                      </span>
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        +{exercise.xpReward} XP
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Quiz Section */}
        {lesson.quiz && lesson.quiz.length > 0 && (
          <QuizSection questions={lesson.quiz} />
        )}

        {/* Completion Message Toast */}
        {completionMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white"
          >
            {completionMessage}
          </motion.div>
        )}

        {/* Complete Lesson Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700"
        >
          {!isCompleted ? (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
            >
              {isCompleting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5" />
                  Hoàn thành bài học
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-3 px-5 py-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Bạn đã hoàn thành bài học này
              </span>
            </div>
          )}
        </motion.div>

        {/* Previous/Next Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4"
        >
          {lesson.previousLesson ? (
            <Link
              href={`/learn/${levelId}/lessons/${lesson.previousLesson.id}`}
              className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <div className="text-left">
                <span className="text-xs text-slate-400 dark:text-slate-500 block">
                  Bài trước
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                  {lesson.previousLesson.title}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {lesson.nextLesson ? (
            <Link
              href={`/learn/${levelId}/lessons/${lesson.nextLesson.id}`}
              className="flex items-center gap-3 px-5 py-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors group"
            >
              <div className="text-right">
                <span className="text-xs text-slate-400 dark:text-slate-500 block">
                  Bài tiếp theo
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-1">
                  {lesson.nextLesson.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ) : (
            <div />
          )}
        </motion.div>
      </div>

      {/* Floating "Hỏi AI" Button */}
      <Link
        href={`/ai-tutor?lessonId=${lesson.id}&context=${encodeURIComponent(lesson.title)}`}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all group"
        aria-label="Hỏi AI Tutor"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Hỏi AI</span>
      </Link>
    </div>
  );
}
