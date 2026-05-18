'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Star, Zap, Trophy, Target, BookOpen,
  CheckCircle2, Clock, TrendingUp, ChevronRight,
  Sparkles, Calendar, MessageCircle, Code
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Sidebar } from '@/components/layout/Sidebar';
import { badges, courses } from '@/data/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function getGreeting(hour: number): string {
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
}

const weeklyProgressData = [
  { day: 'T2', xp: 120 },
  { day: 'T3', xp: 85 },
  { day: 'T4', xp: 200 },
  { day: 'T5', xp: 150 },
  { day: 'T6', xp: 90 },
  { day: 'T7', xp: 180 },
  { day: 'CN', xp: 60 },
];

const dailyQuests = [
  { id: 1, title: 'Hoàn thành 1 bài học', icon: BookOpen, completed: true },
  { id: 2, title: 'Giải 3 bài tập', icon: Code, completed: false },
  { id: 3, title: 'Chat với AI Tutor', icon: MessageCircle, completed: false },
];

const userBadges = [
  { ...badges[0], earned_at: '2024-01-15' },
  { ...badges[8], earned_at: '2024-01-16' },
  { ...badges[6], earned_at: '2024-01-20' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = getGreeting(hour);

  const xpForNextLevel = useMemo(() => {
    return user ? (user.level + 1) * 500 : 500;
  }, [user?.level]);

  const currentLesson = courses[0]?.modules[0]?.lessons[0];
  const suggestedLesson = courses[0]?.modules[1]?.lessons[0];

  const maxXP = Math.max(...weeklyProgressData.map(d => d.xp));

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
            <h1 className="text-2xl md:text-3xl font-bold">
              {greeting}, <span className="gradient-text">{user?.name?.split(' ')[0] || 'Học sinh'}</span>! 👋
            </h1>
            <p className="text-muted mt-1">Hôm nay bạn muốn học gì nào?</p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Welcome Card */}
            <motion.div variants={item} className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 border border-border">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white text-xl font-bold">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{user?.name}</h2>
                        <p className="text-muted text-sm">Level {user?.level} • Python Master</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                          <Flame className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{user?.streak_count}</p>
                          <p className="text-xs text-muted">Ngày streak</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{user?.xp}</p>
                          <p className="text-xs text-muted">XP tổng</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{userBadges.length}</p>
                          <p className="text-xs text-muted">Huy hiệu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-64">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted">Level {user?.level}</span>
                      <span className="font-medium text-primary">{user?.xp} / {xpForNextLevel} XP</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(user ? user.xp % 500 : 0) / 5}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full gradient-bg rounded-full"
                      />
                    </div>
                    <p className="text-xs text-muted mt-2 text-right">
                      Còn {xpForNextLevel - (user?.xp || 0) % xpForNextLevel} XP để lên level tiếp
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Continue Learning */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Tiếp tục học
                  </h3>
                  <span className="text-xs text-muted bg-muted px-2 py-1 rounded-full">
                    Đang học
                  </span>
                </div>
                
                {currentLesson && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-lg">{currentLesson.title}</h4>
                      <p className="text-sm text-muted line-clamp-2">{currentLesson.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted">
                        <Clock className="w-4 h-4" />
                        {currentLesson.estimated_minutes} phút
                      </span>
                      <span className="flex items-center gap-1 text-warning">
                        <Star className="w-4 h-4" />
                        +{currentLesson.xp_reward} XP
                      </span>
                    </div>
                    
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-primary rounded-full" />
                    </div>
                    
                    <button className="w-full py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                      Tiếp tục học
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Daily Quest */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-error" />
                    Nhiệm vụ hôm nay
                  </h3>
                  <span className="text-xs text-muted">
                    1/3 hoàn thành
                  </span>
                </div>
                
                <div className="space-y-3">
                  {dailyQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        quest.completed
                          ? 'bg-success/10 border border-success/20'
                          : 'bg-surface hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        quest.completed ? 'bg-success text-white' : 'bg-muted'
                      }`}>
                        {quest.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <quest.icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`flex-1 font-medium ${
                        quest.completed ? 'text-success line-through' : ''
                      }`}>
                        {quest.title}
                      </span>
                      {quest.completed && (
                        <span className="text-xs text-success">+50 XP</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Weekly Progress */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Tiến độ tuần này
                  </h3>
                  <span className="text-xs text-muted">885 XP</span>
                </div>
                
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyProgressData.map((day, index) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col items-center">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.xp / maxXP) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="w-8 rounded-t-lg gradient-bg"
                        />
                      </div>
                      <span className="text-xs text-muted">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Recent Badges */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-warning" />
                    Huy hiệu gần đây
                  </h3>
                  <button className="text-xs text-primary hover:underline">Xem tất cả</button>
                </div>
                
                <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
                  {userBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex-shrink-0 flex flex-col items-center p-4 rounded-xl bg-surface hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2"
                        style={{ backgroundColor: `${badge.color}20` }}
                      >
                        {badge.icon}
                      </div>
                      <span className="text-sm font-medium text-center">{badge.name}</span>
                      <span className="text-xs text-muted">{badge.xp_reward} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Suggested Lesson */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-border h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-medium">Gợi ý cho bạn</span>
                  </div>
                  
                  {suggestedLesson && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">{suggestedLesson.title}</h4>
                      <p className="text-sm text-muted line-clamp-2">{suggestedLesson.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted">
                          <Clock className="w-4 h-4" />
                          {suggestedLesson.estimated_minutes} phút
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          suggestedLesson.difficulty === 'easy' ? 'bg-success/10 text-success' :
                          suggestedLesson.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                          'bg-error/10 text-error'
                        }`}>
                          {suggestedLesson.difficulty === 'easy' ? 'Dễ' :
                           suggestedLesson.difficulty === 'medium' ? 'Trung bình' : 'Khó'}
                        </span>
                      </div>
                      
                      <button className="w-full py-2.5 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                        Bắt đầu học
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Upcoming Challenge */}
            <motion.div variants={item}>
              <div className="glass rounded-2xl p-6 border border-gradient-to-r from-primary to-secondary h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Thử thách sắp tới
                  </h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    2 ngày nữa
                  </span>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Weekly Challenge #5</h4>
                  <p className="text-sm text-muted">Hoàn thành 5 bài tập về List và Dictionary để nhận phần thưởng đặc biệt!</p>
                  
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-warning" />
                      <span className="font-medium">500 XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-secondary" />
                      <span className="text-sm">Huy hiệu đặc biệt</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-2.5 rounded-xl bg-surface font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                    Xem chi tiết
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}