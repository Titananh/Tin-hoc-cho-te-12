'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Nút bật/tắt Chế độ Tập trung.
 * Khi bật: ẩn thông báo, đơn giản hóa giao diện.
 * Lưu trạng thái vào localStorage.
 */
export default function FocusMode() {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('focusMode');
    if (saved === 'true') {
      setIsFocused(true);
      document.documentElement.setAttribute('data-focus-mode', 'true');
    }
  }, []);

  const toggleFocus = () => {
    const next = !isFocused;
    setIsFocused(next);
    localStorage.setItem('focusMode', String(next));

    if (next) {
      document.documentElement.setAttribute('data-focus-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-focus-mode');
    }
  };

  return (
    <button
      onClick={toggleFocus}
      className={`relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        isFocused
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 ring-2 ring-purple-400'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      title={isFocused ? 'Tắt chế độ tập trung' : 'Bật chế độ tập trung'}
      aria-pressed={isFocused}
      aria-label="Chế độ tập trung"
    >
      {/* Icon */}
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        {isFocused ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        )}
        {isFocused && (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        )}
      </svg>

      <span className="hidden sm:inline">
        {isFocused ? 'Đang tập trung' : 'Tập trung'}
      </span>

      {/* Indicator dot */}
      <AnimatePresence>
        {isFocused && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-purple-500"
          />
        )}
      </AnimatePresence>
    </button>
  );
}
