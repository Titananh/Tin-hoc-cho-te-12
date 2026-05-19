'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Bell,
  Trophy,
  Zap,
  Flame,
  CheckCircle2,
  Star,
  GraduationCap,
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'badge' | 'level' | 'streak' | 'lesson' | 'contest';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

const TYPE_ICON = {
  badge: Trophy,
  level: Star,
  streak: Flame,
  lesson: GraduationCap,
  contest: Zap,
};

const TYPE_COLOR = {
  badge: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
  level: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
  streak: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
  lesson: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
  contest: 'text-red-500 bg-red-50 dark:bg-red-900/20',
};

const SEED: Notification[] = [
  { id: 1, type: 'lesson', title: 'Chào mừng bạn!', message: 'Bắt đầu bài học đầu tiên ngay để nhận 50 XP và huy hiệu "Người mới bắt đầu".', createdAt: 'Vừa xong', read: false, href: '/learn/1/lessons/1' },
  { id: 2, type: 'contest', title: 'Cuộc thi mới: Thi Tin học 12 - Tháng 5/2026', message: 'Đăng ký ngay để giữ chỗ. Bắt đầu lúc 19:00 ngày 25/5.', createdAt: '1 giờ trước', read: false, href: '/contests' },
  { id: 3, type: 'streak', title: 'Đừng để mất streak!', message: 'Hoàn thành 1 bài tập hôm nay để giữ streak.', createdAt: '3 giờ trước', read: false, href: '/challenge' },
  { id: 4, type: 'badge', title: 'Huy hiệu mới đã sẵn sàng', message: 'Hoàn thành 10 bài tập để nhận huy hiệu "Học viên chăm chỉ".', createdAt: 'Hôm qua', read: true, href: '/achievements' },
  { id: 5, type: 'level', title: 'Sẵn sàng lên Cấp 2', message: 'Bạn còn 1 bài tập nữa là lên Cấp 2.', createdAt: '2 ngày trước', read: true, href: '/learn' },
];

function timeAgo(s: string): string {
  return s;
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(SEED);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'all' ? items : items.filter((n) => !n.read);
  const unreadCount = items.filter((n) => !n.read).length;

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bell className="w-7 h-7 text-blue-500" />
              Thông báo
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {unreadCount > 0
                ? `${unreadCount} thông báo chưa đọc`
                : 'Bạn đã đọc hết thông báo'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </motion.div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Tất cả ({items.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Chưa đọc ({unreadCount})
          </button>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-700">
              <Bell className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">
                {filter === 'unread' ? 'Không có thông báo chưa đọc' : 'Chưa có thông báo'}
              </p>
            </div>
          ) : (
            filtered.map((n, i) => {
              const Icon = TYPE_ICON[n.type];
              const Wrapper = n.href ? Link : 'div';
              return (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Wrapper
                    {...(n.href ? { href: n.href } : {})}
                    onClick={() => markRead(n.id)}
                    className={`flex gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border transition-shadow hover:shadow-md cursor-pointer ${
                      n.read
                        ? 'border-slate-200 dark:border-slate-700'
                        : 'border-blue-200 dark:border-blue-900/40 ring-1 ring-blue-100 dark:ring-blue-900/20'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        TYPE_COLOR[n.type]
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {n.title}
                        </h3>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                        {n.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{timeAgo(n.createdAt)}</p>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
