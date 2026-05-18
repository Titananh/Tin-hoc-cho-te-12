'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageLoaderProps {
  fullScreen?: boolean;
}

export function PageLoader({ fullScreen = true }: PageLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={fullScreen ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md' : 'flex flex-col items-center justify-center py-20'}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center"
      >
        <motion.h1
          className="text-3xl md:text-4xl font-bold gradient-text mb-2"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Python Master 12
        </motion.h1>
        <p className="text-muted text-sm md:text-base">Học Python dành cho học sinh lớp 12</p>
      </motion.div>

      <motion.div
        className="mt-8"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 text-muted text-sm"
      >
        Đang tải...
      </motion.p>
    </motion.div>
  );
}

interface InlineLoaderProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function InlineLoader({ text, size = 'md' }: InlineLoaderProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-[3px]',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <div className={`${sizes[size]} border-primary/30 border-t-primary rounded-full`} />
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-sm"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  );
}