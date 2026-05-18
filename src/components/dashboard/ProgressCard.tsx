'use client';

import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/gamification/ProgressRing';
import { Zap, BookCheck } from 'lucide-react';

interface ProgressCardProps {
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  currentXP: number;
  xpToNextLevel: number;
  level: number;
}

export function ProgressCard({
  progress,
  completedLessons,
  totalLessons,
  currentXP,
  xpToNextLevel,
  level,
}: ProgressCardProps) {
  const xpInCurrentLevel = currentXP % xpToNextLevel;
  const xpRemaining = xpToNextLevel - xpInCurrentLevel;

  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <div className="flex flex-col items-center gap-6">
        {/* Progress Ring */}
        <div className="relative">
          <ProgressRing
            progress={progress}
            size={180}
            strokeWidth={12}
            color="var(--primary)"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{Math.round(progress)}%</span>
            <span className="text-sm text-muted">Hoàn thành</span>
          </div>
        </div>

        {/* XP to next level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full"
        >
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">
            {xpRemaining} XP đến Level {level + 1}
          </span>
        </motion.div>

        {/* Stats */}
        <div className="w-full grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <BookCheck className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">
                {completedLessons}/{totalLessons}
              </p>
              <p className="text-xs text-muted">Bài học đã hoàn thành</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-surface">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{currentXP}</p>
              <p className="text-xs text-muted">XP tổng cộng</p>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Level {level}</span>
            <span className="font-medium text-primary">
              {xpInCurrentLevel} / {xpToNextLevel} XP
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(xpInCurrentLevel / xpToNextLevel) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className="h-full gradient-bg rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;