'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Flame, BookOpen, Trophy, Settings, ChevronRight,
  Calendar, Edit3, Key, Bell, Palette, Award, CheckCircle2,
  Code, Clock, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme';
import { Sidebar } from '@/components/layout/Sidebar';
import { badges, courses } from '@/data/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Mock data for profile stats
const mockStats = {
  totalXP: 1250,
  currentStreak: 7,
  lessonsCompleted: 24,
  badgesEarned: 5,
  overallProgress: 42,
  memberSince: '2024-01-15',
};

const levelProgress = [
  { level: 1, title: 'Nhập môn Python', completed: true, completedAt: '2024-01-20', progress: 100 },
  { level: 2, title: 'Điều kiện và Vòng lặp', completed: true, completedAt: '2024-02-15', progress: 100 },
  { level: 3, title: 'Cấu trúc dữ liệu cơ bản', completed: true, completedAt: '2024-03-10', progress: 100 },
  { level: 4, title: 'Hàm và Tư duy lập trình', completed: false, completedAt: null, progress: 65 },
  { level: 5, title: 'Xử lý file và Ngoại lệ', completed: false, completedAt: null, progress: 30 },
  { level: 6, title: 'Lập trình hướng đối tượng', completed: false, completedAt: null, progress: 0 },
  { level: 7, title: 'Thuật toán cho học sinh lớp 12', completed: false, completedAt: null, progress: 0 },
  { level: 8, title: 'Python nâng cao', completed: false, completedAt: null, progress: 0 },
  { level: 9, title: 'Ứng dụng thực tế', completed: false, completedAt: null, progress: 0 },
  { level: 10, title: 'Dự án cuối khóa', completed: false, completedAt: null, progress: 0 },
];

const recentActivity = [
  { id: 1, type: 'lesson', title: 'Hoàn thành: Các kiểu dữ liệu cơ bản', date: '2024-05-15', xp: 100 },
  { id: 2, type: 'exercise', title: 'Nộp bài: Tính điểm trung bình', date: '2024-05-14', xp: 50, status: 'accepted' },
  { id: 3, type: 'badge', title: 'Nhận huy hiệu: 7 ngày học liên tiếp', date: '2024-05-13', xp: 100 },
  { id: 4, type: 'lesson', title: 'Hoàn thành: Biến là gì?', date: '2024-05-12', xp: 75 },
  { id: 5, type: 'exercise', title: 'Nộp bài: Tính tổng từ 1 đến n', date: '2024-05-11', xp: 50, status: 'accepted' },
];

const earnedBadges = [
  { ...badges[0], earned_at: '2024-01-20' },
  { ...badges[6], earned_at: '2024-02-01' },
  { ...badges[8], earned_at: '2024-02-15' },
  { ...badges[9], earned_at: '2024-03-10' },
  { ...badges[1], earned_at: '2024-04-05' },
];

