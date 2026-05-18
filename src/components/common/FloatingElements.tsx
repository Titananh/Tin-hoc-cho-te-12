'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementsProps {
  count?: number;
  children: ReactNode;
}

const FloatingElements = ({ count = 5, children }: FloatingElementsProps) => {
  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: 0.5 + Math.random() * 0.8,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{ left: `${el.x}%`, top: `${el.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            y: [0, -20, 0],
            scale: el.scale,
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;