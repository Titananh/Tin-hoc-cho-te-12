'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Trophy, Star, Target, Zap, Crown,
  TrendingUp, Calendar, Award, Lock, CheckCircle2,
  Sparkles, Gift, Clock,
} from 'lucide-react';
import {
  getGamificationState,
  checkStreak,
  getLevel,
  getLevelTitle,
  getXPToNextLevel,
  type GamificationState,
  type Achievement,
} from '@/lib/gamification-store';

const RARITY_COLORS = {
  common: { bg: 'from-slate-500/20 to-slate-600/20', border: 'border-slate-400/30', text: 'text-slate-300', label: 'Phổ biến', glow: '' },
  rare: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-400/30', text: 'text-blue-300', label: 'Hiếm', glow: 'shadow-blue-500/20' },
  epic: { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30', text: 'text-purple-300', label: 'Sử thi', glow: 'shadow-purple-500/20' },
  legendary: { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-400/30', text: 'text-yellow-300', label: 'Huyền thoại', glow: 'shadow-yellow-500/30' },
};

const RANK_GRADIENTS: Record<string, string> = {
  bronze: 'from-amber-700 to-orange-800',
  silver: 'from-slate-300 to-slate-500',
  gold: 'from-yellow-400 to-amber-500',
  platinum: 'from-cyan-200 to-blue-400',
  diamond: 'from-blue-300 to-purple-400',
  master: 'from-red-500 to-orange-500',
};

export default function RewardsPage() {
  const [state, setState] = useState<GamificationState | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    checkStreak();
    setState(getGamificationState());
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const xpProgress = getXPToNextLevel(state.totalXP);
  const levelTitle = getLevelTitle(state.level);

  const filteredAchievements = selectedCategory === 'all'
    ? state.achievements
    : state.achievements.filter((a) => a.category === selectedCategory);

  const unlockedCount = state.unlockedAchievements.length;
  const totalCount = state.achievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Phần Thưởng & Thành Tựu
            </h1>
            <p className="text-slate-400 mt-2">Hành trình chinh phục Python của bạn</p>
          </motion.div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rank Card */}
            <RankCard state={state} />
            {/* XP & Level Card */}
            <XPCard state={state} xpProgress={xpProgress} levelTitle={levelTitle} />
            {/* Streak Card */}
            <StreakCard state={state} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Weekly Goals */}
        <WeeklyGoalsSection state={state} />

        {/* Achievements */}
        <AchievementsSection
          state={state}
          filteredAchievements={filteredAchievements}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          unlockedCount={unlockedCount}
          totalCount={totalCount}
        />

        {/* Activity Feed */}
        <ActivityFeed state={state} />

        {/* Stats Summary */}
        <StatsSummary state={state} />
      </div>
    </div>
  );
}


// ============================================================
// Sub-components
// ============================================================

