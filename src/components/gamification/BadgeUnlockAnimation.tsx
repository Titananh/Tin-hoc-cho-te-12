'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BadgeUnlockAnimationProps {
  /** Whether to show the animation */
  show: boolean;
  /** Badge icon (emoji or URL) */
  icon: string;
  /** Badge name */
  name: string;
  /** Badge description */
  description: string;
  /** XP reward for earning this badge */
  xpReward?: number;
  /** Badge color for glow effect */
  color?: string;
  /** Callback when dismissed */
  onDismiss: () => void;
}

/**
 * Modal/overlay showing newly earned badge with glow effect.
 * Displays badge icon, name, description, and XP reward.
 * "Tuyệt vời!" dismiss button.
 */
export function BadgeUnlockAnimation({
  show,
  icon,
  name,
  description,
  xpReward,
  color = '#FFD700',
  onDismiss,
}: BadgeUnlockAnimationProps) {
  // Auto-dismiss after 8 seconds if user doesn't interact
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDismiss, 8000);
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onDismiss}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 -m-4 rounded-3xl blur-xl"
              style={{ backgroundColor: color }}
            />

            {/* Card */}
            <div className="relative rounded-2xl bg-gray-900/95 border border-gray-700 p-6 text-center shadow-2xl">
              {/* Header text */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-yellow-400 uppercase tracking-wider"
              >
                🎉 Huy hiệu mới
              </motion.p>

              {/* Badge icon with glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
                className="mx-auto mt-4 relative"
              >
                {/* Glow ring */}
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${color}40`,
                      `0 0 40px ${color}60`,
                      `0 0 20px ${color}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `3px solid ${color}`,
                  }}
                >
                  <span className="text-5xl">{icon}</span>
                </motion.div>
              </motion.div>

              {/* Badge name */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-xl font-bold text-white"
              >
                {name}
              </motion.h3>

              {/* Badge description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2 text-sm text-gray-400"
              >
                {description}
              </motion.p>

              {/* XP reward */}
              {xpReward && xpReward > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-3 py-1 border border-yellow-500/30"
                >
                  <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-yellow-300">
                    +{xpReward} XP
                  </span>
                </motion.div>
              )}

              {/* Dismiss button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={onDismiss}
                className="mt-5 w-full rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                Tuyệt vời! 🎊
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BadgeUnlockAnimation;
