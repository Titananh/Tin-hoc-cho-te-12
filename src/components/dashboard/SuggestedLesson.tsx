'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface SuggestedLessonProps {
  lessonTitle: string;
  lessonDescription: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  xpReward: number;
  thumbnailUrl: string;
  onStart: () => void;
}

const difficultyConfig = {
  easy: {
    label: 'Dễ',
    color: (isDark: boolean) => isDark ? 'text-emerald-400 bg-emerald-500/20' : 'text-emerald-600 bg-emerald-100',
    barColor: (isDark: boolean) => isDark ? 'bg-emerald-500' : 'bg-emerald-400'
  },
  medium: {
    label: 'Trung bình',
    color: (isDark: boolean) => isDark ? 'text-amber-400 bg-amber-500/20' : 'text-amber-600 bg-amber-100',
    barColor: (isDark: boolean) => isDark ? 'bg-amber-500' : 'bg-amber-400'
  },
  hard: {
    label: 'Khó',
    color: (isDark: boolean) => isDark ? 'text-red-400 bg-red-500/20' : 'text-red-600 bg-red-100',
    barColor: (isDark: boolean) => isDark ? 'bg-red-500' : 'bg-red-400'
  },
};

export function SuggestedLesson({
  lessonTitle,
  lessonDescription,
  difficulty,
  estimatedMinutes,
  xpReward,
  thumbnailUrl,
  onStart,
}: SuggestedLessonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-shadow duration-300 ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10' 
          : 'bg-white/70 border border-white/30 shadow-lg hover:shadow-xl hover:shadow-cyan-500/10'
      }`}
    >
      {/* AI Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-50" />

      <div className="relative p-5">
        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 mb-4"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(34, 211, 238, 0.3)',
                '0 0 20px rgba(34, 211, 238, 0.5)',
                '0 0 10px rgba(34, 211, 238, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              isDark
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30'
                : 'bg-gradient-to-r from-cyan-100 to-purple-100 border border-cyan-200'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`} />
            <span className={`text-xs font-semibold ${
              isDark ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              Đề xuất AI
            </span>
          </motion.div>
        </motion.div>

        {/* Thumbnail */}
        <motion.div 
          className="relative w-full h-32 rounded-xl overflow-hidden mb-4"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={thumbnailUrl}
            alt={lessonTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Difficulty badge */}
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${difficultyInfo.color(isDark)}`}>
            {difficultyInfo.label}
          </div>
        </motion.div>

        {/* Content */}
        <h3 className={`font-semibold text-base mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {lessonTitle}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {lessonDescription}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {estimatedMinutes} phút
            </span>
            <span className={`text-sm font-semibold ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}>
              +{xpReward} XP
            </span>
          </div>
        </div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isDark
              ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg shadow-cyan-400/20'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Bắt đầu
        </motion.button>
      </div>
    </motion.div>
  );
}