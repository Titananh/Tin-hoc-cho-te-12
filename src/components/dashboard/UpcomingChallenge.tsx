'use client';

import { motion } from 'framer-motion';
import { Trophy, Clock, Swords, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface UpcomingChallengeProps {
  challengeTitle: string;
  challengeDescription: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  startTime: Date;
  rewardXP: number;
  participantCount: number;
  onJoin: () => void;
}

const difficultyConfig = {
  easy: {
    label: 'Dễ',
    color: (isDark: boolean) => isDark ? 'text-emerald-400' : 'text-emerald-600',
    bgColor: (isDark: boolean) => isDark ? 'bg-emerald-500/20' : 'bg-emerald-100',
    borderColor: (isDark: boolean) => isDark ? 'border-emerald-500/30' : 'border-emerald-200'
  },
  medium: {
    label: 'Trung bình',
    color: (isDark: boolean) => isDark ? 'text-amber-400' : 'text-amber-600',
    bgColor: (isDark: boolean) => isDark ? 'bg-amber-500/20' : 'bg-amber-100',
    borderColor: (isDark: boolean) => isDark ? 'border-amber-500/30' : 'border-amber-200'
  },
  hard: {
    label: 'Khó',
    color: (isDark: boolean) => isDark ? 'text-red-400' : 'text-red-600',
    bgColor: (isDark: boolean) => isDark ? 'bg-red-500/20' : 'bg-red-100',
    borderColor: (isDark: boolean) => isDark ? 'border-red-500/30' : 'border-red-200'
  },
  extreme: {
    label: 'Cực khó',
    color: (isDark: boolean) => isDark ? 'text-fuchsia-400' : 'text-fuchsia-600',
    bgColor: (isDark: boolean) => isDark ? 'bg-fuchsia-500/20' : 'bg-fuchsia-100',
    borderColor: (isDark: boolean) => isDark ? 'border-fuchsia-500/30' : 'border-fuchsia-200'
  },
};

export function UpcomingChallenge({
  challengeTitle,
  challengeDescription,
  difficulty,
  startTime,
  rewardXP,
  participantCount,
  onJoin,
}: UpcomingChallengeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const difficultyInfo = difficultyConfig[difficulty];

  // Calculate time remaining
  const now = new Date();
  const timeDiff = startTime.getTime() - now.getTime();
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-shadow duration-300 ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10' 
          : 'bg-white/70 border border-white/30 shadow-lg hover:shadow-xl hover:shadow-orange-500/10'
      }`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-rose-500/10" />

      <div className="relative p-5">
        {/* Header with Challenge Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`p-3 rounded-xl ${
                isDark 
                  ? 'bg-gradient-to-br from-orange-500/20 to-rose-500/20' 
                  : 'bg-gradient-to-br from-orange-100 to-rose-100'
              }`}
            >
              <Swords className={`w-6 h-6 ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`} />
            </motion.div>
            <div>
              <h3 className={`font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Thử thách sắp tới
              </h3>
              <p className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {participantCount} người tham gia
              </p>
            </div>
          </div>

          {/* Timer */}
          <motion.div
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDark
                ? 'bg-rose-500/20 border border-rose-500/30'
                : 'bg-rose-100 border border-rose-200'
            }`}
          >
            <Clock className={`w-4 h-4 ${
              isDark ? 'text-rose-400' : 'text-rose-600'
            }`} />
            <span className={`text-sm font-semibold ${
              isDark ? 'text-rose-400' : 'text-rose-600'
            }`}>
              {hours > 0 ? `${hours}h ${minutes}p` : `${minutes}p`}
            </span>
          </motion.div>
        </div>

        {/* Challenge Content */}
        <div className={`p-4 rounded-xl mb-4 ${
          isDark ? 'bg-white/5' : 'bg-gray-50'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {challengeTitle}
          </h4>
          <p className={`text-sm mb-3 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {challengeDescription}
          </p>

          {/* Meta tags */}
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-md text-xs font-semibold ${difficultyInfo.color(isDark)} ${difficultyInfo.bgColor(isDark)}`}>
              {difficultyInfo.label}
            </span>
            <div className={`flex items-center gap-1 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">+{rewardXP} XP</span>
            </div>
          </div>
        </div>

        {/* Join Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onJoin}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isDark
              ? 'bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white shadow-lg shadow-orange-500/25'
              : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-lg shadow-orange-400/20'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Tham gia ngay
        </motion.button>
      </div>
    </motion.div>
  );
}