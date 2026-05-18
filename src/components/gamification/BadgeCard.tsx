'use client';

import { motion } from 'framer-motion';
import { Lock, Award, Calendar } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  earnedAt?: string;
}

interface BadgeCardProps {
  badge: Badge;
  isLocked?: boolean;
}

export function BadgeCard({ badge, isLocked = false }: BadgeCardProps) {
  const formattedDate = badge.earnedAt
    ? new Date(badge.earnedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <motion.div
      className={`
        relative p-4 rounded-2xl glass transition-all duration-300
        ${isLocked ? 'opacity-60 grayscale' : 'hover:scale-105'}
      `}
      whileHover={isLocked ? {} : { y: -4 }}
      whileTap={isLocked ? {} : { scale: 0.98 }}
    >
      {/* Glow effect for unlocked badges */}
      {!isLocked && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity"
          style={{
            boxShadow: `0 0 20px ${badge.color}40`,
          }}
        />
      )}

      {/* Lock overlay for locked badges */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/50 z-10">
          <Lock className="w-8 h-8 text-slate-400" />
        </div>
      )}

      {/* Badge icon */}
      <div
        className="w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${badge.color}20` }}
      >
        <Award
          className="w-8 h-8"
          style={{ color: isLocked ? '#94A3B8' : badge.color }}
        />
      </div>

      {/* Badge name */}
      <h3 className={`text-sm font-semibold text-center mb-1 ${isLocked ? 'text-muted' : 'text-foreground'}`}>
        {badge.name}
      </h3>

      {/* Badge description */}
      <p className="text-xs text-muted text-center line-clamp-2 mb-2">
        {badge.description}
      </p>

      {/* Earned date */}
      {formattedDate && (
        <div className="flex items-center justify-center gap-1 text-xs text-muted">
          <Calendar className="w-3 h-3" />
          <span>{formattedDate}</span>
        </div>
      )}
    </motion.div>
  );
}

export default BadgeCard;