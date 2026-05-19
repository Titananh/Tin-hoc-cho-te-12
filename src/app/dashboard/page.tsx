'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  User,
  Flame,
  Zap,
  Star,
  BookOpen,
  Code2,
  Trophy,
  Calendar,
  Target,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Award,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DashboardUser {
  id: string;
  name: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
}

interface ProgressItem {
  courseId: number;
  courseTitle: string;
  orderIndex: number;
  totalExercises: number;
  completedExercises: number;
  progressPercentage: number;
}

interface NextRecommended {
  type: 'lesson' | 'exercise';
  id: number;
  title: string;
  lessonId?: number;
}

interface RecentBadge {
  id: number;
  earnedAt: string;
  badge: {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  };
}

interface IncompleteExercise {
  exerciseId: number;
  lessonId: number;
  courseOrderIndex: number;
  moduleOrderIndex: number;
}

interface CalendarDay {
  date: string;
  active: boolean;
}

interface XpDay {
  date: string;
  xp: number;
}

interface DailyGoals {
  exercisesCompleted: number;
  exercisesTarget: number;
  xpEarned: number;
  xpTarget: number;
}

interface DashboardData {
  user: DashboardUser;
  progressOverview: ProgressItem[];
  nextRecommended: NextRecommended | null;
  recentBadges: RecentBadge[];
  incompleteExercises: IncompleteExercise[];
  learningCalendar: CalendarDay[];
  xpPerDay: XpDay[];
  dailyGoals: DailyGoals;
  flashcardsDueToday: number;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function getLevelTitle(level: number): string {
  if (level >= 10) return 'Bậc Thầy Python';
  if (level >= 8) return 'Chuyên Gia';
  if (level >= 6) return 'Lập Trình Viên';
  if (level >= 4) return 'Học Viên Nâng Cao';
  if (level >= 2) return 'Học Viên';
  return 'Người Mới Bắt Đầu';
}

function getLevelColor(level: number): string {
  if (level >= 10) return '#F59E0B';
  if (level >= 8) return '#8B5CF6';
  if (level >= 6) return '#3B82F6';
  if (level >= 4) return '#10B981';
  if (level >= 2) return '#06B6D4';
  return '#6B7280';
}

function getProgressColor(index: number): string {
  const colors = [
    '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B',
    '#EF4444', '#EC4899', '#14B8A6', '#F97316', '#6366F1',
  ];
  return colors[index % colors.length];
}

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return days[date.getDay()];
}

function formatDayMonth(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header skeleton */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1">
              <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 w-60 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── XP Bar Chart Component ──────────────────────────────────────────────────

function XpChart({ data }: { data: XpDay[] }) {
  const maxXp = Math.max(...data.map((d) => d.xp), 1);

  return (
    <div className="flex items-end justify-between gap-2 h-32">
      {data.map((day, i) => {
        const height = maxXp > 0 ? (day.xp / maxXp) * 100 : 0;
        return (
          <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {day.xp > 0 ? day.xp : ''}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(height, 4)}%` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-400 min-h-[4px]"
              style={{ opacity: day.xp > 0 ? 1 : 0.3 }}
            />
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {formatShortDate(day.date)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Learning Calendar Component ─────────────────────────────────────────────

function LearningCalendar({ calendar }: { calendar: CalendarDay[] }) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
      {calendar.map((day) => (
        <div
          key={day.date}
          className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-medium transition-colors ${
            day.active
              ? 'bg-green-500 dark:bg-green-600 text-white'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
          }`}
          title={`${formatDayMonth(day.date)} - ${day.active ? 'Đã học' : 'Chưa học'}`}
        >
          {new Date(day.date).getDate()}
        </div>
      ))}
    </div>
  );
}

// ─── Daily Goals Component ───────────────────────────────────────────────────

