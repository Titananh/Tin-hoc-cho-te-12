'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
  id,
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={checked}
        id={checkboxId}
        onClick={handleToggle}
        disabled={disabled}
        whileTap={{ scale: disabled ? 1 : 0.92 }}
        className={`
          w-5 h-5 rounded-md flex items-center justify-center
          border-2 transition-colors duration-200
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          ${checked
            ? 'bg-primary border-primary'
            : 'bg-transparent border-border hover:border-muted'
          }
        `}
      >
        <motion.span
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            scale: { duration: 0.2 },
            opacity: { duration: 0.15 },
          }}
          className="flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.span>
      </motion.button>

      {label && (
        <label
          htmlFor={checkboxId}
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