'use client';

import { motion } from 'framer-motion';
import { Flame, Trophy } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  longestStreak: number;
}

export function StreakCounter({ streak, longestStreak }: StreakCounterProps) {
  const hasActiveStreak = streak > 0;

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-2 rounded-xl glass"
      whileHover={{ scale: 1.02 }}
    >
      {/* Flame icon with animation */}
      <div className="relative">
        {hasActiveStreak ? (
          <>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-orange-500/50 rounded-full blur-md"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            {/* Flame icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Flame
                className="w-8 h-8 text-orange-500 drop-shadow-lg"
                fill="currentColor"
              />
            </motion.div>
          </>
        ) : (
          <Flame className="w-8 h-8 text-slate-400" />
        )}
      </div>

      {/* Streak count */}
      <div className="flex flex-col">
        <motion.span
          className="text-2xl font-bold text-foreground"
          animate={hasActiveStreak ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {streak}
        </motion.span>
        <span className="text-xs text-muted">
          {streak === 1 ? 'day streak' : 'day streak'}
        </span>
      </div>

      {/* Longest streak indicator */}
      {longestStreak > 0 && (
        <div className="flex items-center gap-1 ml-2 pl-3 border-l border-border">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-muted">{longestStreak}</span>
        </div>
      )}
    </motion.div>
  );
}

export default StreakCounter;