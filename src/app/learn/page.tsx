'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Lock,
  CheckCircle2,
  Flame,
  Zap,
  Trophy,
  Code2,
  FileText,
  Layers,
  Star,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface LevelChapter {
  id: number;
  title: string;
  slug: string;
  description: string;
  order: number;
  lessonCount: number;
}

interface Level {
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
  totalExercises: number;
  chapters: LevelChapter[];
}

// ─── Icon Mapping ────────────────────────────────────────────────────────────

const levelIcons: Record<string, typeof BookOpen> = {
  book: BookOpen,
  code: Code2,
  file: FileText,
  layers: Layers,
  star: Star,
  zap: Zap,
  trophy: Trophy,
};

function getLevelIcon(iconName: string) {
  return levelIcons[iconName] || BookOpen;
}

// ─── Level Colors ────────────────────────────────────────────────────────────

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

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="text-center mb-10">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-slate-200 dark:bg-slate-700 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Summary skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3" />
              <div className="h-7 w-12 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        </div>

        {/* Level cards skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                <div className="flex-1">
                  <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded mb-3" />
                  <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Progress Summary Component ──────────────────────────────────────────────

function ProgressSummary({
  levels,
  totalXP,
  currentStreak,
}: {
  levels: Level[];
  totalXP: number;
  currentStreak: number;
}) {
  const completedLevels = levels.filter(
    (l) => l.progressPercentage === 100
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
        <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {completedLevels}/{levels.length}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Cấp độ hoàn thành
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
        <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-3">
          <Zap className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {totalXP.toLocaleString()}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Tổng XP tích lũy
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
        <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-3">
          <Flame className="w-5 h-5 text-orange-500" />
        </div>
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {currentStreak}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Ngày streak liên tiếp
        </div>
      </div>
    </motion.div>
  );
}

// ─── Level Card Component ────────────────────────────────────────────────────

function LevelCard({
  level,
  index,
  isCurrent,
}: {
  level: Level;
  index: number;
  isCurrent: boolean;
}) {
  const IconComponent = getLevelIcon(level.icon);
  const gradientColor = defaultLevelColors[index % defaultLevelColors.length];
  const progress = level.progressPercentage ?? 0;
  const isCompleted = progress === 100;
  const chapterCount = level.chapters.length;

  const cardContent = (
    <motion.div
      variants={itemVariants}
      className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border transition-all duration-300 overflow-hidden group ${
        isCurrent
          ? 'border-blue-400 dark:border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/50 shadow-blue-100 dark:shadow-blue-900/20'
          : level.isUnlocked
          ? 'border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600'
          : 'border-slate-200 dark:border-slate-700 opacity-75'
      }`}
    >
      {/* Current level indicator */}
      {isCurrent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      )}

      {/* Completed indicator */}
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              Hoàn thành
            </span>
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Level Icon */}
        <div
          className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center flex-shrink-0 shadow-md`}
        >
          {level.isUnlocked ? (
            <IconComponent className="w-7 h-7 text-white" />
          ) : (
            <Lock className="w-6 h-6 text-white/80" />
          )}
          {/* Level number badge */}
          <div className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm border border-slate-200 dark:border-slate-600">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {level.order}
            </span>
          </div>
        </div>

        {/* Level Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
              {level.title}
            </h3>
            {level.isUnlocked && !isCompleted && !isCurrent && (
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
            {level.isUnlocked
              ? level.description
              : 'Hoàn thành cấp độ trước để mở khóa'}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {chapterCount} chương
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {level.totalLessons} bài học
            </span>
            <span className="flex items-center gap-1">
              <Code2 className="w-3.5 h-3.5" />
              {level.totalExercises} bài tập
            </span>
          </div>

          {/* Progress bar */}
          {level.isUnlocked && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Tiến độ
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full rounded-full bg-gradient-to-r ${gradientColor}`}
                />
              </div>
            </div>
          )}

          {/* Locked message */}
          {!level.isUnlocked && (
            <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Hoàn thành cấp độ trước để mở khóa</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Wrap in Link if unlocked
  if (level.isUnlocked) {
    return (
      <Link href={`/learn/${level.id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function LearnPage() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  useEffect(() => {
    fetchLevels();
    fetchUserStats();
  }, []);

  async function fetchLevels() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/levels');

      if (!res.ok) {
        throw new Error('Không thể tải danh sách cấp độ');
      }

      const data = await res.json();
      setLevels(data.levels ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu'
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUserStats() {
    try {
      const res = await fetch('/api/user/stats');
      if (res.ok) {
        const data = await res.json();
        setTotalXP(data.stats?.total_xp ?? 0);
        setCurrentStreak(data.stats?.current_streak ?? 0);
      }
    } catch {
      // Stats are optional, don't block the page
    }
  }

  // Find the current level (first incomplete unlocked level)
  const currentLevelId = levels.find(
    (l) => l.isUnlocked && (l.progressPercentage ?? 0) < 100
  )?.id;

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
          <button
            onClick={fetchLevels}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
        </motion.div>
      </div>
    );
  }

  // ─── Main Render ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Lộ Trình Học{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Python
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            10 cấp độ từ cơ bản đến nâng cao, bám sát chương trình Tin học 12
            sách Cánh Diều
          </p>
        </motion.div>

        {/* Progress Summary */}
        <ProgressSummary
          levels={levels}
          totalXP={totalXP}
          currentStreak={currentStreak}
        />

        {/* Current level indicator */}
        {currentLevelId && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Cấp độ hiện tại của bạn
            </span>
          </motion.div>
        )}

        {/* Levels List */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-4"
        >
          {levels.map((level, index) => (
            <LevelCard
              key={level.id}
              level={level}
              index={index}
              isCurrent={level.id === currentLevelId}
            />
          ))}
        </motion.div>

        {/* Empty state */}
        {levels.length === 0 && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Chưa có cấp độ nào
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Nội dung đang được cập nhật. Vui lòng quay lại sau.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
