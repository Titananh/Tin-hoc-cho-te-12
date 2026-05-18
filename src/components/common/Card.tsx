'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverable?: boolean;
  glassmorphism?: boolean;
}

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantStyles = {
  default: {
    base: 'bg-white dark:bg-gray-800 shadow-md',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg',
  },
  elevated: {
    base: 'bg-white dark:bg-gray-800 shadow-xl',
    glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg',
  },
  outlined: {
    base: 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700',
    glass: 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg border border-white/20 dark:border-gray-700/50',
  },
};

export default function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
  hoverable = false,
  glassmorphism = false,
}: CardProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const baseStyles = glassmorphism ? variantStyles[variant].glass : variantStyles[variant].base;

  const Component = onClick ? 'button' : 'div';

  return (
    <motion.div
      whileHover={hoverable ? { y: -4, scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'rounded-xl transition-all duration-200',
        baseStyles,
        paddingMap[padding],
        hoverable && 'cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}