const settingsLinks = [
  { icon: Edit3, label: 'Chỉnh sửa hồ sơ', href: '/settings/profile' },
  { icon: Key, label: 'Đổi mật khẩu', href: '/settings/password' },
  { icon: Bell, label: 'Cài đặt thông báo', href: '/settings/notifications' },
  { icon: Palette, label: 'Tùy chọn giao diện', href: '/settings/theme' },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { theme } = useTheme();

  const xpForNextLevel = useMemo(() => {
    return user ? (user.level + 1) * 500 : 500;
  }, [user?.level]);

  const xpProgress = useMemo(() => {
    if (!user) return 0;
    return ((user.xp % 500) / 500) * 100;
  }, [user?.xp]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Profile Header */}
          <motion.div variants={item}>
            <div className="glass rounded-3xl p-6 md:p-8 border border-border">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    {initials}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold border-4 border-surface">
                    {user?.level}
                  </div>
                </motion.div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-bold mb-1"
                  >
                    {user?.name}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted mb-4"
                  >
                    {user?.email}
                  </motion.p>

                  {/* Level Badge with Progress */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
                  >
                    <Trophy className="w-5 h-5" />
                    <span className="font-semibold">Level {user?.level}</span>
                    <span className="text-sm text-muted">• Python Master</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted"
                  >
                    <Calendar className="w-4 h-4 inline mr-1" />
                    <span>Tham gia từ {formatDate(mockStats.memberSince)}</span>
                  </motion.div>
                </div>

                {/* XP Progress */}
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  transition={{ delay: 0.4 }}
                  className="w-full md:w-64"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted">Level {user?.level}</span>
                    <span className="font-medium text-primary">{user?.xp} / {xpForNextLevel} XP</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                      className="h-full gradient-bg rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted mt-2 text-right">
                    Còn {xpForNextLevel - (user?.xp || 0) % xpForNextLevel} XP để lên level tiếp
                  </p>
                </motion.div>

                {/* Edit Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Sửa hồ sơ</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={item}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-warning" />
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockStats.totalXP}</p>
                <p className="text-sm text-muted">Tổng XP</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center mb-3">
                  <Flame className="w-6 h-6 text-error" />
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockStats.currentStreak}</p>
                <p className="text-sm text-muted">Ngày streak</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockStats.lessonsCompleted}</p>
                <p className="text-sm text-muted">Bài học hoàn thành</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl md:text-3xl font-bold">{mockStats.badgesEarned}</p>
                <p className="text-sm text-muted">Huy hiệu đã đạt</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Two Column Layout for larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Achievements Section */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5 text-warning" />
                    Huy hiệu đã đạt được
                  </h3>
                  <button className="text-xs text-primary hover:underline flex items-center gap-1">
                    Xem tất cả
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                  {earnedBadges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex-shrink-0 flex flex-col items-center p-4 rounded-xl bg-surface hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: `${badge.color}20` }}
                      >
                        {badge.icon}
                      </div>
                      <span className="text-sm font-medium text-center">{badge.name}</span>
                      <span className="text-xs text-muted">{badge.xp_reward} XP</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Learning Progress */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Tiến độ học tập
                  </h3>
                  <span className="text-sm font-medium text-primary">{mockStats.overallProgress}%</span>
                </div>

                {/* Overall Progress Bar */}
                <div className="h-4 bg-muted rounded-full overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${mockStats.overallProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                    className="h-full gradient-bg rounded-full"
                  />
                </div>

                {/* Per-Level Progress */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {levelProgress.map((level) => (
                    <div key={level.level} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-surface">
                        {level.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <span className="text-muted">{level.level}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="truncate">{level.title}</span>
                          <span className="text-muted text-xs">{level.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${level.progress}%`,
                              backgroundColor: level.completed ? '#10B981' : '#3B82F6',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Activity Timeline */}
          <motion.div variants={item}>
            <div className="glass rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Hoạt động gần đây
                </h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative flex items-start gap-4 pl-10"
                    >
                      {/* Timeline Dot */}
                      <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-surface ${
                        activity.type === 'lesson' ? 'bg-primary' :
                        activity.type === 'exercise' ? 'bg-success' :
                        'bg-warning'
                      }`} />

                      {/* Activity Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'lesson' ? 'bg-primary/10' :
                        activity.type === 'exercise' ? 'bg-success/10' :
                        'bg-warning/10'
                      }`}>
                        {activity.type === 'lesson' ? (
                          <BookOpen className="w-5 h-5 text-primary" />
                        ) : activity.type === 'exercise' ? (
                          <Code className="w-5 h-5 text-success" />
                        ) : (
                          <Trophy className="w-5 h-5 text-warning" />
                        )}
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted">{formatDate(activity.date)}</span>
                          {activity.status && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              activity.status === 'accepted'
                                ? 'bg-success/10 text-success'
                                : 'bg-error/10 text-error'
                            }`}>
                              {activity.status === 'accepted' ? 'Đã chấp nhận' : 'Bị từ chối'}
                            </span>
                          )}
                          <span className="text-xs text-warning font-medium">+{activity.xp} XP</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings Links */}
          <motion.div variants={item}>
            <div className="glass rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Settings className="w-5 h-5 text-muted" />
                  Cài đặt
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {settingsLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-surface hover:bg-muted/50 transition-colors text-left group"
                  >
                    <link.icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                    <span className="font-medium text-sm">{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted ml-auto group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Theme Toggle (for demo) */}
          <motion.div variants={item} className="flex justify-center">
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-border text-sm text-muted hover:text-foreground transition-colors"
            >
              <Palette className="w-4 h-4" />
              <span>Chế độ: {theme === 'dark' ? 'Tối' : 'Sáng'}</span>
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}