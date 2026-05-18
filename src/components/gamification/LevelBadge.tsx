'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface LevelBadgeProps {
  level: number;
}

const getLevelTier = (level: number): 'bronze' | 'silver' | 'gold' | 'diamond' => {
  if (level <= 5) return 'bronze';
  if (level <= 10) return 'silver';
  if (level <= 15) return 'gold';
  return 'diamond';
};

const tierColors = {
  bronze: {
    bg: 'from-blue-500 to-blue-600',
    ring: 'blue',
    text: 'text-blue-500',
    glow: 'shadow-blue-500/50',
  },
  silver: {
    bg: 'from-purple-500 to-purple-600',
    ring: 'purple',
    text: 'text-purple-500',
    glow: 'shadow-purple-500/50',
  },
  gold: {
    bg: 'from-amber-400 to-yellow-500',
    ring: 'yellow',
    text: 'text-amber-400',
    glow: 'shadow-amber-400/50',
  },
  diamond: {
    bg: 'from-pink-500 via-purple-500 to-cyan-500',
    ring: 'rainbow',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500',
    glow: 'shadow-pink-500/50',
  },
};

export function LevelBadge({ level }: LevelBadgeProps) {
  const tier = getLevelTier(level);
  const colors = tierColors[tier];

  return (
    <motion.div
      className={`relative flex items-center justify-center w-16 h-16`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Decorative ring */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.bg} p-[3px]`}>
        <div className="w-full h-full rounded-full bg-surface dark:bg-slate-800" />
      </div>

      {/* Glow effect for higher tiers */}
      {tier === 'gold' || tier === 'diamond' ? (
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.bg} blur-md opacity-50 ${colors.glow}`} />
      ) : null}

      {/* Animated ring for diamond */}
      {tier === 'diamond' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, #ec4899, #a855f7, #06b6d4, #ec4899)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Inner content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <span className={`text-xs font-bold ${colors.text}`}>
          LVL
        </span>
        <span className={`text-lg font-bold ${colors.text}`}>
          {level}
        </span>
      </div>

      {/* Sparkle effect for gold and diamond */}
      {(tier === 'gold' || tier === 'diamond') && (
        <motion.div
          className="absolute -top-1 -right-1"
          animate={{ scale: [1, 1.2, 0], opacity: [1, 0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Award className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default LevelBadge;