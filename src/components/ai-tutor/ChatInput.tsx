'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export function ChatInput({ 
  onSend, 
  disabled = false, 
  placeholder = 'Nhập tin nhắn...',
  maxLength = 2000 
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const lineHeight = 24;
      const minHeight = lineHeight;
      const maxHeight = lineHeight * 5;
      const newHeight = Math.min(Math.max(textareaRef.current.scrollHeight, minHeight), maxHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
  };

  const charCount = value.length;
  const isNearLimit = charCount > maxLength * 0.9;
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative flex items-end gap-3 p-4 bg-surface dark:bg-surface-elevated border-t border-border"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 bg-background dark:bg-background/50 border border-border rounded-2xl resize-none text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          <AnimatePresence>
            {charCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute bottom-3 right-4 text-xs ${
                  isNearLimit ? 'text-error' : 'text-muted'
                }`}
              >
                {charCount}/{maxLength}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleSend}
          disabled={!canSend}
          whileHover={{ scale: canSend ? 1.05 : 1 }}
          whileTap={{ scale: canSend ? 0.95 : 1 }}
          className={`
            flex items-center justify-center w-12 h-12 rounded-2xl font-medium transition-all
            ${canSend
              ? 'gradient-bg text-white shadow-lg hover:shadow-xl'
              : 'bg-muted/20 text-muted cursor-not-allowed'
            }
          `}
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className={`w-5 h-5 ${canSend ? '' : 'opacity-50'}`} />
          )}
        </motion.button>
      </motion.div>

      <p className="absolute -top-6 left-4 text-xs text-muted">
        <span className="hidden sm:inline">Enter để gửi • Shift+Enter để xuống dòng</span>
        <span className="sm:hidden">Enter để gửi</span>
      </p>
    </div>
  );
}