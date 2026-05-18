'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Bug, Code, Book } from 'lucide-react';

export type SuggestionType = 'explanation' | 'debug' | 'code' | 'concept';

export interface Suggestion {
  label: string;
  type: SuggestionType;
}

interface SuggestionChipsProps {
  suggestions: Suggestion[];
  onClick: (suggestion: string) => void;
}

const iconMap = {
  explanation: Lightbulb,
  debug: Bug,
  code: Code,
  concept: Book,
};

const colorMap = {
  explanation: 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20',
  debug: 'bg-error/10 text-error border-error/30 hover:bg-error/20',
  code: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
  concept: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20',
};

export function SuggestionChips({ suggestions, onClick }: SuggestionChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-2 p-4 overflow-x-auto scrollbar-hide"
    >
      {suggestions.map((suggestion, index) => {
        const Icon = iconMap[suggestion.type];
        
        return (
          <motion.button
            key={`${suggestion.label}-${index}`}
            onClick={() => onClick(suggestion.label)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
              ${colorMap[suggestion.type]}
            `}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium whitespace-nowrap">{suggestion.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export const defaultSuggestions: Suggestion[] = [
  { label: 'Giải thích đoạn code này', type: 'explanation' },
  { label: 'Tìm lỗi trong code', type: 'debug' },
  { label: 'Viết unit test', type: 'code' },
  { label: 'Hướng dẫn khái niệm', type: 'concept' },
];