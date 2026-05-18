'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface BadgeUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  badge: Badge | null;
}

export function BadgeUnlockModal({ isOpen, onClose, badge }: BadgeUnlockModalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (isOpen) {
      // Generate confetti particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        color: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'][Math.floor(Math.random() * 5)],
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Confetti particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: particle.color,
                left: '50%',
                top: '50%',
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 1,
                opacity: 1,
              }}
              animate={{
                x: particle.x * 5,
                y: particle.y * 5,
                scale: [1, 0],
                opacity: [1, 0],
              }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          ))}

          <motion.div
            className="relative bg-surface dark:bg-slate-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl overflow-hidden"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${badge.color}40, transparent 70%)`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5 text-muted" />
            </button>

            {/* Sparkles */}
            <motion.div
              className="absolute top-2 left-1/2 -translate-x-1/2"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>

            {/* Badge icon */}
            <motion.div
              className="relative w-24 h-24 mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <div
                className="w-full h-full rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${badge.color}20` }}
              >
                <Award className="w-12 h-12" style={{ color: badge.color }} />
              </div>
              {/* Ring animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2"
                style={{ borderColor: badge.color }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Badge name */}
            <motion.h2
              className="text-2xl font-bold mb-2 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Badge Unlocked!
            </motion.h2>

            {/* Badge title */}
            <motion.h3
              className="text-xl font-semibold mb-2"
              style={{ color: badge.color }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {badge.name}
            </motion.h3>

            {/* Badge description */}
            <motion.p
              className="text-muted mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {badge.description}
            </motion.p>

            {/* Continue button */}
            <motion.button
              onClick={onClose}
              className="px-8 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Awesome!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BadgeUnlockModal;