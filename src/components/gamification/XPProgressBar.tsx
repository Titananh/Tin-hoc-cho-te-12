'use client';

import { motion } from 'framer-motion';

interface XPProgressBarProps {
  /** Current total XP */
  currentXP: number;
  /** Current level */
  level: number;
  /** Whether to show the level badge */
  showLevelBadge?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional className */
  className?: string;
}

/**
 * Calculates XP thresholds based on the level formula:
 * level = floor(sqrt(total_XP / 100))
 * So XP needed for level N = N^2 * 100
 */
function getXPForLevel(level: number): number {
  return level * level * 100;
}

/**
 * Shows current XP / XP needed for next level with animated progress bar.
 * Displays level badge and Vietnamese labels.
 */
export function XPProgressBar({
  currentXP,
  level,
  showLevelBadge = true,
  size = 'md',
  className = '',
}: XPProgressBarProps) {
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForLevel(level + 1);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const progress = Math.min(Math.max((xpInCurrentLevel / xpNeededForNext) * 100, 0), 100);

  const sizeConfig = {
    sm: {
      barHeight: 'h-2',
      text: 'text-xs',
      badge: 'h-6 w-6 text-xs',
      gap: 'gap-2',
    },
    md: {
      barHeight: 'h-3',
      text: 'text-sm',
      badge: 'h-8 w-8 text-sm',
      gap: 'gap-3',
    },
    lg: {
      barHeight: 'h-4',
      text: 'text-base',
      badge: 'h-10 w-10 text-base',
      gap: 'gap-4',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${config.gap} ${className}`}>
      {/* Level badge */}
      {showLevelBadge && (
        <div
          className={`flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 font-bold text-white shadow-sm ${config.badge}`}
          title={`Cấp ${level}`}
        >
          {level}
        </div>
      )}

      {/* Progress section */}
      <div className="flex-1 min-w-0">
        {/* Labels */}
        <div className={`flex items-center justify-between mb-1 ${config.text}`}>
          <span className="text-gray-600 dark:text-gray-400">
            Cấp {level}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {xpInCurrentLevel.toLocaleString()} / {xpNeededForNext.toLocaleString()} XP
          </span>
        </div>

        {/* Progress bar */}
        <div className={`w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${config.barHeight}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          />
        </div>

        {/* XP to next level */}
        <div className={`mt-1 ${config.text} text-gray-500 dark:text-gray-400`}>
          <span>
            Còn {(xpNeededForNext - xpInCurrentLevel).toLocaleString()} XP để lên cấp {level + 1}
          </span>
        </div>
      </div>
    </div>
  );
}

export default XPProgressBar;
