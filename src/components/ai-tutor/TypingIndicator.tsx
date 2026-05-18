'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  text?: string;
}

export function TypingIndicator({ text = 'PyMate đang suy nghĩ...' }: TypingIndicatorProps) {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" as const }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-lg">
        P
      </div>
      
      <div className="px-4 py-3 bg-surface dark:bg-surface-elevated border border-border rounded-2xl rounded-tl-sm rounded-tr-lg rounded-bl-lg shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: index * 0.15,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-muted"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}