function RankCard({ state }: { state: GamificationState }) {
  const gradient = RANK_GRADIENTS[state.rank.tier] || 'from-blue-500 to-purple-500';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
            {state.rank.icon}
          </div>
          <div>
            <p className="text-sm text-slate-400">Hạng hiện tại</p>
            <p className="text-xl font-bold">{state.rank.name}</p>
          </div>
        </div>

        {/* Progress to next rank */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{state.totalXP} XP</span>
            <span>{state.rank.maxXP === 999999 ? '∞' : `${state.rank.maxXP} XP`}</span>
          </div>
          <div className="h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${state.rank.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            />
          </div>
          <p className="text-xs text-slate-500 text-center">
            {state.rank.progress.toFixed(0)}% đến hạng tiếp theo
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function XPCard({ state, xpProgress, levelTitle }: { state: GamificationState; xpProgress: { current: number; needed: number; progress: number }; levelTitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400">Cấp độ</p>
            <p className="text-3xl font-bold text-white">{state.level}</p>
            <p className="text-xs text-blue-400 mt-0.5">{levelTitle}</p>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-700" />
              <motion.circle
                cx="32" cy="32" r="28" fill="none" stroke="url(#xpGradient)" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 28}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - xpProgress.progress / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>{xpProgress.current} / {xpProgress.needed} XP</span>
            <span>Level {state.level + 1}</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress.progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-slate-300">Tổng: <span className="font-semibold text-white">{state.totalXP.toLocaleString()} XP</span></span>
        </div>
      </div>
    </motion.div>
  );
}


function StreakCard({ state }: { state: GamificationState }) {
  const isActive = state.streak.current > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isActive ? 'from-orange-500/10 to-red-500/10' : 'from-slate-600/5 to-slate-700/5'}`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400">Streak hiện tại</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-white">{state.streak.current}</p>
              <p className="text-sm text-slate-400">ngày</p>
            </div>
          </div>
          <motion.div
            animate={isActive ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl"
          >
            {isActive ? '🔥' : '❄️'}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-700/30 rounded-lg p-2.5 text-center">
            <p className="text-slate-400 text-xs">Kỷ lục</p>
            <p className="font-bold text-orange-400">{state.streak.longest} ngày</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-2.5 text-center">
            <p className="text-slate-400 text-xs">Mốc tiếp theo</p>
            <p className="font-bold text-blue-400">
              {(() => {
                const next = state.streak.milestones.find((m) => !m.reached);
                return next ? `${next.days} ngày` : '✓ Tất cả';
              })()}
            </p>
          </div>
        </div>

        {/* Streak milestones mini */}
        <div className="mt-3 flex gap-1">
          {state.streak.milestones.map((m) => (
            <div
              key={m.days}
              className={`flex-1 h-1.5 rounded-full ${m.reached ? 'bg-orange-400' : 'bg-slate-700'}`}
              title={`${m.days} ngày`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function WeeklyGoalsSection({ state }: { state: GamificationState }) {
  const { weeklyGoals } = state;
  const problemsProgress = Math.min(100, (weeklyGoals.problemsDone / weeklyGoals.problemsTarget) * 100);
  const xpProgress = Math.min(100, (weeklyGoals.xpEarned / weeklyGoals.xpTarget) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-bold">Mục tiêu tuần</h2>
        {weeklyGoals.completed && (
          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
            ✓ Hoàn thành
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problems goal */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">Bài tập</span>
            </div>
            <span className="text-sm font-bold text-white">
              {weeklyGoals.problemsDone}/{weeklyGoals.problemsTarget}
            </span>
          </div>
          <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${problemsProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            />
          </div>
        </div>

        {/* XP goal */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-slate-300">XP kiếm được</span>
            </div>
            <span className="text-sm font-bold text-white">
              {weeklyGoals.xpEarned}/{weeklyGoals.xpTarget}
            </span>
          </div>
          <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}


function AchievementsSection({
  state,
  filteredAchievements,
  selectedCategory,
  setSelectedCategory,
  unlockedCount,
  totalCount,
}: {
  state: GamificationState;
  filteredAchievements: Achievement[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  unlockedCount: number;
  totalCount: number;
}) {
  const categories = [
    { id: 'all', label: 'Tất cả', icon: '🏆' },
    { id: 'learning', label: 'Học tập', icon: '📚' },
    { id: 'streak', label: 'Streak', icon: '🔥' },
    { id: 'speed', label: 'Tốc độ', icon: '⚡' },
    { id: 'mastery', label: 'Thành thạo', icon: '🧠' },
    { id: 'social', label: 'Mục tiêu', icon: '🎯' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          <h2 className="text-xl font-bold">Thành tựu</h2>
        </div>
        <span className="text-sm text-slate-400">
          {unlockedCount}/{totalCount} đã mở khóa
        </span>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => {
            const isUnlocked = state.unlockedAchievements.includes(achievement.id);
            const rarity = RARITY_COLORS[achievement.rarity];

            return (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.03 }}
                className={`relative rounded-xl p-4 border transition-all ${
                  isUnlocked
                    ? `bg-gradient-to-br ${rarity.bg} ${rarity.border} shadow-lg ${rarity.glow}`
                    : 'bg-slate-800/30 border-slate-700/30 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    isUnlocked ? 'bg-white/10' : 'bg-slate-700/50 grayscale'
                  }`}>
                    {isUnlocked ? achievement.icon : <Lock className="w-4 h-4 text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm truncate ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                        {achievement.title}
                      </p>
                      {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                    </div>
                    <p className={`text-xs mt-0.5 ${isUnlocked ? 'text-slate-300' : 'text-slate-600'}`}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${rarity.text} bg-white/5`}>
                        {rarity.label}
                      </span>
                      <span className="text-xs text-yellow-400/80">+{achievement.xpReward} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}


function ActivityFeed({ state }: { state: GamificationState }) {
  const recentActivities = state.activityLog.slice(0, 10);

  if (recentActivities.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-slate-400" />
          <h2 className="text-xl font-bold">Hoạt động gần đây</h2>
        </div>
        <div className="bg-slate-800/30 rounded-xl p-8 border border-slate-700/30 text-center">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">Chưa có hoạt động nào</p>
          <p className="text-slate-600 text-sm mt-1">Hãy giải bài tập để bắt đầu hành trình!</p>
        </div>
      </motion.section>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'problem_solved': return <Trophy className="w-4 h-4 text-blue-400" />;
      case 'lesson_completed': return <Star className="w-4 h-4 text-green-400" />;
      case 'streak_maintained': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'achievement_unlocked': return <Award className="w-4 h-4 text-yellow-400" />;
      case 'xp_earned': return <Zap className="w-4 h-4 text-purple-400" />;
      default: return <Star className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-bold">Hoạt động gần đây</h2>
      </div>

      <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 divide-y divide-slate-700/30">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={`${activity.timestamp}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300 truncate">{activity.description}</p>
              <p className="text-xs text-slate-500">{formatTime(activity.timestamp)}</p>
            </div>
            {activity.xp > 0 && (
              <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                +{activity.xp} XP
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function StatsSummary({ state }: { state: GamificationState }) {
  const stats = [
    { label: 'Bài tập đã giải', value: state.problemsSolved, icon: '📝', color: 'text-blue-400' },
    { label: 'Bài học hoàn thành', value: state.lessonsCompleted, icon: '📖', color: 'text-green-400' },
    { label: 'Streak dài nhất', value: `${state.streak.longest} ngày`, icon: '🔥', color: 'text-orange-400' },
    { label: 'Thành tựu', value: `${state.unlockedAchievements.length}/${state.achievements.length}`, icon: '🏆', color: 'text-yellow-400' },
    { label: 'Bài Hard đã giải', value: state.hardProblemsSolved, icon: '🧠', color: 'text-purple-400' },
    { label: 'Mục tiêu tuần hoàn thành', value: state.weeklyGoalsCompleted, icon: '🎯', color: 'text-cyan-400' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-bold">Thống kê tổng hợp</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
