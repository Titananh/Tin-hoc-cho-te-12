'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface StreakDisplayProps {
  /** Current streak count in days */
  currentStreak: number;
  /** Longest streak ever achieved */
  longestStreak: number;
  /** Array of dates (ISO strings) when user was active in last 30 days */
  activeDays: string[];
  /** Optional className */
  className?: string;
}

/**
 * Shows current streak count with flame icon,
 * streak calendar (30 days, green/gray dots),
 * and longest streak display.
 * Vietnamese labels throughout.
 */
export function StreakDisplay({
  currentStreak,
  longestStreak,
  activeDays,
  className = '',
}: StreakDisplayProps) {
  // Generate last 30 days calendar
  const calendarDays = useMemo(() => {
    const days: { date: string; isActive: boolean; label: string }[] = [];
    const today = new Date();

    // Normalize active days to date-only strings
    const activeDateSet = new Set(
      activeDays.map((d) => {
        const date = new Date(d);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      })
    );

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const dayLabel = `${date.getDate()}/${date.getMonth() + 1}`;

      days.push({
        date: dateStr,
        isActive: activeDateSet.has(dateStr),
        label: dayLabel,
      });
    }

    return days;
  }, [activeDays]);

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {/* Header with streak count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Flame icon */}
          <motion.div
            animate={currentStreak > 0 ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              currentStreak > 0
                ? 'bg-orange-100 dark:bg-orange-900/30'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <svg
              className={`h-7 w-7 ${
                currentStreak > 0 ? 'text-orange-500' : 'text-gray-400'
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 23c-3.866 0-7-3.134-7-7 0-2.812 1.631-5.238 4-6.414V4c0-.552.448-1 1-1s1 .448 1 1v5.586c2.369 1.176 4 3.602 4 6.414 0 3.866-3.134 7-7 7zm-1.5-7a1.5 1.5 0 1 0 3 0c0-1.5-1.5-3-1.5-3s-1.5 1.5-1.5 3z" />
              <path d="M12 2C9.243 2 7 4.243 7 7c0 1.643.8 3.097 2.025 4.006A8.943 8.943 0 0 1 12 10c1.07 0 2.09.188 3.04.531C16.2 9.5 17 8.1 17 7c0-2.757-2.243-5-5-5z" opacity="0.5" />
            </svg>
          </motion.div>

          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentStreak} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">ngày</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Chuỗi hiện tại
            </p>
          </div>
        </div>

        {/* Longest streak */}
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {longestStreak}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Kỷ lục
          </p>
        </div>
      </div>

      {/* 30-day calendar */}
      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
          Hoạt động 30 ngày qua
        </p>
        <div className="grid grid-cols-10 gap-1.5">
          {calendarDays.map((day) => (
            <div
              key={day.date}
              title={`${day.label} - ${day.isActive ? 'Đã hoạt động' : 'Không hoạt động'}`}
              className={`h-5 w-5 rounded-sm transition-colors ${
                day.isActive
                  ? 'bg-green-500 dark:bg-green-400'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-sm bg-green-500 dark:bg-green-400" />
            <span>Đã hoạt động</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-sm bg-gray-200 dark:bg-gray-600" />
            <span>Không hoạt động</span>
          </div>
        </div>
      </div>

      {/* Motivational message */}
      {currentStreak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20"
        >
          <p className="text-xs text-orange-700 dark:text-orange-300">
            {currentStreak >= 30
              ? '🔥 Tuyệt vời! Bạn đã duy trì chuỗi hơn 1 tháng!'
              : currentStreak >= 7
              ? '🔥 Xuất sắc! Tiếp tục duy trì chuỗi nhé!'
              : '🔥 Hãy tiếp tục học mỗi ngày để duy trì chuỗi!'}
          </p>
        </motion.div>
      )}

      {currentStreak === 0 && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Hãy hoàn thành một bài học hoặc bài tập hôm nay để bắt đầu chuỗi mới! 💪
          </p>
        </div>
      )}
    </div>
  );
}

export default StreakDisplay;
