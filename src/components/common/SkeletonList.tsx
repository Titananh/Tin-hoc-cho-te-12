'use client';

import { motion } from 'framer-motion';

interface SkeletonListProps {
  count?: number;
  variant?: 'card' | 'text' | 'avatar';
}

const SkeletonList = ({ count = 3, variant = 'text' }: SkeletonListProps) => {
  const items = Array.from({ length: count }, (_, i) => i);

  const cardVariant = (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3 animate-pulse" />
      <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
    </div>
  );

  const textVariant = (
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 animate-pulse" />
    </div>
  );

  const avatarVariant = (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
        <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'card':
        return cardVariant;
      case 'avatar':
        return avatarVariant;
      default:
        return textVariant;
    }
  };

  return (
    <div className="space-y-3">
      {items.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          {renderVariant()}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonList;