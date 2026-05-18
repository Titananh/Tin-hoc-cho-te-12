'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Star, Trophy } from 'lucide-react';
import { LevelBadge } from './LevelBadge';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  xpBonus?: number;
}

export function LevelUpModal({ isOpen, onClose, newLevel, xpBonus = 0 }: LevelUpModalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        color: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Confetti particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  left: '50%',
                  top: '50%',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: particle.x * 4,
                  y: particle.y * 4 - 100,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            ))}
          </div>

          <motion.div
            className="relative bg-surface dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl overflow-hidden"
            initial={{ scale: 0.3, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.3, opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 12 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted" />
            </button>

            {/* Header */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="relative text-4xl font-bold gradient-text py-2">Level Up!</h2>
            </motion.div>

            {/* Level badge */}
            <motion.div
              className="relative mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, damping: 8 }}
            >
              <LevelBadge level={newLevel} />
            </motion.div>

            {/* Level number */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-6xl font-bold text-foreground">{newLevel}</span>
            </motion.div>

            {/* XP bonus notification */}
            {xpBonus > 0 && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5 text-yellow-500" fill="currentColor" />
                </motion.div>
                <span className="text-lg font-bold text-yellow-500">+{xpBonus} XP Bonus!</span>
              </motion.div>
            )}

            {/* Trophy icons */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                >
                  <Trophy className="w-6 h-6 text-amber-500" fill="currentColor" />
                </motion.div>
              ))}
            </motion.div>

            {/* Continue button */}
            <motion.button
              onClick={onClose}
              className="relative px-8 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LevelUpModal;