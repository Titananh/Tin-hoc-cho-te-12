'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2.5',
  lg: 'h-4',
};

const ProgressBar = ({
  value,
  size = 'md',
  color,
  animated = true,
}: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div
        className={`relative w-full ${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: color,
            background: color
              ? undefined
              : 'linear-gradient(90deg, #4F46E5, #818CF8)',
          }}
          initial={animated ? { width: 0 } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={{
            duration: animated ? 0.8 : 0,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
      <div className="mt-1 text-right text-xs text-gray-600 dark:text-gray-400">
        {Math.round(clampedValue)}%
      </div>
    </div>
  );
};

export default ProgressBar;