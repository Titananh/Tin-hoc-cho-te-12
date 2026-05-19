'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelUpAnimationProps {
  /** The new level the user reached */
  level: number;
  /** Whether to show the animation */
  show: boolean;
  /** Callback when animation is dismissed */
  onDismiss: () => void;
}

/**
 * Full-screen celebration animation when user levels up.
 * Shows new level number with confetti effect.
 * Auto-dismisses after 3 seconds.
 */
export function LevelUpAnimation({ level, show, onDismiss }: LevelUpAnimationProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti pieces
      const pieces: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        size: 6 + Math.random() * 8,
      }));
      setConfettiPieces(pieces);

      // Auto-dismiss after 3 seconds
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onDismiss}
        >
          {/* Confetti */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: '-10vh',
                rotate: 0,
                opacity: 1,
              }}
              animate={{
                y: '110vh',
                rotate: piece.rotation + 720,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear',
              }}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}

          {/* Level up content */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow ring */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-2xl"
            />

            <div className="relative rounded-2xl bg-gray-900/90 p-8 shadow-2xl border border-yellow-500/30">
              {/* Star icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30"
              >
                <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>

              {/* Text */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-medium text-yellow-300"
              >
                Chúc mừng!
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-1 text-sm text-gray-300"
              >
                Bạn đã lên cấp
              </motion.p>

              {/* Level number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.6 }}
                className="mt-3"
              >
                <span className="text-5xl font-black bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  {level}
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 text-xs text-gray-400"
              >
                Nhấn để đóng
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Types and constants ---

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

const CONFETTI_COLORS = [
  '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E9', '#F1948A',
];

export default LevelUpAnimation;
