'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Flame,
  Zap,
  Lock,
  Star,
  Calendar,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { badges } from '@/data/content';
import { Badge, UserBadge } from '@/types';
import { Sidebar } from '@/components/layout/Sidebar';

type FilterTab = 'all' | 'earned' | 'locked';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Mock earned badges data - in real app this would come from useAuth or API
const mockUserBadges: UserBadge[] = [
  { id: 'ub-1', user_id: 'user-1', badge_id: 'badge-first-code', earned_at: '2024-01-15T10:30:00Z' },
  { id: 'ub-2', user_id: 'user-1', badge_id: 'badge-first-function', earned_at: '2024-01-16T14:20:00Z' },
  { id: 'ub-3', user_id: 'user-1', badge_id: 'badge-newbie', earned_at: '2024-01-16T15:00:00Z' },
  { id: 'ub-4', user_id: 'user-1', badge_id: 'badge-7-day-streak', earned_at: '2024-01-22T09:00:00Z' },
  { id: 'ub-5', user_id: 'user-1', badge_id: 'badge-python-debugger', earned_at: '2024-01-20T16:45:00Z' },
];

const requirementHints: Record<string, string> = {
  'complete_1_lesson': 'Hoàn thành 1 bài học',
  'complete_all_loops': 'Hoàn thành tất cả bài về vòng lặp',
  'solve_10_algorithms': 'Giải 10 bài thuật toán',
  'debug_5_times': 'Tự debug thành công 5 lần',
  'complete_oop_level': 'Hoàn thành chương OOP',
  'complete_3_projects': 'Hoàn thành 3 project',
  'maintain_7_day_streak': 'Học 7 ngày liên tiếp',
  'maintain_30_day_streak': 'Học 30 ngày liên tiếp',
  'write_first_code': 'Viết dòng code Python đầu tiên',
  'create_first_function': 'Tạo hàm Python đầu tiên',
  'complete_first_project': 'Hoàn thành project đầu tiên',
  'complete_all_levels': 'Hoàn thành toàn bộ khóa học',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

interface BadgeCardProps {
  badge: Badge;
  userBadge: UserBadge | undefined;
  index: number;
}

function BadgeCard({ badge, userBadge, index }: BadgeCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const isEarned = !!userBadge;

  return (
    <motion.div
      variants={item}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        className={`
          relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer
          ${isEarned
            ? 'bg-surface border-border hover:border-primary/50'
            : 'bg-surface/50 border-border/50 grayscale hover:grayscale-0'
          }
        `}
        whileHover={{ scale: 1.03, y: -4 }}
        style={{
          boxShadow: isEarned ? `0 0 20px ${badge.color}30` : undefined
        }}
      >
        {/* Lock overlay for locked badges */}
        {!isEarned && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-2xl z-10">
            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted" />
            </div>
          </div>
        )}

        {/* Badge icon */}
        <div
          className={`
            w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-3
            ${isEarned ? '' : 'opacity-50'}
          `}
          style={{ backgroundColor: `${badge.color}20` }}
        >
          {badge.icon}
        </div>

        {/* Badge info */}
        <div className="text-center space-y-1">
          <h3 className={`font-semibold text-sm ${isEarned ? '' : 'text-muted'}`}>
            {badge.name}
          </h3>
          <p className={`text-xs ${isEarned ? 'text-muted' : 'text-muted/60'}`}>
            {isEarned ? badge.description : requirementHints[badge.requirement] || badge.description}
          </p>
          
          {/* XP reward */}
          <div className={`
            inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
            ${isEarned ? 'bg-warning/10 text-warning' : 'bg-muted/50 text-muted'}
          `}>
            <Star className="w-3 h-3" />
            {badge.xp_reward} XP
          </div>

          {/* Earned date or locked state */}
          {isEarned ? (
            <div className="flex items-center justify-center gap-1 text-xs text-success">
              <Calendar className="w-3 h-3" />
              {formatDate(userBadge.earned_at)}
            </div>
          ) : (
            <p className="text-xs text-muted/60">Chưa đạt được</p>
          )}
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 pointer-events-none"
          >
            <div className="bg-foreground text-background px-4 py-3 rounded-xl shadow-lg max-w-xs">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-semibold text-sm">{badge.name}</h4>
                  <p className="text-xs opacity-80 mt-1">{badge.description}</p>
                  {!isEarned && (
                    <p className="text-xs opacity-60 mt-2">
                      Yêu cầu: {requirementHints[badge.requirement] || 'Không xác định'}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function BadgesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Calculate badge stats
  const badgeStats = useMemo(() => {
    const earnedIds = mockUserBadges.map(ub => ub.badge_id);
    const earnedBadges = mockUserBadges.map(ub => ({
      ...badges.find(b => b.id === ub.badge_id)!,
      userBadge: ub
    })).filter(b => b.id);

    const totalXPFromBadges = earnedBadges.reduce((sum, b) => sum + b.xp_reward, 0);
    
    return {
      total: badges.length,
      earned: mockUserBadges.length,
      totalXPFromBadges,
      earnedPercentage: Math.round((mockUserBadges.length / badges.length) * 100)
    };
  }, []);

  // Filter badges based on active tab
  const filteredBadges = useMemo(() => {
    const earnedIds = mockUserBadges.map(ub => ub.badge_id);
    
    switch (activeTab) {
      case 'earned':
        return badges
          .filter(badge => earnedIds.includes(badge.id))
          .map(badge => ({
            badge,
            userBadge: mockUserBadges.find(ub => ub.badge_id === badge.id)
          }));
      case 'locked':
        return badges
          .filter(badge => !earnedIds.includes(badge.id))
          .map(badge => ({
            badge,
            userBadge: undefined
          }));
      default: // 'all'
        return badges.map(badge => ({
          badge,
          userBadge: mockUserBadges.find(ub => ub.badge_id === badge.id)
        }));
    }
  }, [activeTab]);

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'Tất cả', count: badges.length },
    { key: 'earned', label: 'Đã đạt', count: badgeStats.earned },
    { key: 'locked', label: 'Chưa đạt', count: badges.length - badgeStats.earned },
  ];

  // Calculate completion for set progress
  const badgesNeededForCompletion = badges.length - badgeStats.earned;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto space-y-6"
        >
          {/* Header */}
          <motion.div variants={item} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Huy Hiệu của tôi</h1>
                <p className="text-muted">Theo dõi thành tích và mục tiêu của bạn</p>
              </div>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total badges earned */}
            <div className="glass rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted">Huy hiệu đạt được</p>
                  <p className="text-2xl font-bold">
                    {badgeStats.earned} <span className="text-base font-normal text-muted">/ {badgeStats.total}</span>
                  </p>
                </div>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${badgeStats.earnedPercentage}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-warning rounded-full"
                />
              </div>
            </div>

            {/* Current streak */}
            <div className="glass rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-error" />
                </div>
                <div>
                  <p className="text-sm text-muted">Streak hiện tại</p>
                  <p className="text-2xl font-bold">
                    {user?.streak_count || 0} <span className="text-base font-normal text-muted">ngày</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Total XP earned */}
            <div className="glass rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted">Tổng XP từ huy hiệu</p>
                  <p className="text-2xl font-bold">
                    {badgeStats.totalXPFromBadges} <span className="text-base font-normal text-muted">XP</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all
                  ${activeTab === tab.key
                    ? 'gradient-bg text-white shadow-lg'
                    : 'bg-surface text-muted hover:bg-muted/50 border border-border'
                  }
                `}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </motion.div>

          {/* Badge Grid */}
          <motion.div variants={item}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredBadges.map((item, index) => (
                  <BadgeCard
                    key={item.badge.id}
                    badge={item.badge}
                    userBadge={item.userBadge}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Progress Section */}
          {badgesNeededForCompletion > 0 && (
            <motion.div variants={item} className="mt-8">
              <div className="glass rounded-2xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">Tiến độ bộ sưu tập</h3>
                  </div>
                  <span className="text-sm text-muted">
                    {badgeStats.earned}/{badges.length} huy hiệu
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${badgeStats.earnedPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full gradient-bg rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{badgeStats.earnedPercentage}%</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className="text-muted">
                    Còn <span className="font-semibold text-foreground">{badgesNeededForCompletion}</span> huy hiệu để hoàn thành bộ sưu tập
                  </p>
                  <button className="flex items-center gap-1 text-primary hover:underline">
                    Xem lộ trình <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* All Completed State */}
          {badgesNeededForCompletion === 0 && (
            <motion.div variants={item} className="mt-8">
              <div className="glass rounded-2xl p-8 border border-warning/30 bg-warning/5 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning/20 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-warning" />
                </div>
                <h3 className="text-xl font-bold mb-2">Chúc mừng bạn!</h3>
                <p className="text-muted">
                  Bạn đã hoàn thành tất cả huy hiệu. Tiếp tục phát huy nhé!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
}