'use client';

import { motion } from 'framer-motion';
import { Flame, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface WelcomeCardProps {
  userName: string;
  level: number;
  currentXP: number;
  xpToNextLevel: number;
  streakCount: number;
}

export function WelcomeCard({
  userName,
  level,
  currentXP,
  xpToNextLevel,
  streakCount,
}: WelcomeCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const progressPercent = Math.min((currentXP / xpToNextLevel) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl' 
          : 'bg-white/70 border border-white/30 shadow-lg'
      }`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent" />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-sm font-medium mb-1 ${
                isDark ? 'text-purple-300' : 'text-indigo-600'
              }`}
            >
              Chào mừng quay trở lại
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {userName} 👋
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isDark 
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200'
              }`}>
                Cấp {level}
              </span>
              <div className={`flex items-center gap-1 text-sm ${
                isDark ? 'text-amber-400' : 'text-amber-600'
              }`}>
                <Zap className="w-4 h-4" />
                <span>{currentXP} / {xpToNextLevel} XP</span>
              </div>
            </motion.div>

            {/* XP Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full h-2 rounded-full overflow-hidden"
            >
              <div className={`h-full rounded-full transition-all duration-500 ${
                isDark 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                  : 'bg-gradient-to-r from-indigo-400 to-purple-400'
              }`}
              style={{ width: `${progressPercent}%` }}
              />
            </motion.div>
          </div>

          {/* Streak Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            className={`flex flex-col items-center justify-center p-3 rounded-xl ${
              isDark 
                ? 'bg-gradient-to-b from-orange-500/20 to-red-500/20 border border-orange-500/30' 
                : 'bg-gradient-to-b from-orange-100 to-red-100 border border-orange-200'
            }`}
          >
            <Flame className={`w-8 h-8 ${
              streakCount > 0 
                ? isDark ? 'text-orange-400' : 'text-orange-500'
                : isDark ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <span className={`text-lg font-bold mt-1 ${
              isDark ? 'text-orange-400' : 'text-orange-600'
            }`}>
              {streakCount}
            </span>
            <span className={`text-xs ${
              isDark ? 'text-orange-300/70' : 'text-orange-500/70'
            }`}>
              ngày
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}