function DailyGoals({ goals }: { goals: DailyGoals }) {
  const exercisePercent = Math.min(
    (goals.exercisesCompleted / goals.exercisesTarget) * 100,
    100
  );
  const xpPercent = Math.min((goals.xpEarned / goals.xpTarget) * 100, 100);

  return (
    <div className="space-y-4">
      {/* Exercises goal */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-green-500" />
            Bài tập hôm nay
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {goals.exercisesCompleted}/{goals.exercisesTarget}
          </span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${exercisePercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
          />
        </div>
      </div>

      {/* XP goal */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-yellow-500" />
            XP hôm nay
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {goals.xpEarned}/{goals.xpTarget}
          </span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Progress Overview Component ─────────────────────────────────────────────

function ProgressOverview({ progress }: { progress: ProgressItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {progress.map((item, index) => (
        <div key={item.courseId} className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                Cấp {item.orderIndex}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                {item.progressPercentage}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progressPercentage}%` }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="h-full rounded-full"
                style={{ backgroundColor: getProgressColor(index) }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Recent Badges Component ─────────────────────────────────────────────────

function RecentBadges({ badges }: { badges: RecentBadge[] }) {
  if (badges.length === 0) {
    return (
      <div className="text-center py-4">
        <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Chưa có huy hiệu nào. Hãy hoàn thành bài học để nhận!
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {badges.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 min-w-[80px]"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${item.badge.color}20` }}
          >
            <Trophy className="w-5 h-5" style={{ color: item.badge.color }} />
          </div>
          <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 text-center leading-tight">
            {item.badge.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────────────────

export default function DashboardPage() {
  const { status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/dashboard');

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Không thể tải bảng điều khiển');
      }

      const data: DashboardData = await res.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDashboard();
    }
  }, [status, fetchDashboard]);

  // ─── Loading State ─────────────────────────────────────────────────────────

  if (status === 'loading' || isLoading) {
    return <DashboardSkeleton />;
  }

  // ─── Unauthenticated State ─────────────────────────────────────────────────

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Bạn cần đăng nhập
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Vui lòng đăng nhập để xem bảng điều khiển
          </p>
          <a
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Đăng Nhập
          </a>
        </motion.div>
      </div>
    );
  }

  // ─── Error State ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md"
        >
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
          <button
            onClick={fetchDashboard}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Thử lại
          </button>
        </motion.div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { user, progressOverview, nextRecommended, recentBadges, incompleteExercises, learningCalendar, xpPerDay, dailyGoals } = dashboardData;

  // ─── Main Render ─────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* ─── Header Section ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white dark:ring-slate-700 shadow-md flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Xin chào, {user.name}! 👋
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                {/* Level Badge */}
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${getLevelColor(user.level)}20`,
                    color: getLevelColor(user.level),
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  Cấp {user.level} - {getLevelTitle(user.level)}
                </span>

                {/* Total XP */}
                <span className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  {user.totalXp.toLocaleString()} XP
                </span>

                {/* Streak */}
                <span className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {user.currentStreak} ngày
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Main Grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Left Column (2 cols on lg) ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Tiến Độ Học Tập
              </h2>
              <ProgressOverview progress={progressOverview} />
            </motion.div>

            {/* Next Recommended + Daily Goals Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Next Recommended */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Tiếp Theo
                </h2>
                {nextRecommended ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        {nextRecommended.type === 'exercise' ? (
                          <Code2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {nextRecommended.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {nextRecommended.type === 'exercise' ? 'Bài tập' : 'Bài học'}
                        </p>
                      </div>
                    </div>
                    <a
                      href={
                        nextRecommended.type === 'exercise'
                          ? `/exercises/${nextRecommended.id}`
                          : `/lessons/${nextRecommended.id}`
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
                    >
                      Tiếp tục
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Bạn đã hoàn thành tất cả! 🎉
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Daily Goals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Mục Tiêu Hôm Nay
                </h2>
                <DailyGoals goals={dailyGoals} />
              </motion.div>
            </div>

            {/* XP Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                XP 7 Ngày Qua
              </h2>
              <XpChart data={xpPerDay} />
            </motion.div>

            {/* Learning Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-500" />
                Lịch Học 30 Ngày
              </h2>
              <LearningCalendar calendar={learningCalendar} />
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-green-500" />
                  Đã học
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm bg-slate-200 dark:bg-slate-700" />
                  Chưa học
                </span>
              </div>
            </motion.div>
          </div>

          {/* ─── Right Column ─────────────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Recent Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Huy Hiệu Gần Đây
              </h2>
              <RecentBadges badges={recentBadges} />
            </motion.div>

            {/* Incomplete Exercises */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                Bài Tập Chưa Hoàn Thành
              </h2>
              {incompleteExercises.length > 0 ? (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {incompleteExercises.slice(0, 10).map((exercise, index) => (
                    <motion.a
                      key={exercise.exerciseId}
                      href={`/exercises/${exercise.exerciseId}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Code2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
                          Bài tập #{exercise.exerciseId}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Cấp {exercise.courseOrderIndex}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Tất cả bài tập đã hoàn thành! 🎉
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                Streak
              </h2>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-500">{user.currentStreak}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hiện tại</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{user.longestStreak}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dài nhất</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
