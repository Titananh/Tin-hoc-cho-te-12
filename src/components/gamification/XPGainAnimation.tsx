'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface XPGainAnimationProps {
  amount: number;
  onComplete?: () => void;
}

export function XPGainAnimation({ amount, onComplete }: XPGainAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: -60,
            scale: [0.5, 1.2, 1, 0.8],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-yellow-500" fill="currentColor" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-yellow-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              +{amount} XP
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default XPGainAnimation;