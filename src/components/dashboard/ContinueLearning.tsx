'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTheme } from '@/lib/theme';

interface ContinueLearningProps {
  lessonTitle: string;
  lessonDescription: string;
  thumbnailUrl: string;
  progressPercent: number;
  onContinue: () => void;
}

export function ContinueLearning({
  lessonTitle,
  lessonDescription,
  thumbnailUrl,
  progressPercent,
  onContinue,
}: ContinueLearningProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl transition-shadow duration-300 ${
        isDark 
          ? 'bg-white/10 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10' 
          : 'bg-white/70 border border-white/30 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10'
      }`}
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <motion.div 
            className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={thumbnailUrl}
              alt={lessonTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-medium mb-1 ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}>
              Đang học
            </p>
            <h3 className={`font-semibold text-base mb-1 truncate ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {lessonTitle}
            </h3>
            <p className={`text-sm mb-3 line-clamp-2 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {lessonDescription}
            </p>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-white/10' : 'bg-gray-200'
              }`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className={`h-full rounded-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                      : 'bg-gradient-to-r from-indigo-400 to-purple-400'
                  }`}
                />
              </div>
              <span className={`text-xs font-medium ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className={`mt-4 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isDark
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          <Play className="w-4 h-4" />
          Tiếp tục
        </motion.button>
      </div>
    </motion.div>
  );
}