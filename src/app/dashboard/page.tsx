'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  Flame,
  Zap,
  Star,
  BookOpen,
  Code2,
  Trophy,
  Calendar,
  Target,
  ArrowRight,
  Award,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

import { getCurrentUser, type User as ClientUser } from '@/lib/client-auth';
import {
  getGamificationState,
  getLevelTitle,
  getXPToNextLevel,
  type GamificationState,
} from '@/lib/gamification-store';
import { getSolvedCount } from '@/lib/solved-tracker';

// ─── Helper Functions ────────────────────────────────────────────────────────

function getLevelColor(level: number): string {
  if (level >= 30) return '#F59E0B';
  if (level >= 20) return '#8B5CF6';
  if (level >= 10) return '#3B82F6';
  if (level >= 5) return '#10B981';
  if (level >= 2) return '#06B6D4';
  return '#6B7280';
}

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  return days[date.getDay()];
}

function build7DayXp(state: GamificationState): { date: string; xp: number }[] {
  const today = new Date();
  const result: { date: string; xp: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const xpThisDay = state.activityLog
      .filter((a) => a.timestamp.startsWith(dateStr))
      .reduce((sum, a) => sum + a.xp, 0);
    result.push({ date: dateStr, xp: xpThisDay });
  }
  return result;
}

function build30DayCalendar(state: GamificationState): { date: string; active: boolean }[] {
  const activeDates = new Set(state.activityLog.map((a) => a.timestamp.split('T')[0]));
  const today = new Date();
  const result: { date: string; active: boolean }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    result.push({ date: dateStr, active: activeDates.has(dateStr) });
  }
  return result;
}

// ─── Loading Skeleton ────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700" />
            <div className="flex-1">
              <div className="h-6 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-4 w-60 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </div>
        </div>
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

// ─── XP Bar Chart ────────────────────────────────────────────────────────────

function XpChart({ data }: { data: { date: string; xp: number }[] }) {
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

// ─── Learning Calendar ───────────────────────────────────────────────────────

function LearningCalendar({ calendar }: { calendar: { date: string; active: boolean }[] }) {
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
          title={day.date}
        >
          {new Date(day.date).getDate()}
        </div>
      ))}
    </div>
  );
}

// ─── Main Dashboard Page ─────────────────────────────────────────────────────

export default function DashboardPage() {
  const [authUser, setAuthUser] = useState<ClientUser | null>(null);
  const [state, setState] = useState<GamificationState | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    const u = getCurrentUser();
    setAuthUser(u);
    setState(getGamificationState());
    setSolvedCount(getSolvedCount());
  }, []);

  if (!authUser || !state) {
    return <DashboardSkeleton />;
  }

  const xpProgress = getXPToNextLevel(state.totalXP);
  const xpPerDay = build7DayXp(state);
  const calendar = build30DayCalendar(state);
  const recentBadges = state.unlockedAchievements
    .map((id) => state.achievements.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(-5)
    .reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 mb-6 shadow-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ring-4 ring-white dark:ring-slate-700 shadow-md flex-shrink-0">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Xin chào, {authUser.name}! 👋
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${getLevelColor(state.level)}20`,
                    color: getLevelColor(state.level),
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  Cấp {state.level} - {getLevelTitle(state.level)}
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  {state.totalXP.toLocaleString()} XP
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                  <Flame className="w-4 h-4 text-orange-500" />
                  {state.streak.current} ngày
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Tiến Độ Lên Cấp
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {xpProgress.current} / {xpProgress.needed} XP
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Cấp {state.level + 1}
                  </span>
                </div>
                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress.progress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Hạng:</span>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: `${state.rank.color}20`,
                      color: state.rank.color,
                    }}
                  >
                    {state.rank.icon} {state.rank.name}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" />
                  Tiếp Tục Học
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Hành trình tiếp theo của bạn đang chờ. Hãy chinh phục thêm bài học hôm nay!
                </p>
                <a
                  href="/learn"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity w-full justify-center"
                >
                  Vào trang học
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  Mục Tiêu Tuần
                </h2>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Bài tập</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {state.weeklyGoals.problemsDone}/{state.weeklyGoals.problemsTarget}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{
                          width: `${Math.min(100, (state.weeklyGoals.problemsDone / state.weeklyGoals.problemsTarget) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 dark:text-slate-400">XP</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {state.weeklyGoals.xpEarned}/{state.weeklyGoals.xpTarget}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-400"
                        style={{
                          width: `${Math.min(100, (state.weeklyGoals.xpEarned / state.weeklyGoals.xpTarget) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
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

            {/* Calendar */}
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
              <LearningCalendar calendar={calendar} />
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

          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Thành Tựu Gần Đây
              </h2>
              {recentBadges.length === 0 ? (
                <div className="text-center py-4">
                  <Award className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Chưa có thành tựu nào. Hãy hoàn thành bài học để mở khóa!
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentBadges.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50"
                    >
                      <div className="text-2xl">{b.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {b.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-500" />
                Thống Kê
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-green-500" /> Bài tập đã giải
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {state.problemsSolved}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" /> Bài học hoàn thành
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {state.lessonsCompleted}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Bài thực hành
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {solvedCount}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" /> Thành tựu
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {state.unlockedAchievements.length}/{state.achievements.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Streak */}
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
                  <p className="text-2xl font-bold text-orange-500">{state.streak.current}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hiện tại</p>
                </div>
                <div className="h-10 w-px bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{state.streak.longest}</p>
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
