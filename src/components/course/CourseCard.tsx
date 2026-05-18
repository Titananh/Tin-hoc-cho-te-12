'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Clock } from 'lucide-react';

export interface CourseCardProps {
  id: string;
  title: string;
  icon: string;
  color: string;
  lessonCount: number;
  duration: string;
  description: string;
  progress: number; // 0-100
  status: 'completed' | 'current' | 'locked';
  onClick?: () => void;
}

export function CourseCard({
  id,
  title,
  icon,
  color,
  lessonCount,
  duration,
  description,
  progress,
  status,
  onClick,
}: CourseCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  const statusConfig = {
    completed: {
      label: 'Hoàn thành',
      badgeClass: 'bg-success/10 text-success',
      showCheckmark: true,
    },
    current: {
      label: 'Đang học',
      badgeClass: 'bg-primary/10 text-primary',
      showCheckmark: false,
    },
    locked: {
      label: '',
      badgeClass: '',
      showCheckmark: false,
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      whileHover={isLocked ? {} : { y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={isLocked ? undefined : onClick}
      className={`
        relative bg-surface rounded-xl overflow-hidden
        border-l-4 shadow-md
        transition-all duration-200
        ${isLocked ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${isCurrent ? 'animate-pulse-glow' : ''}
        hover:shadow-xl
      `}
      style={{ borderLeftColor: color }}
    >
      {/* Glow effect on hover for current */}
      {isCurrent && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
          style={{ boxShadow: `0 0 20px ${color}40` }}
        />
      )}

      <div className="p-5">
        {/* Icon and Title Row */}
        <div className="flex items-start gap-4 mb-4">
          {/* Icon in colored circle */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}20` }}
          >
            {isLocked ? (
              <Lock className="w-6 h-6" style={{ color }} />
            ) : (
              <span className="text-2xl">{icon}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate">{title}</h3>
              
              {/* Status Badge */}
              {config.label && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${config.badgeClass}`}
                >
                  {config.label}
                </motion.span>
              )}
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-4 mt-1.5 text-sm text-muted">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {lessonCount} bài học
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {duration}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted line-clamp-2 mb-4">{description}</p>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="h-full rounded-full"
              style={{
                background: isCompleted
                  ? 'linear-gradient(90deg, var(--color-success), var(--color-success))'
                  : 'linear-gradient(90deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
              }}
            />
          </div>
          <span className="text-xs text-muted mt-1 block">{progress}% hoàn thành</span>
        </div>
      </div>

      {/* Completed overlay checkmark */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-success flex items-center justify-center"
        >
          <Check className="w-5 h-5 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
}