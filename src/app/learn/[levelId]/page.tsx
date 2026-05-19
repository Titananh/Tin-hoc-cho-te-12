'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Lock,
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  Layers,
  Zap,
  Star,
  Code2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface LevelLesson {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  order: number;
  isCompleted: boolean | null;
}

interface LevelChapter {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  lessons: LevelLesson[];
  totalLessons: number;
  completedLessons: number | null;
}

interface LevelDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  isUnlocked: boolean;
  progressPercentage: number | null;
  totalLessons: number;
  completedLessons: number | null;
  chapters: LevelChapter[];
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

const levelIcons: Record<string, typeof BookOpen> = {
  book: BookOpen,
  code: Code2,
  layers: Layers,
  star: Star,
  zap: Zap,
};

function getLevelIcon(iconName: string) {
  return levelIcons[iconName] || BookOpen;
}

const defaultLevelColors = [
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-purple-500 to-violet-500',
  'from-orange-500 to-amber-500',
  'from-pink-500 to-rose-500',
  'from-indigo-500 to-blue-500',
  'from-teal-500 to-cyan-500',
  'from-yellow-500 to-orange-500',
  'from-red-500 to-pink-500',
  'from-fuchsia-500 to-purple-500',
];

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button skeleton */}
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-8 animate-pulse" />

        {/* Header skeleton */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          <div className="flex-1">
            <div className="h-7 w-64 bg-slate-200 dark:bg-slate-700 rounded mb-2 animate-pulse" />
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        </div>

        {/* Progress bar skeleton */}
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full mb-10 animate-pulse" />

        {/* Chapter skeletons */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-3" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Locked State ────────────────────────────────────────────────────────────

function LockedState({ levelOrder }: { levelOrder: number }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-slate-400 dark:text-slate-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Cấp độ bị khóa
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">
          Bạn cần hoàn thành tất cả bài học và bài tập ở cấp độ {levelOrder - 1} trước khi mở khóa cấp độ này.
        </p>
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại lộ trình
        </Link>
      </motion.div>
    </div>
  );
}


// ─── Chapter Accordion Component ─────────────────────────────────────────────

function ChapterAccordion({
  chapter,
  levelId,
  isExpanded,
  onToggle,
  index,
}: {
  chapter: LevelChapter;
  levelId: number;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}) {
  const completedCount = chapter.completedLessons ?? 0;
  const totalCount = chapter.totalLessons;
  const chapterProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isChapterCompleted = chapterProgress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Chapter Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
      >
        {/* Chapter status icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isChapterCompleted
              ? 'bg-green-100 dark:bg-green-900/30'
              : 'bg-blue-100 dark:bg-blue-900/30'
          }`}
        >
          {isChapterCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Layers className="w-5 h-5 text-blue-500" />
          )}
        </div>

        {/* Chapter info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white truncate">
              Chương {chapter.order}: {chapter.title}
            </h3>
          </div>
          {chapter.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
              {chapter.description}
            </p>
          )}
          {/* Chapter progress */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 max-w-[200px] h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${chapterProgress}%` }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              {completedCount}/{totalCount} bài
            </span>
          </div>
        </div>

        {/* Expand/collapse icon */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      {/* Lessons List */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-slate-100 dark:border-slate-700 pt-4">
              <div className="space-y-2">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    levelId={levelId}
                    index={lessonIndex}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Lesson Item Component ───────────────────────────────────────────────────

function LessonItem({
  lesson,
  levelId,
  index,
}: {
  lesson: LevelLesson;
  levelId: number;
  index: number;
}) {
  const isCompleted = lesson.isCompleted === true;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/learn/${levelId}/lessons/${lesson.id}`}
        className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
      >
        {/* Completion status */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors" />
          )}
        </div>

        {/* Lesson info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium truncate ${
                isCompleted
                  ? 'text-slate-500 dark:text-slate-400 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}
            >
              {lesson.title}
            </span>
          </div>

          {/* Lesson meta */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {/* Estimated time */}
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
              <Clock className="w-3 h-3" />
              {lesson.estimatedMinutes} phút
            </span>

            {/* Difficulty badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                lesson.difficulty
              )}`}
            >
              {getDifficultyLabel(lesson.difficulty)}
            </span>

            {/* XP reward */}
            <span className="inline-flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
              <Zap className="w-3 h-3" />
              +{lesson.xpReward} XP
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
      </Link>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function LevelDetailPage() {
  const params = useParams();
  const levelId = params.levelId as string;

  const [level, setLevel] = useState<LevelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (levelId) {
      fetchLevelDetail();
    }
  }, [levelId]);

  async function fetchLevelDetail() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/levels/${levelId}`);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Không tìm thấy cấp độ này');
        }
        throw new Error('Không thể tải thông tin cấp độ');
      }

      const data: LevelDetail = await res.json();
      setLevel(data);

      // Auto-expand the first chapter that has incomplete lessons
      const firstIncomplete = data.chapters.find(
        (ch) => ch.completedLessons !== null && ch.completedLessons < ch.totalLessons
      );
      if (firstIncomplete) {
        setExpandedChapters(new Set([firstIncomplete.id]));
      } else if (data.chapters.length > 0) {
        setExpandedChapters(new Set([data.chapters[0].id]));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu'
      );
    } finally {
      setIsLoading(false);
    }
  }

  function toggleChapter(chapterId: number) {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
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
            Không thể tải dữ liệu
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={fetchLevelDetail}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </button>
            <Link
              href="/learn"
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

  if (!level) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Không tìm thấy cấp độ
          </h2>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại lộ trình
          </Link>
        </div>
      </div>
    );
  }

  // ─── Locked State ──────────────────────────────────────────────────────────

  if (!level.isUnlocked) {
    return <LockedState levelOrder={level.order} />;
  }

  // ─── Main Render ───────────────────────────────────────────────────────────

  const IconComponent = getLevelIcon(level.icon);
  const gradientColor = defaultLevelColors[(level.order - 1) % defaultLevelColors.length];
  const progress = level.progressPercentage ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại lộ trình học
          </Link>
        </motion.div>

        {/* Level Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 sm:gap-5 mb-5">
            {/* Level Icon */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center flex-shrink-0 shadow-lg`}
            >
              <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>

            {/* Level Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Cấp độ {level.order}
                </span>
                {progress === 100 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    Hoàn thành
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {level.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                {level.description}
              </p>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Tiến độ tổng thể
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {progress}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${gradientColor}`}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>
                {level.completedLessons ?? 0}/{level.totalLessons} bài học hoàn thành
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {level.chapters.length} chương
              </span>
            </div>
          </div>
        </motion.div>

        {/* Chapters Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Nội dung chương trình
          </h2>

          {level.chapters.map((chapter, index) => (
            <ChapterAccordion
              key={chapter.id}
              chapter={chapter}
              levelId={level.id}
              isExpanded={expandedChapters.has(chapter.id)}
              onToggle={() => toggleChapter(chapter.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty chapters state */}
        {level.chapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Chưa có nội dung
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Nội dung cấp độ này đang được cập nhật. Vui lòng quay lại sau.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
