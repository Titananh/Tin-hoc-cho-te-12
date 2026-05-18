'use client';

import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { Zap } from 'lucide-react';

interface XPDisplayProps {
  xp: number;
  showPlus?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { icon: 14, text: 'text-sm', ring: 32 },
  md: { icon: 18, text: 'text-base', ring: 40 },
  lg: { icon: 24, text: 'text-xl', ring: 56 },
};

export function XPDisplay({ xp, showPlus = false, size = 'md' }: XPDisplayProps) {
  const config = sizeConfig[size];
  const displayValue = useMotionValue(xp);
  const roundedValue = useTransform(displayValue, (latest) => Math.round(latest));

  useEffect(() => {
    displayValue.set(xp);
  }, [xp, displayValue]);

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
      >
        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md" />
        <Zap
          className={`text-yellow-500 drop-shadow-lg`}
          size={config.icon}
          fill="currentColor"
        />
      </motion.div>
      <motion.span className={`font-bold text-yellow-500 ${config.text}`}>
        {showPlus && '+'}
        <motion.span>
          {roundedValue}
        </motion.span>
      </motion.span>
    </div>
  );
}

export default XPDisplay;