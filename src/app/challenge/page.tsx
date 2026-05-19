'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Calendar,
  CheckCircle2,
  Lock,
  Trophy,
  Zap,
  Target,
  Star,
} from 'lucide-react';

interface DailyChallenge {
  date: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  problemSlug: string;
  completed?: boolean;
}

const DIFFICULTY_LABEL = { easy: 'Dễ', medium: 'TB', hard: 'Khó' };
const DIFFICULTY_COLOR = {
  easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

// Generate calendar of last 30 days with synthetic challenges (deterministic)
function buildCalendar(seed = 42): DailyChallenge[] {
  const challenges: Array<Omit<DailyChallenge, 'date' | 'completed'>> = [
    { title: 'Tổng 2 số', description: 'In ra tổng 2 số nguyên', difficulty: 'easy', xp: 10, problemSlug: 'tinh-tong-2-so' },
    { title: 'Chẵn lẻ', description: 'Kiểm tra số chẵn hay lẻ', difficulty: 'easy', xp: 10, problemSlug: 'kiem-tra-chan-le' },
    { title: 'Số nguyên tố', description: 'Kiểm tra số nguyên tố', difficulty: 'easy', xp: 20, problemSlug: 'kiem-tra-so-nguyen-to' },
    { title: 'Fibonacci', description: 'In số Fibonacci thứ N', difficulty: 'medium', xp: 30, problemSlug: 'fibonacci' },
    { title: 'Bảng cửu chương', description: 'In bảng cửu chương N', difficulty: 'easy', xp: 15, problemSlug: 'in-bang-cuu-chuong' },
    { title: 'GCD', description: 'Tìm ước chung lớn nhất', difficulty: 'easy', xp: 15, problemSlug: 'tim-uoc-chung-lon-nhat' },
    { title: 'Đảo chuỗi', description: 'Đảo ngược chuỗi', difficulty: 'easy', xp: 15, problemSlug: 'dao-nguoc-chuoi' },
  ];

  const result: DailyChallenge[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ch = challenges[i % challenges.length];
    // Deterministic pseudo-random: every 3rd past day completed, none today/recent
    const completed = i > 5 && (i + seed) % 3 !== 0;
    result.push({
      date: d.toISOString().split('T')[0],
      ...ch,
      completed,
    });
  }
  return result;
}

export default function ChallengePage() {
  const [calendar] = useState<DailyChallenge[]>(() => buildCalendar());
  const today = new Date().toISOString().split('T')[0];

  const todayChallenge = calendar[calendar.length - 1];
  const completedCount = calendar.filter((c) => c.completed).length;
  const currentStreak = calendar
    .slice()
    .reverse()
    .findIndex((c) => !c.completed && c.date !== today);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            Thử thách hàng ngày
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Mỗi ngày một bài tập mới. Hoàn thành để duy trì streak và tích XP đặc biệt.
          </p>
        </motion.div>

        {/* Stats banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Flame className="w-4 h-4" /> Streak hiện tại
            </div>
            <div className="text-4xl font-bold mt-1">{currentStreak >= 0 ? currentStreak : 0}</div>
            <div className="text-sm opacity-90 mt-1">ngày liên tiếp</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Trophy className="w-4 h-4" /> Đã hoàn thành
            </div>
            <div className="text-4xl font-bold mt-1">
              {completedCount}<span className="text-xl opacity-75">/30</span>
            </div>
            <div className="text-sm opacity-90 mt-1">trong 30 ngày qua</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-lg"
          >
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Zap className="w-4 h-4" /> XP từ challenge
            </div>
            <div className="text-4xl font-bold mt-1">
              {calendar.reduce((sum, c) => (c.completed ? sum + c.xp : sum), 0)}
            </div>
            <div className="text-sm opacity-90 mt-1">điểm kinh nghiệm</div>
          </motion.div>
        </div>

        {/* Today's challenge highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-orange-200 dark:border-orange-900/40 shadow-lg mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-semibold mb-2">
                <Target className="w-3.5 h-3.5" />
                Thử thách hôm nay
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {todayChallenge.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {todayChallenge.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold ${
                    DIFFICULTY_COLOR[todayChallenge.difficulty]
                  }`}
                >
                  {DIFFICULTY_LABEL[todayChallenge.difficulty]}
                </span>
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> +{todayChallenge.xp} XP
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" /> +50 XP bonus streak
                </span>
              </div>
            </div>
            <Link
              href={`/practice/${todayChallenge.problemSlug}`}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md whitespace-nowrap"
            >
              Bắt đầu →
            </Link>
          </div>
        </motion.div>

        {/* 30-day calendar grid */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Lịch sử 30 ngày qua
          </h2>
          <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
            {calendar.map((c, i) => {
              const day = parseInt(c.date.split('-')[2], 10);
              const isToday = c.date === today;
              return (
                <Link
                  key={c.date}
                  href={`/practice/${c.problemSlug}`}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all hover:scale-105 ${
                    isToday
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white ring-2 ring-orange-300 shadow-md'
                      : c.completed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                  title={`${c.date} - ${c.title} (${DIFFICULTY_LABEL[c.difficulty]})`}
                >
                  <span className="font-bold">{day}</span>
                  {c.completed && !isToday && <CheckCircle2 className="w-3 h-3 mt-0.5" />}
                  {isToday && <Flame className="w-3 h-3 mt-0.5" />}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-gradient-to-br from-orange-500 to-red-500" />
              Hôm nay
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-green-100 dark:bg-green-900/30" />
              Đã hoàn thành
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-700" />
              Chưa làm
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
