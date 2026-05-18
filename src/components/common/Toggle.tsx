'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ToggleProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  id?: string;
}

export function Toggle({
  label,
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  id,
}: ToggleProps) {
  const toggleId = id || `toggle-${Math.random().toString(36).slice(2, 9)}`;

  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const sizeClasses = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: 16,
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4 h-4',
      translate: 20,
    },
  };

  const { track, thumb, translate } = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        id={toggleId}
        onClick={handleToggle}
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        className={`
          relative inline-flex items-center shrink-0
          ${track} rounded-full
          transition-colors duration-200
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${checked ? 'bg-primary' : 'bg-muted'}
        `}
      >
        <motion.span
          className={`
            absolute left-0.5 top-1/2 -translate-y-1/2
            ${thumb} rounded-full bg-white shadow-sm
          `}
          animate={{
            x: checked ? translate : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.button>

      {label && (
        <label
          htmlFor={toggleId}
          onClick={handleToggle}
          className={`
            text-sm font-medium cursor-pointer select-none
            ${disabled ? 'text-muted cursor-not-allowed' : 'text-foreground'}
          `}
        >
          {label}
        </label>
      )}
    </div>
  );
}