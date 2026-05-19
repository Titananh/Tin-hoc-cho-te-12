'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Flame,
  Star,
  Zap,
  Target,
  TrendingUp,
  Award,
  Lock,
  Check,
  Calendar,
  ChevronRight,
  BookOpen,
  Code2,
  Users,
  Briefcase,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  badges,
  userAchievements,
  userStats,
  recentAchievements,
  milestoneTimeline,
} from '@/data/badges';

type AchievementCategory = 'all' | 'learning' | 'streak' | 'algorithm' | 'project' | 'social';

const categoryConfig: Record<AchievementCategory, { label: string; icon: typeof BookOpen }> = {
  all: { label: 'Tất cả', icon: Award },
  learning: { label: 'Học tập', icon: BookOpen },
  streak: { label: 'Streak', icon: Flame },
  algorithm: { label: 'Thuật toán', icon: Code2 },
  project: { label: 'Dự án', icon: Briefcase },
  social: { label: 'Cộng đồng', icon: Users },
};

const categoryFilters: AchievementCategory[] = ['all', 'learning', 'streak', 'algorithm', 'project', 'social'];

function getBadgeCategory(requirement: string): AchievementCategory {
  if (requirement.startsWith('complete_') && requirement.includes('lesson')) return 'learning';
  if (requirement.startsWith('streak_')) return 'streak';
  if (requirement.startsWith('solve_')) return 'algorithm';
  if (requirement.startsWith('complete_') && requirement.includes('project')) return 'project';
  if (requirement.startsWith('invite_')) return 'social';
  return 'learning';
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

interface StatCardProps {
  icon: typeof Trophy;
  value: string | number;
  label: string;
  color: string;
  index: number;
}

function StatCard({ icon: Icon, value, label, color, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 dark:from-slate-800 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
          {value}
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      </div>
    </motion.div>
  );
}

interface AchievementCardProps {
  badge: (typeof badges)[0];
  userAchievement: typeof userAchievements[string];
  index: number;
}

function AchievementCard({ badge, userAchievement, index }: AchievementCardProps) {
  const isUnlocked = userAchievement.earned_at !== null;
  const progress = userAchievement.progress;
  const target = userAchievement.target;
  const progressPercent = Math.min((progress / target) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative group cursor-pointer ${isUnlocked ? '' : 'opacity-70 hover:opacity-100'}`}
    >
      {/* Glow effect for unlocked badges */}
      {isUnlocked && (
        <div
          className="absolute -inset-1 rounded-2xl blur-md opacity-30"
          style={{ backgroundColor: badge.color }}
        />
      )}

      <div
        className={`relative rounded-2xl p-6 border transition-all duration-300 ${
          isUnlocked
            ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg'
            : 'bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700'
        }`}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundColor: isUnlocked ? `${badge.color}20` : 'rgba(128, 128, 128, 0.2)',
          }}
        >
          {isUnlocked ? badge.icon : <Lock className="w-6 h-6 text-slate-400" />}
        </div>

        {/* Name & Description */}
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
          {badge.name}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {badge.description}
        </p>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 dark:text-slate-400">
              {progress} / {target}
            </span>
            <span className="font-medium" style={{ color: badge.color }}>
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              className="h-full rounded-full"
              style={{ backgroundColor: isUnlocked ? badge.color : '#94A3B8' }}
            />
          </div>
        </div>

        {/* Date earned */}
        {isUnlocked && userAchievement.earned_at && (
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(userAchievement.earned_at)}</span>
          </div>
        )}

        {/* XP Reward badge */}
        <div
          className="absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${badge.color}20`,
            color: badge.color,
          }}
        >
          +{badge.xp_reward} XP
        </div>
      </div>
    </motion.div>
  );
}

interface TimelineItemProps {
  milestone: (typeof milestoneTimeline)[0];
  index: number;
  isLast: boolean;
}

function TimelineItem({ milestone, index, isLast }: TimelineItemProps) {
  const getIconForType = (type: string) => {
    switch (type) {
      case 'start':
        return <Star className="w-4 h-4" />;
      case 'milestone':
        return <Check className="w-4 h-4" />;
      default:
        return <Check className="w-4 h-4" />;
    }
  };

  const isMilestone = milestone.type === 'milestone';
  const isStart = milestone.type === 'start';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-4"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-5 top-10 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
      )}

      {/* Icon */}
      <div
        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          isStart
            ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
            : isMilestone
            ? 'bg-white dark:bg-slate-800 border-2 border-blue-500 text-blue-500'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
        }`}
      >
        {getIconForType(milestone.type)}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="text-xs text-slate-400 dark:text-slate-500 mb-1">
          {formatDate(milestone.date)}
        </div>
        <div className="font-medium text-slate-900 dark:text-white">
          {milestone.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementsPage() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all');

  const filteredBadges =
    selectedCategory === 'all'
      ? badges
      : badges.filter((badge) => getBadgeCategory(badge.requirement) === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Thành tựu
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Theo dõi hành trình chinh phục tri thức của bạn
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard
            icon={Award}
            value={userStats.totalAchievementsUnlocked}
            label="Thành tựu đã mở"
            color="#3B82F6"
            index={0}
          />
          <StatCard
            icon={Flame}
            value={userStats.currentStreak}
            label="Streak hiện tại"
            color="#EF4444"
            index={1}
          />
          <StatCard
            icon={TrendingUp}
            value={`${userStats.longestStreak} ngày`}
            label="Streak dài nhất"
            color="#22C55E"
            index={2}
          />
          <StatCard
            icon={Zap}
            value={formatNumber(userStats.totalXP)}
            label="Tổng XP"
            color="#F59E0B"
            index={3}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Achievement Cards Grid - 2 columns */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categoryFilters.map((category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {config.label}
                  </button>
                );
              })}
            </div>

            {/* Achievement Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredBadges.map((badge, index) => {
                  const userAch = userAchievements[badge.id] || {
                    badge_id: badge.id,
                    earned_at: null,
                    progress: 0,
                    target: 1,
                  };

                  return (
                    <AchievementCard
                      key={badge.id}
                      badge={badge}
                      userAchievement={userAch}
                      index={index}
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar - Timeline */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  Timeline thành tựu
                </h2>

                <div className="space-y-0">
                  {milestoneTimeline.map((milestone, index) => (
                    <TimelineItem
                      key={index}
                      milestone={milestone}
                      index={index}
                      isLast={index === milestoneTimeline.length - 1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Thành tựu gần đây
                </h2>

                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.badge_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl">
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-slate-900 dark:text-white truncate">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDate(achievement.earned_at)}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-500 dark:text-slate-400">
                      Tiến độ năm nay
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {userStats.totalAchievementsUnlocked} / {badges.length}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(userStats.totalAchievementsUnlocked / badges.length) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Next Milestone */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium opacity-80">Mục tiêu tiếp theo</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">Hoàn thành 50 bài học</h3>
                <p className="text-sm opacity-80 mb-4">
                  Còn 8 bài học nữa để đạt &quot;Bậc thầy kiến thức&quot;
                </p>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '84%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
                <div className="mt-2 text-sm opacity-80">42 / 50 bài học</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}