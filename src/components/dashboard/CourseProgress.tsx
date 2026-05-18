'use client';

import { motion } from 'framer-motion';
import { Check, Lock, Sparkles } from 'lucide-react';

interface LevelProgress {
  level: number;
  completedLessons: number;
  totalLessons: number;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
}

interface CourseProgressProps {
  levels: LevelProgress[];
  currentLevel: number;
}

export function CourseProgress({ levels, currentLevel }: CourseProgressProps) {
  const getLevelIcon = (level: LevelProgress) => {
    if (level.isCompleted) {
      return <Check className="w-4 h-4 text-white" />;
    }
    if (level.isLocked) {
      return <Lock className="w-4 h-4 text-muted" />;
    }
    if (level.isCurrent) {
      return <Sparkles className="w-4 h-4 text-white" />;
    }
    return null;
  };

  const getLevelColor = (level: LevelProgress) => {
    if (level.isCompleted) return 'bg-success';
    if (level.isCurrent) return 'bg-primary animate-pulse-glow';
    if (level.isLocked) return 'bg-muted';
    return 'bg-secondary';
  };

  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Tiến độ khóa học
      </h3>

      {/* Level Progress */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-2 px-2">
        {levels.map((level, index) => (
          <motion.div
            key={level.level}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group flex-shrink-0"
          >
            {/* Level Node */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  ${level.isCompleted || level.isCurrent || !level.isLocked 
                    ? getLevelColor(level) 
                    : 'bg-muted'
                  }
                  ${level.isCurrent ? 'ring-4 ring-primary/30' : ''}
                  ${level.isLocked ? 'opacity-60' : ''}
                `}
              >
                {getLevelIcon(level)}

                {/* Pulse animation for current level */}
                {level.isCurrent && (
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
              </motion.div>

              {/* Level Label */}
              <span className={`
                mt-2 text-xs font-medium
                ${level.isCompleted ? 'text-success' : ''}
                ${level.isCurrent ? 'text-primary' : ''}
                ${level.isLocked ? 'text-muted' : ''}
              `}>
                {level.level}
              </span>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-surface-elevated dark:bg-slate-800 px-3 py-2 rounded-lg shadow-lg border border-border whitespace-nowrap">
                  <p className="text-sm font-medium text-foreground">Level {level.level}</p>
                  <p className="text-xs text-muted">
                    {level.isLocked
                      ? 'Chưa mở khóa'
                      : `${level.completedLessons}/${level.totalLessons} bài học`
                    }
                  </p>
                  {level.isCurrent && (
                    <p className="text-xs text-primary mt-1">Đang học</p>
                  )}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < levels.length - 1 && (
              <div className={`
                absolute top-6 left-full w-2 h-0.5 -translate-x-1/2
                ${level.isCompleted ? 'bg-success' : 'bg-border'}
              `} />
            )}
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-muted">Hoàn thành</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-muted">Đang học</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span className="text-xs text-muted">Chưa mở khóa</span>
        </div>
      </div>

      {/* Level Progress Bars */}
      <div className="space-y-3 mt-6">
        {levels.filter(l => l.isCompleted || l.isCurrent).map((level) => (
          <div key={level.level} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Level {level.level}</span>
              <span className="text-muted">
                {level.completedLessons}/{level.totalLessons} bài
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(level.completedLessons / level.totalLessons) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  level.isCompleted ? 'bg-success' : 'bg-primary'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseProgress;