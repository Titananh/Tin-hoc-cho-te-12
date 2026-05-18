'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, X } from 'lucide-react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  rightElement?: React.ReactNode;
  className?: string;
  id?: string;
}

export function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  icon,
  disabled = false,
  rightElement,
  className = '',
  id,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;

  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const rightElementDefault = isPasswordType ? (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="p-1 text-muted hover:text-foreground transition-colors"
      tabIndex={-1}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  ) : null;

  const rightContent = rightElement || rightElementDefault;

  const canClear = !disabled && !isPasswordType && value && value.length > 0 && !rightElement;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          id={inputId}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-11 px-3 py-2 rounded-xl
            bg-surface border text-foreground
            placeholder:text-muted
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? 'pl-10' : ''}
            ${rightContent || canClear ? 'pr-10' : 'pr-3'}
            ${error
              ? 'border-error focus:border-error ring-2 ring-error/20'
              : 'border-border hover:border-muted focus:border-primary'
            }
            ${isFocused && !error ? 'ring-2 ring-primary/20 border-primary' : ''}
          `}
        />

        {/* Clear Button */}
        <AnimatePresence>
          {canClear && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => {
                const syntheticEvent = {
                  target: { value: '' },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange?.(syntheticEvent);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right Element (password toggle or custom) */}
        {rightContent && !canClear && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightContent}
          </div>
        )}

        {/* Focus Ring Animation */}
        <AnimatePresence>
          {isFocused && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 -z-10 rounded-xl bg-primary/5 pointer-events-none"
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-sm text-error flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-sm text-muted">{helperText}</p>
      )}
    </div>
  );
}