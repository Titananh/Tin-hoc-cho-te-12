'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ChevronRight, Home } from 'lucide-react';

interface LessonCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  xpEarned: number;
  onNextLesson?: () => void;
  nextLessonSlug?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
}

export function LessonCompleteModal({
  isOpen,
  onClose,
  lessonTitle,
  xpEarned,
  onNextLesson,
  nextLessonSlug,
}: LessonCompleteModalProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showXp, setShowXp] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Generate confetti particles
  useEffect(() => {
    if (isOpen) {
      const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444'];
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 20,
        velocityY: Math.random() * -15 - 5,
      }));
      setParticles(newParticles);
      setShowXp(false);
      setCountdown(5);

      // Delay XP animation
      setTimeout(() => setShowXp(true), 500);
    }
  }, [isOpen]);

  // Auto-close countdown
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  const handleNextLesson = useCallback(() => {
    onClose();
    if (onNextLesson) {
      setTimeout(onNextLesson, 300);
    }
  }, [onClose, onNextLesson]);

  const handleGoHome = useCallback(() => {
    onClose();
    if (nextLessonSlug) {
      window.location.href = '/';
    }
  }, [onClose, nextLessonSlug]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-sm"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size * 0.6,
              left: '50%',
              top: '50%',
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: particle.x * 8,
              y: particle.velocityY * 15 + particle.y * 3,
              scale: [0, 1, 0.8, 0],
              opacity: [0, 1, 1, 0],
              rotate: particle.rotation + Math.random() * 720,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative w-full max-w-md bg-surface dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted" />
        </button>

        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Celebration emoji */}
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 8, stiffness: 200, delay: 0.1 }}
          >
            🎉
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-2xl font-bold gradient-text mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hoàn thành bài học!
          </motion.h2>

          {/* Lesson name */}
          <motion.p
            className="text-muted mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {lessonTitle}
          </motion.p>

          {/* XP Animation */}
          <AnimatePresence>
            {showXp && (
              <motion.div
                className="flex items-center justify-center gap-2 mb-8"
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -30 }}
                transition={{ type: 'spring', damping: 12 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  <Zap className="w-8 h-8 text-yellow-500" fill="currentColor" />
                </motion.div>
                <motion.span
                  className="text-4xl font-bold text-yellow-500"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.4 }}
                >
                  +{xpEarned} XP
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            {/* Next lesson button */}
            {nextLessonSlug && (
              <motion.button
                onClick={handleNextLesson}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-white font-medium hover:opacity-90 transition-opacity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Bài học tiếp theo
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            )}

            {/* Home button */}
            <motion.button
              onClick={handleGoHome}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-foreground font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-5 h-5" />
              Quay về trang chủ
            </motion.button>
          </div>

          {/* Auto-close countdown */}
          <motion.p
            className="mt-4 text-sm text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Tự động đóng sau {countdown}s
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LessonCompleteModal;