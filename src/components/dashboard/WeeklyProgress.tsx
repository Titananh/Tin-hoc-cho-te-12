'use client';

import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface DayProgress {
  day: string;
  xp: number;
  isToday: boolean;
}

interface WeeklyProgressProps {
  weeklyData: DayProgress[];
  totalXPThisWeek: number;
}

export function WeeklyProgress({ weeklyData, totalXPThisWeek }: WeeklyProgressProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const maxXP = Math.max(...weeklyData.map(d => d.xp), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl' 
          : 'bg-white/70 border border-white/30 shadow-lg'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-fuchsia-500/5" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20' 
                  : 'bg-gradient-to-br from-violet-100 to-fuchsia-100'
              }`}
            >
              <TrendingUp className={`w-5 h-5 ${
                isDark ? 'text-violet-400' : 'text-violet-600'
              }`} />
            </motion.div>
            <div>
              <h3 className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Tiến độ tuần này
              </h3>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {totalXPThisWeek} XP tổng cộng
              </p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-32 px-2">
          {weeklyData.map((day, index) => {
            const barHeight = Math.max((day.xp / maxXP) * 100, day.xp > 0 ? 20 : 5);
            const isToday = day.isToday;
            
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100%' }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="flex-1 flex flex-col items-center gap-2"
                style={{ height: '100%' }}
              >
                {/* XP Label */}
                <span className={`text-xs font-medium ${
                  isToday 
                    ? isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'
                    : isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {day.xp > 0 ? day.xp : ''}
                </span>
                
                {/* Bar */}
                <div className="w-full flex-1 flex items-end justify-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeight}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className={`w-full rounded-t-lg transition-all duration-300 ${
                      isToday
                        ? isDark
                          ? 'bg-gradient-to-t from-fuchsia-500 to-violet-500 shadow-lg shadow-fuchsia-500/30'
                          : 'bg-gradient-to-t from-fuchsia-500 to-violet-500 shadow-lg shadow-fuchsia-300/50'
                        : isDark
                          ? 'bg-gradient-to-t from-violet-600/60 to-purple-600/60'
                          : 'bg-gradient-to-t from-violet-300 to-purple-300'
                    }`}
                    whileHover={{ scaleY: 1.05 }}
                  />
                </div>
                
                {/* Day Label */}
                <span className={`text-xs font-medium ${
                  isToday
                    ? isDark ? 'text-fuchsia-400' : 'text-fuchsia-600'
                    : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {day.day}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            isDark ? 'bg-fuchsia-500' : 'bg-fuchsia-500'
          }`} />
          <span className={`text-xs ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Hôm nay
          </span>
        </div>
      </div>
    </motion.div>
  );
}